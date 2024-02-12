import { IncomingMessage, ServerResponse } from 'http';
import users from '../data/users';
import { HTTP_RESPONSE_CODES } from '../types/generalTypes';
import { onResponseSend } from '../utils/onResponseSend';
import parseUrl from '../utils/parseUrl';

const getUserById = (req: IncomingMessage, res: ServerResponse) => {
  const { userId } = parseUrl(req.url);
  const user = users.find((user) => user.id === userId);

  if (user) {
    onResponseSend(res, HTTP_RESPONSE_CODES.OK, user);
  } else {
    onResponseSend(res, HTTP_RESPONSE_CODES.NOT_FOUND, `User with id ${userId} does not found`);
  }
};

export default getUserById;
