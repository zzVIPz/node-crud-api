import { User } from '../types/generalTypes';
import { v4 as uuidv4 } from 'uuid';

const users: User[] = [
  {
    id: uuidv4(),
    username: 'test-username',
    age: 'test-age',
    hobbies: ['test-hobby'],
  },
];

export default users;
