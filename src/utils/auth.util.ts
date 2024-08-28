export const extractAccessToken = (token: string) => {
  return token.replace('Bearer ', '');
};

export const extractRefreshToken = (token: string[]) => {
  return token[0].split('=')[1].split(';')[0];
};
