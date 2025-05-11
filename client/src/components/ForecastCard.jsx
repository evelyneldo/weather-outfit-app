import React from 'react';
import getOutfit from '../utils/getOutfit';

export default function ForecastCard({ list }) {
  const groupedByDay = list.reduce((acc, item) => {
    const date = item.dt_txt.split(' ')[0];
    const existing = acc.find(d => d.date === date);
    if (existing) existing.items.push(item);
    else acc.push({ date, items: [item] });
    return acc;
  }, []);

  return (
    <div className="forecast-section">
      <h2>Outfit Forecast</h2>
      <div className="forecast-container">
        {groupedByDay.map((day, idx) => (
          <div key={idx} className="forecast-day">
            <h4>{day.date}</h4>
            {day.items.map((item, index) => {
              const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
              return (
                <div key={index} className="forecast-item">
                  <p className="time">{item.dt_txt.split(' ')[1]}</p>
                  <img src={iconUrl} alt={item.weather[0].description} />
                  <p>{item.weather[0].main}, {item.main.temp}°C</p>
                  <em>Wear: {getOutfit(item.main.temp, item.weather[0].main)}</em>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
