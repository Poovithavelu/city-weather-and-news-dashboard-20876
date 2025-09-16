import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';

// Components
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import NewsList from './components/NewsList';
import Loading from './components/Loading';
import ErrorState from './components/ErrorState';

// Services
import { getCurrentWeather } from './services/weatherService';
import { getTopHeadlines } from './services/newsService';

// Hooks
import useLocalStorage from './hooks/useLocalStorage';

// Utils
import { formatCityQuery } from './utils/format';

// PUBLIC_INTERFACE
function App() {
  /**
   * The App component renders the complete Weather & News dashboard.
   * It manages theme, search flow, API calls, loading and error states,
   * and integrates localStorage caching for the last searched city.
   */
  const [theme, setTheme] = useLocalStorage('theme', 'light'); // persist theme
  const [city, setCity] = useLocalStorage('last_city', '');
  const [weather, setWeather] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Apply theme to document element for CSS variables
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
  }, [theme]);

  const hasKeys = useMemo(() => {
    const hasWeatherKey = Boolean(process.env.REACT_APP_OPENWEATHER_API_KEY);
    const hasNewsKey = Boolean(process.env.REACT_APP_NEWS_API_KEY);
    return { hasWeatherKey, hasNewsKey };
  }, []);

  // PUBLIC_INTERFACE
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  // PUBLIC_INTERFACE
  const handleSearch = async (rawCity) => {
    const q = formatCityQuery(rawCity);
    if (!q) {
      setError('Please enter a valid city name.');
      return;
    }
    setError('');
    setLoading(true);
    setWeather(null);
    setNews([]);

    try {
      const [w, n] = await Promise.all([
        getCurrentWeather(q),
        getTopHeadlines(q, 5),
      ]);
      setCity(q);
      setWeather(w);
      setNews(n);
    } catch (err) {
      console.error(err);
      setError(err?.message || 'Something went wrong while fetching data.');
    } finally {
      setLoading(false);
    }
  };

  // Try to auto-load last searched city on mount
  useEffect(() => {
    const autoLoad = async () => {
      if (city) {
        try {
          setLoading(true);
          setError('');
          const [w, n] = await Promise.all([
            getCurrentWeather(city),
            getTopHeadlines(city, 5),
          ]);
          setWeather(w);
          setNews(n);
        } catch (err) {
          console.error(err);
          setError('Could not load saved city data.');
        } finally {
          setLoading(false);
        }
      }
    };
    autoLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  return (
    <div className="App ocean-pro">
      <header className="navbar">
        <div className="brand">
          <div className="brand-mark" aria-hidden="true" />
          <span className="brand-name">City Weather & News</span>
        </div>
        <button
          className="btn theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      <main className="container">
        <section className="section">
          <h1 className="title">Discover the weather and headlines</h1>
          <p className="subtitle">
            Search any city to view current conditions and top news headlines.
          </p>
          {!hasKeys.hasWeatherKey || !hasKeys.hasNewsKey ? (
            <div className="notice error">
              Missing API keys. Please configure REACT_APP_OPENWEATHER_API_KEY and REACT_APP_NEWS_API_KEY in your .env file.
            </div>
          ) : null}
          <SearchBar
            defaultValue={city}
            onSearch={handleSearch}
            placeholder="e.g., London, UK"
          />
        </section>

        {loading && (
          <section className="section">
            <Loading message="Fetching weather and news..." />
          </section>
        )}

        {error && !loading && (
          <section className="section">
            <ErrorState message={error} />
          </section>
        )}

        {!loading && !error && (weather || news.length > 0) && (
          <>
            {weather && (
              <section className="section">
                <WeatherCard data={weather} />
              </section>
            )}
            <section className="section">
              <NewsList articles={news} />
            </section>
          </>
        )}
      </main>

      <footer className="footer">
        <span>
          Powered by OpenWeatherMap & NewsAPI
        </span>
      </footer>
    </div>
  );
}

export default App;
