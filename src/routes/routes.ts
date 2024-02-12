import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers, getUserById } from '../api/index';

const USER_ROUTE = '/api/users';
export const USER_ID_ROUTE = '/api/users/:userId';

export interface Router {
  [route: string]: {
    [method: string]: (req: IncomingMessage, res: ServerResponse) => void;
  };
}

const routes = {
  [USER_ROUTE]: {
    GET: getAllUsers,
    POST: () => {},
  },
  [USER_ID_ROUTE]: {
    GET: getUserById,
    PUT: () => {},
    DELETE: () => {},
  },
};

export default routes;
