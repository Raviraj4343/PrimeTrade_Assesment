import '../config/env.js';
import { StatusCodes } from 'http-status-codes';

const constants = {
  api: {
    prefix: '/api/v1'
  },
  roles: {
    USER: 'user',
    ADMIN: 'admin'
  },
  taskStatus: {
    TODO: 'todo',
    IN_PROGRESS: 'in-progress',
    COMPLETED: 'completed'
  },
  config: {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT) || 5000,
    mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/prime-trade',
    jwtSecret: process.env.JWT_SECRET || 'change-me-in-production',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
    swaggerServerUrl: process.env.SWAGGER_SERVER_URL || 'http://localhost:5000'
  },
  statusCodes: {
    OK: StatusCodes.OK,
    CREATED: StatusCodes.CREATED,
    BAD_REQUEST: StatusCodes.BAD_REQUEST,
    UNAUTHORIZED: StatusCodes.UNAUTHORIZED,
    FORBIDDEN: StatusCodes.FORBIDDEN,
    NOT_FOUND: StatusCodes.NOT_FOUND,
    CONFLICT: StatusCodes.CONFLICT,
    UNPROCESSABLE_ENTITY: StatusCodes.UNPROCESSABLE_ENTITY,
    INTERNAL_SERVER_ERROR: StatusCodes.INTERNAL_SERVER_ERROR
  },
  messages: {
    GENERAL: {
      HEALTH_OK: 'Service is healthy',
      NOT_FOUND: 'Requested resource was not found',
      VALIDATION_FAILED: 'Validation failed',
      INTERNAL_ERROR: 'Something went wrong',
      TOO_MANY_REQUESTS: 'Too many requests, please try again later'
    },
    AUTH: {
      REGISTER_SUCCESS: 'User registered successfully',
      LOGIN_SUCCESS: 'Login successful',
      ADMIN_ACCESS_GRANTED: 'Admin access granted',
      INVALID_CREDENTIALS: 'Invalid email or password',
      UNAUTHORIZED: 'Authentication required',
      FORBIDDEN: 'You are not allowed to perform this action',
      TOKEN_MISSING: 'Authorization token is missing',
      TOKEN_INVALID: 'Invalid or expired token'
    },
    USER: {
      ALREADY_EXISTS: 'User already exists',
      ADMIN_BOOTSTRAP_NOTE: 'Create admin users directly in the database or through a protected seed flow'
    },
    TASK: {
      CREATED: 'Task created successfully',
      FETCHED: 'Task fetched successfully',
      LISTED: 'Tasks fetched successfully',
      UPDATED: 'Task updated successfully',
      DELETED: 'Task deleted successfully',
      NOT_FOUND: 'Task not found'
    }
  }
};

export default constants;
