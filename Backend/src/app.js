import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import constants from './constants/constant.js';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';
import { swaggerSpec } from './config/swagger.js';

const app = express();
const allowedOrigins = constants.config.clientUrl.split(',').map((origin) => origin.trim());
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: constants.config.nodeEnv === 'production' ? 100 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: constants.messages.GENERAL.TOO_MANY_REQUESTS
  }
});

app.use(helmet());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  })
);
app.use(apiLimiter);
app.use(hpp());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan(constants.config.nodeEnv === 'production' ? 'combined' : 'dev'));

app.get('/health', (req, res) => {
  res.status(constants.statusCodes.OK).json({
    success: true,
    message: constants.messages.GENERAL.HEALTH_OK,
    timestamp: new Date().toISOString()
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(constants.api.prefix, routes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
