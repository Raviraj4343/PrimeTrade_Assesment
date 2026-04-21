import mongoose from 'mongoose';
import Task from '../models/task.model.js';
import constants from '../constants/constant.js';
import { ApiError } from '../utils/apiError.js';

const buildTaskAccessQuery = (user, taskId = null) => {
  const query = {};

  if (taskId) {
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      throw new ApiError(constants.statusCodes.NOT_FOUND, constants.messages.TASK.NOT_FOUND);
    }

    query._id = taskId;
  }

  if (user.role !== constants.roles.ADMIN) {
    query.user = user.id;
  }

  return query;
};

const buildTaskListQuery = (user, filters) => {
  const query = buildTaskAccessQuery(user);

  if (filters.status) {
    query.status = filters.status;
  }

  if (filters.search) {
    query.$or = [
      { title: { $regex: filters.search, $options: 'i' } },
      { description: { $regex: filters.search, $options: 'i' } }
    ];
  }

  return query;
};

export const createTask = async (payload, user) =>
  Task.create({
    ...payload,
    user: user.id
  });

export const getTasks = async (user, filters) => {
  const page = Number(filters.page || 1);
  const limit = Number(filters.limit || 10);
  const skip = (page - 1) * limit;
  const sort = filters.sort === 'oldest' ? { createdAt: 1 } : { createdAt: -1 };
  const query = buildTaskListQuery(user, filters);

  const [tasks, total] = await Promise.all([
    Task.find(query).sort(sort).skip(skip).limit(limit).populate('user', 'name email role'),
    Task.countDocuments(query)
  ]);

  return {
    items: tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1
    }
  };
};

export const getTaskById = async (taskId, user) => {
  const task = await Task.findOne(buildTaskAccessQuery(user, taskId)).populate(
    'user',
    'name email role'
  );

  if (!task) {
    throw new ApiError(constants.statusCodes.NOT_FOUND, constants.messages.TASK.NOT_FOUND);
  }

  return task;
};

export const updateTask = async (taskId, payload, user) => {
  const task = await Task.findOneAndUpdate(buildTaskAccessQuery(user, taskId), payload, {
    new: true,
    runValidators: true
  }).populate('user', 'name email role');

  if (!task) {
    throw new ApiError(constants.statusCodes.NOT_FOUND, constants.messages.TASK.NOT_FOUND);
  }

  return task;
};

export const deleteTask = async (taskId, user) => {
  const task = await Task.findOneAndDelete(buildTaskAccessQuery(user, taskId));

  if (!task) {
    throw new ApiError(constants.statusCodes.NOT_FOUND, constants.messages.TASK.NOT_FOUND);
  }

  return task;
};
