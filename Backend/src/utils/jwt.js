import jwt from 'jsonwebtoken';
import constants from '../constants/constant.js';

export const generateToken = (payload) =>
  jwt.sign(payload, constants.config.jwtSecret, {
    expiresIn: constants.config.jwtExpiresIn
  });

export const verifyToken = (token) => jwt.verify(token, constants.config.jwtSecret);
