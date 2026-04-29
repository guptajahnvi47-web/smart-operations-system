import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import LogService from '../services/logService.js';

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export const signupUser = async (req, res, next) => {
  try {
    console.log("Signup API hit. Request body:", req.body);
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      console.error("Signup Error: User already exists");
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
    });

    if (user) {
      await LogService.logAction(user._id, 'USER_CREATED', null, { email: user.email });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      console.error("Signup Error: Invalid user data received");
      return res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error("Signup Catch Error:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res, next) => {
  try {
    console.log("Login API hit. Request body:", req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      console.error("Login Error: User not found");
      return res.status(400).json({ message: "User not found" });
    }

    // Using your custom matchPassword method on the User model
    const isMatch = await user.matchPassword(password);

    if (isMatch) {
      // (Optional) Log the login action if you kept the LogService
      await LogService.logAction(user._id, 'USER_LOGGED_IN', null, { email: user.email });

      // RETURN THE FULL USER OBJECT, NOT JUST THE TOKEN!
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      console.error("Login Error: Invalid password");
      return res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Login Catch Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};


// @desc    Get all users
// @route   GET /api/auth/users
// @access  Private/Admin,Manager
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    next(error);
  }
};
