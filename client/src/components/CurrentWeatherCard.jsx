import React from 'react';
import getOutfit from '../utils/getOutfit';

export default function CurrentWeatherCard({ data }) {
  const temp = data.main.temp;
  const condition = data.weather[0].main;
  const outfit = getOutfit(temp, condition);
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className={`current-weather weather-${condition.toLowerCase()}`}>
      <h2>Now in {data.name}</h2>
      <img src={iconUrl} alt={condition} />
      <p className="description">{data.weather[0].description}</p>
      <p className="temperature">{temp}°C</p>
      <strong className="outfit">Wear: {outfit}</strong>
    </div>
  );
}
