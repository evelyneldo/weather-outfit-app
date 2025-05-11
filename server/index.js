import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors());

let amadeusToken = '';

async function fetchAmadeusToken() {
  const res = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=client_credentials&client_id=${process.env.AMADEUS_API_KEY}&client_secret=${process.env.AMADEUS_API_SECRET}`
  });

  const data = await res.json();
  amadeusToken = data.access_token;
  return amadeusToken;
}

async function getGeoCoordinates(city) {
  if (!amadeusToken) await fetchAmadeusToken();

  const res = await fetch(`https://test.api.amadeus.com/v1/reference-data/locations/cities?keyword=${encodeURIComponent(city)}&max=1`, {
    headers: { Authorization: `Bearer ${amadeusToken}` }
  });

  const data = await res.json();
  if (!data || !data.data || data.data.length === 0) {
    throw new Error('City not found');
  }

  return data.data[0].geoCode; // { latitude, longitude }
}

// GET: Current Weather
app.get('/api/current', async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const { latitude, longitude } = await getGeoCoordinates(city);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error('OpenWeather error:', data);
      return res.status(response.status).json({ error: data.message || 'OpenWeather error' });
    }

    res.json(data);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: err.message || 'Failed to fetch current weather' });
  }
});

// GET: 5-Day Forecast
app.get('/api/forecast', async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const { latitude, longitude } = await getGeoCoordinates(city);
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error('OpenWeather error:', data);
      return res.status(response.status).json({ error: data.message || 'OpenWeather error' });
    }

    res.json(data);
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: err.message || 'Failed to fetch forecast data' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Backend server is running at: http://localhost:${PORT}`);
});
