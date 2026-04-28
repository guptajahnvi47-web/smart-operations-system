import Task from '../models/Task.js';
import LogService from '../services/logService.js';

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private/Admin,Manager
export const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, assignedTo, dueDate } = req.body;

    const task = new Task({
      title,
      description,
      priority,
      assignedTo,
      dueDate,
      createdBy: req.user._id,
    });

    const createdTask = await task.save();

    await LogService.logAction(req.user._id, 'TASK_CREATED', createdTask._id, { title });
    await LogService.logAction(req.user._id, 'TASK_ASSIGNED', createdTask._id, { assignedTo });

    res.status(201).json(createdTask);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res, next) => {
  try {
    let query = {};
    
    // Admins see all tasks, Managers see all tasks (or could be scoped to their team), Users see only their assigned tasks
    if (req.user.role === 'user') {
      query.assignedTo = req.user._id;
    }

    const tasks = await Task.find(query).populate('assignedTo', 'name email').populate('createdBy', 'name email').sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

// @desc    Update task status
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res, next) => {
  try {
    const { status, priority, description } = req.body;
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    // Role checks
    if (req.user.role === 'user' && task.assignedTo.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this task');
    }

    const oldStatus = task.status;
    
    if (status) task.status = status;
    // Managers/Admins might update other fields
    if (req.user.role !== 'user') {
      if (priority) task.priority = priority;
      if (description) task.description = description;
    }

    const updatedTask = await task.save();

    if (status && oldStatus !== status) {
      await LogService.logAction(req.user._id, 'STATUS_UPDATED', updatedTask._id, { oldStatus, newStatus: status });
    }

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private/Admin,Manager
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    await task.deleteOne();
    await LogService.logAction(req.user._id, 'TASK_DELETED', task._id, { title: task.title });

    res.json({ message: 'Task removed' });
  } catch (error) {
    next(error);
  }
};
