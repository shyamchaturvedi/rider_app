const mongoose = require("mongoose");

const RideSchema = new mongoose.Schema({
  name: String,
  pickup: String,
  drop: String,
  phone: String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Ride", RideSchema);
