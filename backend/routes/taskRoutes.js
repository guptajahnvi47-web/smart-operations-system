import express from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/taskController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles('admin', 'manager'), createTask)
  .get(protect, getTasks);

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, authorizeRoles('admin', 'manager'), deleteTask);

export default router;
