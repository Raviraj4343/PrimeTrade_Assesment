import constants from '../constants/constant.js';
import { ApiError } from '../utils/apiError.js';

export const validate = (schema, property = 'body') => (req, res, next) => {
  const { error, value } = schema.validate(req[property], {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    return next(
      new ApiError(
        constants.statusCodes.UNPROCESSABLE_ENTITY,
        constants.messages.GENERAL.VALIDATION_FAILED,
        error.details.map((item) => item.message)
      )
    );
  }

  req[property] = value;
  return next();
};
