import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';
import users from '../data/users';
import { ERROR_MESSAGES, HTTP_RESPONSE_CODES } from '../types/generalTypes';
import { onResponseSend, isValidUser, printError } from '../utils';
import MESSAGE_SERVICE from '../services/message';

const addUser = (req: IncomingMessage, res: ServerResponse, data: string) => {
  try {
    const usedData = JSON.parse(data);

    if (isValidUser(usedData)) {
      const newUser = { id: uuidv4(), ...usedData };

      users.push(newUser);
      onResponseSend(res, HTTP_RESPONSE_CODES.CREATED, newUser);
    } else {
      onResponseSend(res, HTTP_RESPONSE_CODES.BAD_REQUEST, MESSAGE_SERVICE.invalidPayload);
    }
  } catch {
    onResponseSend(res, HTTP_RESPONSE_CODES.ERROR, ERROR_MESSAGES.ERROR);
    printError(MESSAGE_SERVICE.invalidPayload);
  }
};

export default addUser;
