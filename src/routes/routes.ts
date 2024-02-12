import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers } from '../api/index';

export interface Router {
  [route: string]: {
    [method: string]: (req: IncomingMessage, res: ServerResponse) => void;
  };
}

const routes = {
  '/api/users': {
    GET: getAllUsers,
    POST: () => {},
  },
  '/api/users/:userId': {
    GET: () => {},
    PUT: () => {},
    DELETE: () => {},
  },
};

export default routes;
