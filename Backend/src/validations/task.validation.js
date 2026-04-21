import Joi from 'joi';
import constants from '../constants/constant.js';

export const createTaskSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150).required(),
  description: Joi.string().trim().allow('').max(1000).default(''),
  status: Joi.string()
    .valid(...Object.values(constants.taskStatus))
    .default(constants.taskStatus.TODO)
});

export const updateTaskSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150),
  description: Joi.string().trim().allow('').max(1000),
  status: Joi.string().valid(...Object.values(constants.taskStatus))
}).min(1);

export const mongoIdParamSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});

export const taskQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  status: Joi.string().valid(...Object.values(constants.taskStatus)),
  search: Joi.string().trim().allow(''),
  sort: Joi.string().valid('latest', 'oldest').default('latest')
});
