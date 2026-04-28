import ActivityLog from '../models/ActivityLog.js';

class LogService {
  static async logAction(userId, action, taskId = null, metadata = {}) {
    try {
      const log = new ActivityLog({
        userId,
        action,
        taskId,
        metadata,
      });
      await log.save();
    } catch (error) {
      console.error('Failed to log activity:', error.message);
    }
  }

  static async getLogs() {
    return await ActivityLog.find()
      .populate('userId', 'name email role')
      .populate('taskId', 'title')
      .sort('-createdAt');
  }
}

export default LogService;
