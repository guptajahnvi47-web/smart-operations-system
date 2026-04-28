import LogService from '../services/logService.js';

// @desc    Get activity logs
// @route   GET /api/logs
// @access  Private/Admin
export const getLogs = async (req, res, next) => {
  try {
    const logs = await LogService.getLogs();
    res.json(logs);
  } catch (error) {
    next(error);
  }
};
