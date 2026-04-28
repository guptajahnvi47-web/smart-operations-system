import express from 'express';
import { createTask, getTasks, updateTask, deleteTask, getWorkload } from '../controllers/taskController.js';
import { protect, authorizeRoles } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles('admin', 'manager'), createTask)
  .get(protect, getTasks);

router.route('/workload')
  .get(protect, authorizeRoles('admin', 'manager'), getWorkload);

router.route('/:id')
  .put(protect, updateTask)
  .delete(protect, authorizeRoles('admin', 'manager'), deleteTask);

export default router;
