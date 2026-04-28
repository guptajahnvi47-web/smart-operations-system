import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: ['TASK_CREATED', 'TASK_ASSIGNED', 'STATUS_UPDATED', 'USER_LOGGED_IN'],
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);

export default ActivityLog;
