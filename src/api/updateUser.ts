import { IncomingMessage, ServerResponse } from 'http';
import { validate } from 'uuid';
import users from '../data/users';
import { ERROR_MESSAGES, HTTP_RESPONSE_CODES } from '../types/generalTypes';
import { onResponseSend, isValidUser, printError, parseUrl } from '../utils';
import MESSAGE_SERVICE from '../services/message';

const updateUser = (req: IncomingMessage, res: ServerResponse, data: string) => {
  try {
    const { userId = '' } = parseUrl(req.url);
    const usedData = JSON.parse(data);

    if (!validate(userId)) {
      onResponseSend(res, HTTP_RESPONSE_CODES.BAD_REQUEST, MESSAGE_SERVICE.invalidId(userId));
      return;
    }

    const existingUserIndex = users.findIndex((user) => user.id === userId);

    if (existingUserIndex === -1) {
      onResponseSend(res, HTTP_RESPONSE_CODES.NOT_FOUND, MESSAGE_SERVICE.notFoundIdId(userId));
      return;
    }

    if (isValidUser(usedData)) {
      const updatedUser = { ...users[existingUserIndex], ...usedData };
      users[existingUserIndex] = updatedUser;

      onResponseSend(res, HTTP_RESPONSE_CODES.OK, updatedUser);
    } else {
      onResponseSend(res, HTTP_RESPONSE_CODES.BAD_REQUEST, MESSAGE_SERVICE.invalidPayload);
    }
  } catch {
    onResponseSend(res, HTTP_RESPONSE_CODES.ERROR, ERROR_MESSAGES.ERROR);
    printError(MESSAGE_SERVICE.invalidPayload);
  }
};

export default updateUser;
