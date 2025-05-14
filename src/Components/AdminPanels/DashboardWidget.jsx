import React, { useState, useEffect } from "react";
import "../AdminPanels/DashboardWidget.css"

const DashboardWidget = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Update time every second
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    fetchWeather(); // Initial fetch

    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async () => {
    const apiKey = "dbee662962fd4b1d6c8f38522eb5f9dc"; // Replace with a valid API Key
    const city = "Patna";

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Weather Data:", data);

      if (data.main && data.weather) {
        setWeather(data);
      } else {
        throw new Error("Invalid Data Format from API");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-widget" style={styles.wheathercontainer}>
      <h2>Wheather & Timing </h2>
      <p style={styles.time}>
        🕒 {time.toLocaleTimeString()} - 📅 {time.toDateString()}
      </p>
      {loading ? (
        <p>Loading weather...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : weather ? (
        <div style={styles.weather}>
          <p>🌡 Temp: {weather.main?.temp}°C</p>
          <p>🌦 {weather.weather[0]?.description}</p>
          <p>🌍 {weather.name}</p>
        </div>
      ) : (
        <p>Weather data not available</p>
      )}
    </div>
  );
};

const styles = {
  wheathercontainer: {
    padding: "20px",
  
 
    // width: "300px",
    textAlign: "center",
    // background: "#f9f9f9",
  },
  time: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  weather: {
    marginTop: "10px",
    fontSize: "16px",
  },
};

export default DashboardWidget;
