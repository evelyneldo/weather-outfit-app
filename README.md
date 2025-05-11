# 🌦️ WeatherWear - Outfit Suggestion App

**WeatherWear** is a smart and stylish web app that provides clothing recommendations based on real-time weather data. Built using React and Express, it integrates the OpenWeatherMap and Amadeus APIs to deliver current weather and a 5-day forecast, along with outfit suggestions for any searched city.

---

## Features

- **City Search** – Enter any city and view live weather details.
- **Current Weather** – Displays real-time temperature, weather description, and icon.
- **Outfit Recommendations** – Suggests clothing based on temperature and weather conditions.
- **5-Day Forecast** – Horizontally scrollable forecast grouped by day with icons and outfit tips.
- **Responsive UI** – Clean and mobile-friendly layout with condition-based card styling.

---

## Tech Stack

| Area       | Technology                         |
|------------|-------------------------------------|
| Frontend   | React (Vite), CSS                  |
| Backend    | Node.js, Express.js                |
| APIs       | OpenWeatherMap, Amadeus API        |

---

## Getting Started

### Prerequisites
- Node.js installed
- API keys for:
  - [OpenWeatherMap](https://openweathermap.org/api)
  - [Amadeus API](https://developers.amadeus.com)

### Folder Structure
```
weatherwear/
├── client/             # React frontend
│   ├── src/
│   │   ├── components/ # Weather and forecast cards
│   │   ├── utils/      # Outfit logic
│   │   └── index.css   # Styling
│
├── server/             # Node/Express backend
│   ├── index.js        # Weather API endpoints
│   └── .env            # API keys (not committed)
│
├── .gitignore
├── README.md
```

### Create `.env` File
Inside the `/server` folder, create a `.env` file and add your API keys:

```env
# server/.env
OPENWEATHER_API_KEY=your_openweathermap_api_key
AMADEUS_API_KEY=your_amadeus_api_key
AMADEUS_API_SECRET=your_amadeus_api_secret
```

Ensure `.env` is **excluded from Git** by confirming these lines exist in `.gitignore`:
```bash
.env
server/.env
```

---

## Running the App Locally

### Step 1: Clone the repository
```bash
git clone https://github.com/evelyneldo/weather-outfit-app.git
cd weather-outfit-app
```

### Step 2: Setup and start the backend
```bash
cd server
npm install
node index.js
```
> Or use `npm start` if you've added a start script in package.json.

### Step 3: Setup and start the frontend
```bash
cd ../client
npm install
npm run dev
```
---

## 📄 License
This project was created for learning purposes only. Not licensed for commercial or production use.
