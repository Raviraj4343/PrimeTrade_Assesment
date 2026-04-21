import constants from '../constants/constant.js';
import { loginUser, registerUser } from '../services/auth.service.js';
import { sendResponse } from '../utils/apiResponse.js';

export const register = async (req, res) => {
  const data = await registerUser(req.body);

  return sendResponse(
    res,
    constants.statusCodes.CREATED,
    constants.messages.AUTH.REGISTER_SUCCESS,
    data
  );
};

export const login = async (req, res) => {
  const data = await loginUser(req.body);

  return sendResponse(
    res,
    constants.statusCodes.OK,
    constants.messages.AUTH.LOGIN_SUCCESS,
    data
  );
};
