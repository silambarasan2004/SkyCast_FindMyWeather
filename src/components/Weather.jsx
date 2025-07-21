import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const API_KEY = 'dfdc6ef1d64c37daa3a1082890999b47';

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!city) {
      navigate('/');
      return;
    }

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then(response => {
        setWeather(response.data);
      })
      .catch(err => {
        console.error('Error fetching weather data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [city, navigate]);

  const tempFahrenheit = useMemo(() => {
    return weather ? (weather.main.temp * 9/5 + 32).toFixed(2) : null;
  }, [weather]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!weather) {
    return <p>Weather data not available. Please try again.</p>;
  }

  return (
    <div className="container">
      <h1>Weather in {city}</h1>
      <div className="card">
        <p><strong>Temperature:</strong> {weather.main.temp}°C / {tempFahrenheit}°F</p>
        <p><strong>Humidity:</strong> {weather.main.humidity}%</p>
        <p><strong>Wind Speed:</strong> {weather.wind.speed} m/s</p>
        <p><strong>Condition:</strong> {weather.weather[0].description}</p>
      </div>
      <Link to="/">Search Again</Link>
    </div>
  );
};

export default Weather;
