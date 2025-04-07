import React, { useState } from "react";
import axios from "axios";

const RideForm = () => {
  const [formData, setFormData] = useState({
    customerName: "",
    pickupLocation: "",
    dropLocation: "",
    rideType: "Bike",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/book-ride", formData);
      alert("✅ Ride booked successfully!");
      setFormData({ customerName: "", pickupLocation: "", dropLocation: "", rideType: "Bike" });
    } catch (err) {
      alert("❌ Failed to book ride");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <h2>🚗 Book a Ride</h2>
      <input
        type="text"
        name="customerName"
        placeholder="Customer Name"
        value={formData.customerName}
        onChange={handleChange}
        required
      /><br /><br />
      <input
        type="text"
        name="pickupLocation"
        placeholder="Pickup Location"
        value={formData.pickupLocation}
        onChange={handleChange}
        required
      /><br /><br />
      <input
        type="text"
        name="dropLocation"
        placeholder="Drop Location"
        value={formData.dropLocation}
        onChange={handleChange}
        required
      /><br /><br />
      <select name="rideType" value={formData.rideType} onChange={handleChange}>
        <option value="Bike">Bike</option>
        <option value="Auto">Auto</option>
        <option value="Car">Car</option>
      </select><br /><br />
      <button type="submit">Book Ride</button>
    </form>
  );
};

export default RideForm;
