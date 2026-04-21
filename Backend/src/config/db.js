import mongoose from 'mongoose';
import './env.js';
import constants from '../constants/constant.js';
import { logger } from '../utils/logger.js';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(constants.config.mongoUri, {
      serverSelectionTimeoutMS: 10000
    });
    logger.info('MongoDB connected successfully');
  } catch (error) {
    logger.error(`MongoDB connection failed: ${error.message}`);
    throw error;
  }
};
