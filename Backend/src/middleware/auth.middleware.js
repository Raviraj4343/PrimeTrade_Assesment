import User from '../models/user.model.js';
import constants from '../constants/constant.js';
import { ApiError } from '../utils/apiError.js';
import { verifyToken } from '../utils/jwt.js';

export const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    return next(
      new ApiError(constants.statusCodes.UNAUTHORIZED, constants.messages.AUTH.TOKEN_MISSING)
    );
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.sub);

    if (!user) {
      throw new Error('User not found');
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
      email: user.email,
      name: user.name
    };

    return next();
  } catch (error) {
    return next(
      new ApiError(constants.statusCodes.UNAUTHORIZED, constants.messages.AUTH.TOKEN_INVALID)
    );
  }
};

export const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError(constants.statusCodes.FORBIDDEN, constants.messages.AUTH.FORBIDDEN));
  }

  return next();
};
