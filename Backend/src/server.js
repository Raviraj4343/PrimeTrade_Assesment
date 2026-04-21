import app from './app.js';
import { connectDatabase } from './config/db.js';
import constants from './constants/constant.js';
import { logger } from './utils/logger.js';

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(constants.config.port, () => {
      logger.info(
        `Server running in ${constants.config.nodeEnv} mode on port ${constants.config.port}`
      );
    });
  } catch (error) {
    logger.error(`Server startup failed: ${error.message}`);
    process.exit(1);
  }
};

startServer();
