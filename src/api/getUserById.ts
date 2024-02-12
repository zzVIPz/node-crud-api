import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import users from '../data/users';
import { HTTP_RESPONSE_CODES } from '../types/generalTypes';
import { onResponseSend, parseUrl } from '../utils';
import MESSAGE_SERVICE from '../services/message';

const getUserById = (req: IncomingMessage, res: ServerResponse) => {
  const { userId = '' } = parseUrl(req.url);

  if (!validate(userId)) {
    onResponseSend(res, HTTP_RESPONSE_CODES.BAD_REQUEST, MESSAGE_SERVICE.invalidId(userId));
  } else {
    const user = users.find((user) => user.id === userId);

    if (user) {
      onResponseSend(res, HTTP_RESPONSE_CODES.OK, user);
    } else {
      onResponseSend(res, HTTP_RESPONSE_CODES.NOT_FOUND, MESSAGE_SERVICE.notFoundIdId(userId));
    }
  }
};

export default getUserById;
