import constants from '../constants/constant.js';
import {
  createTask,
  deleteTask,
  getTaskById,
  getTasks,
  updateTask
} from '../services/task.service.js';
import { sendResponse } from '../utils/apiResponse.js';

export const createTaskController = async (req, res) => {
  const task = await createTask(req.body, req.user);
  return sendResponse(res, constants.statusCodes.CREATED, constants.messages.TASK.CREATED, task);
};

export const getTasksController = async (req, res) => {
  const tasks = await getTasks(req.user, req.query);
  return sendResponse(res, constants.statusCodes.OK, constants.messages.TASK.LISTED, tasks);
};

export const getTaskController = async (req, res) => {
  const task = await getTaskById(req.params.id, req.user);
  return sendResponse(res, constants.statusCodes.OK, constants.messages.TASK.FETCHED, task);
};

export const updateTaskController = async (req, res) => {
  const task = await updateTask(req.params.id, req.body, req.user);
  return sendResponse(res, constants.statusCodes.OK, constants.messages.TASK.UPDATED, task);
};

export const deleteTaskController = async (req, res) => {
  await deleteTask(req.params.id, req.user);
  return sendResponse(res, constants.statusCodes.OK, constants.messages.TASK.DELETED);
};
