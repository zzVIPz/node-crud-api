export const enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const enum HTTP_RESPONSE_CODES {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  ERROR = 500,
}

export const enum ERROR_MESSAGES {
  ERROR = 'Internal Server Error. Please see console for more details.',
}

export interface UserInfo {
  username: string;
  age: string;
  hobbies: string[];
}

export interface User extends UserInfo {
  id: string;
}
