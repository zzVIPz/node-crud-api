import { ServerResponse } from 'http';
import { User } from '../types/generalTypes';

export const onResponseSend = (
  res: ServerResponse,
  statusCode: number,
  data: User[] | User | string,
) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
};
