import http from 'http';

export default class CrudApiServer {
  server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>;

  constructor() {
    this.server = this.#startServer();
  }

  #startServer = () =>
    http.createServer((req, _) => {
      let data = '';

      req.on('data', (chunk) => {
        data += chunk;
      });

      req.on('end', () => {
        if (data) {
          console.log(data);
        }
      });
    });

  listen(port = '3000', callback: () => void) {
    this.server.listen(port, callback);
  }
}
