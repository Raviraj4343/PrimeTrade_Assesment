import { Router } from 'express';
import {
  createTaskController,
  deleteTaskController,
  getTaskController,
  getTasksController,
  updateTaskController
} from '../controllers/task.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validate } from '../middleware/validate.middleware.js';
import {
  createTaskSchema,
  mongoIdParamSchema,
  taskQuerySchema,
  updateTaskSchema
} from '../validations/task.validation.js';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /api/v1/tasks:
 *   get:
 *     summary: Get tasks for current user, or all tasks for admins
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task list returned
 *   post:
 *     summary: Create a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Task created
 */
router
  .route('/')
  .get(validate(taskQuerySchema, 'query'), getTasksController)
  .post(validate(createTaskSchema), createTaskController);

/**
 * @swagger
 * /api/v1/tasks/{id}:
 *   get:
 *     summary: Get a single task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task returned
 *   patch:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task updated
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Task deleted
 */
router
  .route('/:id')
  .get(validate(mongoIdParamSchema, 'params'), getTaskController)
  .patch(
    validate(mongoIdParamSchema, 'params'),
    validate(updateTaskSchema),
    updateTaskController
  )
  .delete(validate(mongoIdParamSchema, 'params'), deleteTaskController);

export default router;
