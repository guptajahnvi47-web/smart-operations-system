import express from 'express';
import { signupUser, loginUser, getUsers } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/users', protect, getUsers);

export default router;
