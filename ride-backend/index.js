const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const JWT_SECRET = "shyam_secret_token"; // Secure this later

// MongoDB URI
const MONGO_URI = "mongodb+srv://rider_app_new:RJeHEZr0QQRlgyfD@cluster0.eauzego.mongodb.net/ride-app?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use(cors());
app.use(bodyParser.json());

// ===================
// Models
// ===================

const rideSchema = new mongoose.Schema({
  customerName: String,
  pickupLocation: String,
  dropLocation: String,
  rideType: String,
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const Ride = mongoose.model("Ride", rideSchema);

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },
});

const User = mongoose.model("User", userSchema);

// ===================
// Routes
// ===================

// Test Route
app.get("/", (req, res) => {
  res.send("🚗 Ride Booking Backend Running Successfully!");
});

// Register
app.post("/auth/register", async (req, res) => {
  const { name, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ message: "✅ Registered", user });
  } catch (err) {
    res.status(400).json({ error: "❌ Email already in use" });
  }
});

// Login
app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Wrong password" });

  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
  res.status(200).json({ message: "✅ Login success", token });
});

// Book Ride
app.post("/book-ride", async (req, res) => {
  try {
    const newRide = new Ride(req.body);
    await newRide.save();
    res.status(201).json({ message: "✅ Ride booked successfully", ride: newRide });
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to book ride", details: err.message });
  }
});

// Get All Rides
app.get("/rides", async (req, res) => {
  try {
    const rides = await Ride.find().sort({ createdAt: -1 });
    res.status(200).json(rides);
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to fetch rides" });
  }
});

// Accept Ride
app.patch("/accept-ride/:id", async (req, res) => {
  try {
    const updated = await Ride.findByIdAndUpdate(
      req.params.id,
      { status: "accepted" },
      { new: true }
    );
    res.status(200).json({ message: "✅ Ride accepted", ride: updated });
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to accept ride" });
  }
});

// Complete Ride
app.patch("/complete-ride/:id", async (req, res) => {
  try {
    const updated = await Ride.findByIdAndUpdate(
      req.params.id,
      { status: "completed" },
      { new: true }
    );
    res.status(200).json({ message: "✅ Ride completed", ride: updated });
  } catch (err) {
    res.status(500).json({ error: "❌ Failed to complete ride" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});