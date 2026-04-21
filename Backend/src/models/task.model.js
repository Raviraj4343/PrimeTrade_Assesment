import mongoose from 'mongoose';
import constants from '../constants/constant.js';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 150
    },
    description: {
      type: String,
      trim: true,
      default: '',
      maxlength: 1000
    },
    status: {
      type: String,
      enum: Object.values(constants.taskStatus),
      default: constants.taskStatus.TODO
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

taskSchema.index({ user: 1, createdAt: -1 });
taskSchema.index({ user: 1, status: 1, createdAt: -1 });
taskSchema.index({ status: 1, createdAt: -1 });

taskSchema.virtual('isCompleted').get(function isCompleted() {
  return this.status === constants.taskStatus.COMPLETED;
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
