const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();
const JWT_SECRET = "shyam_secret_token"; // Isko .env me rakhna better hota hai

// Register
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashedPassword });
    res.json({ message: "✅ User registered", user });
  } catch (err) {
    res.status(400).json({ error: "❌ User already exists" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
  res.json({ message: "✅ Login success", token });
});

module.exports = router;
