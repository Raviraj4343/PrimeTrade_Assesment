import constants from '../constants/constant.js';
import { getCurrentUser, loginUser, registerUser } from '../services/auth.service.js';
import { sendResponse } from '../utils/apiResponse.js';
import { getAuthCookieOptions } from '../utils/cookie.js';

export const register = async (req, res) => {
  const data = await registerUser(req.body);
  res.cookie(constants.config.cookieName, data.token, getAuthCookieOptions());

  return sendResponse(
    res,
    constants.statusCodes.CREATED,
    constants.messages.AUTH.REGISTER_SUCCESS,
    data
  );
};

export const login = async (req, res) => {
  const data = await loginUser(req.body);
  res.cookie(constants.config.cookieName, data.token, getAuthCookieOptions());

  return sendResponse(
    res,
    constants.statusCodes.OK,
    constants.messages.AUTH.LOGIN_SUCCESS,
    data
  );
};

export const getMe = async (req, res) => {
  const user = await getCurrentUser(req.user.id);

  return sendResponse(
    res,
    constants.statusCodes.OK,
    constants.messages.AUTH.CURRENT_USER_FETCHED,
    user
  );
};

export const logout = async (req, res) => {
  res.clearCookie(constants.config.cookieName, getAuthCookieOptions());

  return sendResponse(
    res,
    constants.statusCodes.OK,
    constants.messages.AUTH.LOGOUT_SUCCESS
  );
};
