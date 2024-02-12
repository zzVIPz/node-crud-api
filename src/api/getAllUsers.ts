import { IncomingMessage, ServerResponse } from 'http';
import users from '../data/users';
import { HTTP_RESPONSE_CODES } from '../types/generalTypes';
import { onResponseSend } from '../utils/onResponseSend';

const getAllUsers = (req: IncomingMessage, res: ServerResponse) =>
  onResponseSend(res, HTTP_RESPONSE_CODES.OK, users);

export default getAllUsers;
