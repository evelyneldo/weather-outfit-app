import React, { useState } from 'react';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import ForecastCard from './components/ForecastCard';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const fetchWeather = async () => {
    if (!city) return alert("Enter a city");
    try {
      const current = await fetch(`http://localhost:5000/api/current?city=${city}`);
      const forecast = await fetch(`http://localhost:5000/api/forecast?city=${city}`);
      setWeatherData(await current.json());
      setForecastData(await forecast.json());
    } catch {
      alert("Weather fetch failed.");
    }
  };

  return (
    <div className="app-container">
      <h1>WeatherWear</h1>
      <input value={city} onChange={e => setCity(e.target.value)} placeholder="Enter city" />
      <button onClick={fetchWeather}>Check</button>
      {weatherData && <CurrentWeatherCard data={weatherData} />}
      {forecastData && <ForecastCard list={forecastData.list} />}
    </div>
  );
}

export default App;