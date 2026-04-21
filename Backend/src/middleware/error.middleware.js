import mongoose from 'mongoose';
import constants from '../constants/constant.js';
import { sendResponse } from '../utils/apiResponse.js';

export const notFoundHandler = (req, res) =>
  sendResponse(res, constants.statusCodes.NOT_FOUND, constants.messages.GENERAL.NOT_FOUND);

export const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || constants.statusCodes.INTERNAL_SERVER_ERROR;
  let message = error.message || constants.messages.GENERAL.INTERNAL_ERROR;
  let details = error.details || null;

  if (error instanceof mongoose.Error.ValidationError) {
    message = constants.messages.GENERAL.VALIDATION_FAILED;
    details = Object.values(error.errors).map((item) => item.message);
  }

  if (error.code === 11000) {
    message = constants.messages.USER.ALREADY_EXISTS;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    ...(details ? { details } : {})
  });
};
