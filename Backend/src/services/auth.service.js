import User from '../models/user.model.js';
import constants from '../constants/constant.js';
import { ApiError } from '../utils/apiError.js';
import { generateToken } from '../utils/jwt.js';

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt
});

export const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new ApiError(
      constants.statusCodes.CONFLICT,
      constants.messages.USER.ALREADY_EXISTS
    );
  }

  const user = await User.create({ name, email, password });
  const token = generateToken({ sub: user._id.toString(), role: user.role });

  return {
    user: sanitizeUser(user),
    token
  };
};

export const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(constants.statusCodes.UNAUTHORIZED, constants.messages.AUTH.TOKEN_INVALID);
  }

  return sanitizeUser(user);
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(
      constants.statusCodes.UNAUTHORIZED,
      constants.messages.AUTH.INVALID_CREDENTIALS
    );
  }

  const token = generateToken({ sub: user._id.toString(), role: user.role });

  return {
    user: sanitizeUser(user),
    token
  };
};
