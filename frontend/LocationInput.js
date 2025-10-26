import React, { useState } from "react";
export default function LocationInput({ onSubmit }) {
  const [city, setCity] = useState("");
  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(city); }}>
      <input
        type="text"
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Enter city name"
        style={{ padding: 8, width: "70%" }}
      />
      <button type="submit" style={{ padding: "8px 14px", marginLeft: 8 }}>
        Search
      </button>
    </form>
  );
}