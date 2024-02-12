import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers, getUserById, addUser, updateUser } from '../api';

const USER_ROUTE = '/api/users';
export const USER_ID_ROUTE = '/api/users/:userId';

export interface Router {
  [route: string]: {
    [method: string]: (req: IncomingMessage, res: ServerResponse, data: string) => void;
  };
}

const routes = {
  [USER_ROUTE]: {
    GET: getAllUsers,
    POST: addUser,
  },
  [USER_ID_ROUTE]: {
    GET: getUserById,
    PUT: updateUser,
    DELETE: () => {},
  },
};

export default routes;
