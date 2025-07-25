# SkyCast - Find My Weather
## Date: 21-07-25
## Objective:
To build a responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API. This project demonstrates the use of Axios for API calls, React Router for navigation, React Hooks for state management, controlled components with validation, and basic styling with CSS.
## Tasks:

#### 1. Project Setup
Initialize React app.

Install necessary dependencies: npm install axios react-router-dom

#### 2. Routing
Set up BrowserRouter in App.js.

Create two routes:

/ – Home page with input form.

/weather – Page to display weather results.

#### 3. Home Page (City Input)
Create a controlled input field for the city name.

Add validation to ensure the input is not empty.

On valid form submission, navigate to /weather and store the city name.

#### 4. Weather Page (API Integration)
Use Axios to fetch data from the OpenWeatherMap API using the city name.

Show temperature, humidity, wind speed, and weather condition.

Convert and display temperature in both Celsius and Fahrenheit using useMemo.

#### 5. React Hooks
Use useState for managing city, weather data, and loading state.

Use useEffect to trigger the Axios call on page load.

Use useCallback to optimize form submit handler.

Use useMemo for temperature conversion logic.

#### 6. UI Styling (CSS)
Create a responsive and clean layout using CSS.

Style form, buttons, weather display cards, and navigation links.

## Programs:
### App.jsx
```
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Weather from './components/Weather';

const App = () => {
  const [city, setCity] = useState('');

  return (
    <Routes>
      <Route path="/" element={<Home setCity={setCity} />} />
      <Route path="/weather" element={<Weather city={city} />} />
    </Routes>
  );
};

export default App;

```
### Main.jsx
```
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);


```

### Home.jsx
```
import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ setCity }) => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (input.trim() === '') {
      setError('City name cannot be empty');
      return;
    }
    setCity(input.trim());
    navigate('/weather');
  }, [input, setCity, navigate]);

  return (
    <div className="container">
      <h1>Weather Finder</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city name"
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Home;

```
### Weather.jsx
```
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

```
## Output:
<img width="1920" height="1080" alt="Screenshot 2025-07-21 203151" src="https://github.com/user-attachments/assets/018d15a1-dc06-40e0-be98-a031b1b92a9b" />



## Result:
A responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API has been built successfully. 
