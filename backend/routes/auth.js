import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// ================= LOGIN VALIDATION =================
const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Valid email required'),
  body('password').notEmpty().withMessage('Password is required')
];

// ================= TOKEN =================
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || 'secretkey',
    { expiresIn: '7d' }
  );
};

console.log("🔥🔥 LOGIN ROUTE LOADED 🔥🔥");
// ================= LOGIN =================
router.post('/login', loginValidation, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { name, email, password, phone, address } = req.body;

    email = email.toLowerCase().trim();
    password = password.trim();
    
    console.log("LOGIN DEBUG");
    console.log("Email:", email);
    console.log("Password:", password);

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    console.log("Entered password:", JSON.stringify(password));
    console.log("DB hash:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("bcrypt result:", isMatch);

       // 🔥 FORCE TEST
    const testMatch = await bcrypt.compare("123456", user.password);
    console.log("Hardcoded test:", testMatch);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    user.lastLogin = new Date();
    await user.save();

    const token = generateToken(user._id);

    res.json({
      message: "Login successful",
      token
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ================= REGISTER =================
router.post('/register', async (req, res) => {
  try {
    let { name, email, password, phone, address } = req.body;

    email = email.toLowerCase().trim();
    password = password.trim();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password,
      phone,
      address,
      role: "farmer"
    });

    await user.save();

    res.json({ message: "User registered successfully" });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
