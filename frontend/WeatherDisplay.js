import React from "react";
export default function WeatherDisplay({ data }) {
  const now = data.list[0];
  const upcoming = data.list.slice(1, 6);
  return (
    <div style={{ background: "#eef", padding: 16, borderRadius: 10 }}>
      <h3>{data.city.name}, {data.city.country}</h3>
      <div>
        <strong>Now: </strong>
        <img
          src={`https://openweathermap.org/img/wn/${now.weather[0].icon}@2x.png`}
          alt={now.weather[0].description}
        />
        {Math.round(now.main.temp)}°C, {now.weather[0].main}
      </div>
      <h4 style={{ marginTop: 16 }}>Upcoming:</h4>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {upcoming.map(item => (
          <li key={item.dt}>
            {new Date(item.dt_txt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {Math.round(item.main.temp)}°C, {item.weather[0].main}
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
              style={{ verticalAlign: "middle" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}