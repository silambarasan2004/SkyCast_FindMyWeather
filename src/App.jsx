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
