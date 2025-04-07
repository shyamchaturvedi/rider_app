const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = 5000;

// MongoDB URI
const MONGO_URI = "mongodb+srv://rider_app_new:RJeHEZr0QQRlgyfD@cluster0.eauzego.mongodb.net/ride-app?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ===================
// Ride Schema & Model
// ===================
const rideSchema = new mongoose.Schema({
  customerName: String,
  pickupLocation: String,
  dropLocation: String,
  rideType: String, // Bike, Auto, Car
  status: {
    type: String,
    default: "pending", // pending, accepted, completed
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Ride = mongoose.model("Ride", rideSchema);

// ==============
// Routes Section
// ==============

// Test Route
app.get("/", (req, res) => {
  res.send("🚗 Ride Booking Backend Running Successfully!");
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
