export const enum HTTP_METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export const enum HTTP_RESPONSE_CODES {
  OK = 200,
  NOT_FOUND = 404,
  ERROR = 500,
}

export interface User {
  id: string;
  username: string;
  age: string;
  hobbies: string[];
}
