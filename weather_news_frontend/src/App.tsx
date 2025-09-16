import React, { useEffect } from 'react';
import { useAppStore } from './store';
import { clsx } from 'clsx';

// PUBLIC_INTERFACE
/**
 * App component renders the search input, weather card and news list with Tailwind styling.
 */
export default function App() {
  const { city, setCity, search, loading, error, weather, news } = useAppStore();

  useEffect(() => {
    if (city) {
      // auto-load last city
      search(city);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500/10 to-gray-50">
      <header className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">
          City Weather & News Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Search a city to view current weather and latest headlines.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <input
            className="flex-1 rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary bg-surface shadow-sm"
            placeholder="Enter city name..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && search()}
          />
          <button
            onClick={() => search()}
            className={clsx(
              'rounded-lg px-6 py-3 font-medium text-white bg-primary shadow-sm transition',
              'hover:brightness-110 active:brightness-95'
            )}
          >
            Search
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-error">
            {error}
          </div>
        )}
      </header>

      <main className="container mx-auto px-4 pb-16">
        {loading && (
          <div className="animate-pulse">
            <div className="h-28 rounded-xl bg-gray-200" />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-20 rounded-xl bg-gray-200" />
              ))}
            </div>
          </div>
        )}

        {!loading && weather && (
          <section className="mt-4">
            <div className="rounded-xl bg-surface shadow p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                {weather.icon ? (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt={weather.condition}
                    className="w-16 h-16"
                  />
                ) : null}
                <div>
                  <h2 className="text-2xl font-semibold">{weather.name}</h2>
                  <p className="text-gray-600">
                    {weather.tempC}°C • {weather.condition}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {!loading && news.length > 0 && (
          <section className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Top Headlines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {news.map((n, idx) => (
                <a
                  key={idx}
                  href={n.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-gray-100 bg-surface p-4 shadow hover:shadow-md transition"
                >
                  <div className="text-sm text-gray-500">{n.source}</div>
                  <div className="font-medium text-gray-800">{n.title}</div>
                </a>
              ))}
            </div>
          </section>
        )}
      </main>

      <footer className="container mx-auto px-4 pb-10 text-sm text-gray-500">
        Data from OpenWeatherMap and NewsAPI.
      </footer>
    </div>
  );
}
