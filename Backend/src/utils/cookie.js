import constants from '../constants/constant.js';

export const getAuthCookieOptions = () => ({
  httpOnly: true,
  sameSite: 'lax',
  secure: constants.config.nodeEnv === 'production',
  maxAge: constants.config.cookieExpiresInDays * 24 * 60 * 60 * 1000
});
