import http, { IncomingMessage, ServerResponse } from 'http';
import EventEmitter from 'events';
import cluster from 'cluster';
import { availableParallelism } from 'os';
import { Router, USER_ID_ROUTE } from '../routes/routes';
import { HTTP_RESPONSE_CODES } from '../types/generalTypes';
import { parseUrl, printError, print } from '../utils';

export default class CrudApiServer {
  server;
  emitter = new EventEmitter();

  constructor(withLoadBalancer = false, port = '3000') {
    if (withLoadBalancer) {
      this.loadBalancer(port);
    } else {
      this.server = this.#startServer();
      this.server.listen(port, () => print(`Server started on PORT ${port}`, 'green'));
    }
  }

  #startServer = () =>
    http.createServer((req, res) => {
      const { url, method } = req;
      let data = '';

      req.on('data', (chunk) => {
        data += chunk;
      });

      req.on('end', () => {
        const emitted = this.emitter.emit(this.#getRequestDetails(url, method), req, res, data);

        if (!emitted) {
          res.writeHead(HTTP_RESPONSE_CODES.NOT_FOUND, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(`Endpoint ${url} does not found`));
        }
      });
    });

  #getRequestDetails = (url = '', method = '') => {
    const { isValidId } = parseUrl(url);

    return `${isValidId ? USER_ID_ROUTE : url}#${method}`;
  };

  loadBalancer = (port = '3000') => {
    const ports: number[] = [];
    const cpuCores = availableParallelism();
    let calculatedPortIndex = 0;

    if (cluster.isPrimary) {
      print(`Master ${process.pid} is running`, 'green');

      for (let i = 1; i <= cpuCores; i++) {
        const nextPort = parseInt(port) + i;

        cluster.fork({ PORT: `${nextPort}` });
        ports.push(nextPort);
      }

      http
        .createServer((req, res) => {
          const clientRequest = http.request(
            {
              hostname: 'localhost',
              port: ports[calculatedPortIndex],
              path: req.url,
              method: req.method,
              headers: req.headers,
            },
            (response) => {
              response.pipe(res, { end: true });
            },
          );

          req.pipe(clientRequest, { end: true });

          calculatedPortIndex = (calculatedPortIndex + 1) % ports.length;
        })
        .listen(port, () => print(`LoadBalancer started on PORT ${port}`, 'green'));

      cluster.on('exit', (worker) => {
        printError(`Worker ${worker.process.pid} died`);
      });
    } else {
      const workerPort = process.env.PORT;

      this.server = this.#startServer();
      this.server.listen(workerPort, () =>
        print(`Worker ${process.pid} started on PORT ${workerPort}`, 'green'),
      );
    }
  };

  listen = (port = '3000', callback: () => void) => {
    this.server?.listen(port, callback);
  };

  setRoutes = (routes: Router) => {
    Object.keys(routes).forEach((route) => {
      const endpoint = routes[route];

      if (endpoint) {
        Object.keys(endpoint).forEach((method) => {
          this.emitter.on(
            this.#getRequestDetails(route, method),
            (req: IncomingMessage, res: ServerResponse, data: string) => {
              const handler = endpoint[method];

              handler?.(req, res, data);
            },
          );
        });
      }
    });
  };

  getServerInstance = () => this.server;
}
