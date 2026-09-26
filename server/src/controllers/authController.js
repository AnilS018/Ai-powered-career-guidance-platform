const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Profile = require('../models/Profile');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'careerpulse_super_secret_jwt_key_2026_dev_sec', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { fullName, email, password, education, college, graduationYear } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide name, email, and password.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists with this email.' });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      education: education || 'B.Tech Computer Science',
      college: college || 'University Engineering College',
      graduationYear: graduationYear ? Number(graduationYear) : new Date().getFullYear(),
      role: 'STUDENT',
    });

    // Create default profile for user
    await Profile.create({
      user: user._id,
      education: {
        college: user.college,
        degree: user.education,
        department: 'Computer Science & Engineering',
        graduationYear: user.graduationYear,
        cgpa: '8.4',
      },
      careerInterests: ['Artificial Intelligence', 'Software Development'],
      technicalSkills: [
        { name: 'Python', level: 'Intermediate', proficiency: 65 },
        { name: 'SQL', level: 'Intermediate', proficiency: 60 },
        { name: 'JavaScript', level: 'Beginner', proficiency: 50 },
      ],
      softSkills: ['Communication', 'Problem Solving', 'Teamwork'],
      preferredIndustries: ['IT', 'Finance', 'E-commerce'],
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        education: user.education,
        college: user.college,
        graduationYear: user.graduationYear,
      },
    });
  } catch (error) {
    console.error('[Register Error]', error);
    res.status(500).json({ success: false, message: error.message || 'Server error during registration.' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. User not found.' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials. Incorrect password.' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        education: user.education,
        college: user.college,
        graduationYear: user.graduationYear,
      },
    });
  } catch (error) {
    console.error('[Login Error]', error);
    res.status(500).json({ success: false, message: error.message || 'Server error during login.' });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        education: user.education,
        college: user.college,
        graduationYear: user.graduationYear,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving user data.' });
  }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ success: false, message: 'No account with that email address exists.' });
  }

  // In production, an email with a reset link is sent. For local dev/demo, we return a success confirmation.
  res.status(200).json({
    success: true,
    message: 'Password reset link sent to your registered email address (simulated for demo).',
  });
};

// @desc    Logout user (clears token on client)
// @route   POST /api/auth/logout
// @access  Public
exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User logged out successfully.',
  });
};
