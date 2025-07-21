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
