import React, { useState } from "react";

function RideForm() {
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`🚕 Ride booked from ${pickup} to ${drop}`);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🚗 Book Your Ride</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          required
        /><br /><br />
        <input
          type="text"
          placeholder="Drop Location"
          value={drop}
          onChange={(e) => setDrop(e.target.value)}
          required
        /><br /><br />
        <button type="submit">Book Ride</button>
      </form>
    </div>
  );
}

export default RideForm;
