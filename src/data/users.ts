import { User } from '../types/generalTypes';
import { v4 as uuidv4 } from 'uuid';

const users: User[] = [
  {
    id: uuidv4(),
    username: 'Batman',
    age: 'Immortal',
    hobbies: ['Kill Joker'],
  },
  {
    id: uuidv4(),
    username: 'Joker',
    age: 'Immortal',
    hobbies: ['Kill Batman'],
  },
];

export default users;
