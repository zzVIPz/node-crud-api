import { UserInfo } from '../types/generalTypes';

const isValidUser = (user: UserInfo) => {
  const { username, age, hobbies } = user;

  return (
    Object.keys(user).length === 3 &&
    typeof username === 'string' &&
    typeof age === 'string' &&
    Array.isArray(hobbies)
  );
};

export default isValidUser;
