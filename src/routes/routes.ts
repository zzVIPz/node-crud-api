import { IncomingMessage, ServerResponse } from 'http';

export interface Router {
  [route: string]: {
    [method: string]: (req: IncomingMessage, res: ServerResponse) => void;
  };
}

const routes = {
  '/api/users': {
    GET: () => {},
    POST: () => {},
  },
  '/api/users/:userId': {
    GET: () => {},
    PUT: () => {},
    DELETE: () => {},
  },
};

export default routes;
