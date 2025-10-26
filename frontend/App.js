import React, { useEffect, useState } from "react";
import LocationInput from "./LocationInput";
import WeatherDisplay from "./WeatherDisplay";

const API_URL = "http://localhost:5000/weather";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          fetchWeather({ lat: pos.coords.latitude, lon: pos.coords.longitude });
        },
        () => setLoading(false)
      );
    }
  }, []);

  const fetchWeather = async ({ lat, lon, city }) => {
    setLoading(true);
    setError("");
    let query = lat && lon ? `lat=${lat}&lon=${lon}` : city ? `city=${encodeURIComponent(city)}` : "";
    try {
      const res = await fetch(`${API_URL}?${query}`);
      const data = await res.json();
      if (res.ok) setWeather(data);
      else setError(data.error || "Could not fetch weather");
    } catch (e) {
      setError("Could not fetch weather");
    }
    setLoading(false);
  };

  const handleManualInput = (city) => {
    fetchWeather({ city });
  };

  return (
    <div style={{ maxWidth: 500, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Weather App</h2>
      <LocationInput onSubmit={handleManualInput} />
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {weather && <WeatherDisplay data={weather} />}
    </div>
  );
}

export default App;