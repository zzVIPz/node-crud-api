const MAX_URL_DEPTH = 5;
const USER_ID_INDEX = 3;

const parseUrl = (url = '') => {
  const parsedUrl = url.split('/');
  const userId = parsedUrl[USER_ID_INDEX];
  const isValidId = userId && parsedUrl.length < MAX_URL_DEPTH;

  return { isValidId, userId };
};

export default parseUrl;
