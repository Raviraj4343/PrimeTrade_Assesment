import { Router } from 'express';
import authRoutes from './auth.routes.js';
import taskRoutes from './task.routes.js';
import constants from '../constants/constant.js';

const router = Router();

router.get('/', (req, res) => {
  res.status(constants.statusCodes.OK).json({
    success: true,
    message: constants.messages.GENERAL.API_INFO,
    data: {
      version: 'v1',
      docs: '/api-docs',
      health: '/health'
    }
  });
});

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);

export default router;
