import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import users from '../data/users';
import { HTTP_RESPONSE_CODES } from '../types/generalTypes';
import { onResponseSend, parseUrl } from '../utils';

const getUserById = (req: IncomingMessage, res: ServerResponse) => {
  const { userId = '' } = parseUrl(req.url);

  if (!validate(userId)) {
    onResponseSend(res, HTTP_RESPONSE_CODES.BAD_REQUEST, `Used id ${userId} is not valid`);
  } else {
    const user = users.find((user) => user.id === userId);

    if (user) {
      onResponseSend(res, HTTP_RESPONSE_CODES.OK, user);
    } else {
      onResponseSend(res, HTTP_RESPONSE_CODES.NOT_FOUND, `User with id ${userId} does not found`);
    }
  }
};

export default getUserById;
