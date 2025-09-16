# City Weather & News Dashboard (React)

A responsive React application that lets users search for a city and view:
- Current weather via OpenWeatherMap
- Top 5 news headlines via NewsAPI

Includes a modern Ocean Professional theme, loading and error states, and caching of the last searched city.

## Quick Start

1) Copy .env.example to .env and add your API keys:
```
REACT_APP_OPENWEATHER_API_KEY=your_openweather_api_key
REACT_APP_NEWS_API_KEY=your_newsapi_key
```

2) Install dependencies and run:
```
npm install
npm start
```

3) Open http://localhost:3000

## Features
- Clean, card-based UI with subtle shadows and rounded corners
- Search with instant feedback, loading indicators, error handling
- LocalStorage caching for theme and last searched city
- Minimal dependencies, fast and lightweight

## Scripts
- npm start — run development server
- npm test — run test suite
- npm run build — build for production

## Notes
- Weather data uses metric units (Celsius).
- If API keys are missing, the app will show a notice on the home screen.
