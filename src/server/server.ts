import http, { IncomingMessage, ServerResponse } from 'http';
import { EventEmitter } from 'events';
import { Router, USER_ID_ROUTE } from '../routes/routes';
import { HTTP_RESPONSE_CODES } from '../types/generalTypes';
import { parseUrl } from '../utils';

export default class CrudApiServer {
  server;
  emitter = new EventEmitter();

  constructor() {
    this.server = this.#startServer();
  }

  #startServer = () =>
    http.createServer((req, res) => {
      const { url, method } = req;
      let data = '';

      req.on('data', (chunk) => {
        data += chunk;
      });

      req.on('end', () => {
        console.log(data);
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

  listen = (port = '3000', callback: () => void) => {
    this.server.listen(port, callback);
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
}
