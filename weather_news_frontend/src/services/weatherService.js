const API_BASE = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetch current weather for a city using OpenWeatherMap.
 * Uses metric units (Celsius).
 * Throws a descriptive Error on failures.
 * @param {string} city
 * @returns {Promise<object>}
 */
// PUBLIC_INTERFACE
export async function getCurrentWeather(city) {
  const key = process.env.REACT_APP_OPENWEATHER_API_KEY;
  if (!key) {
    throw new Error('OpenWeather API key missing. Set REACT_APP_OPENWEATHER_API_KEY in .env');
  }
  const q = encodeURIComponent(city);
  const url = `${API_BASE}/weather?q=${q}&appid=${key}&units=metric`;

  const res = await fetch(url);
  if (!res.ok) {
    const body = await safeJson(res);
    const msg = body?.message || `Weather request failed (${res.status})`;
    throw new Error(capitalize(msg));
  }
  return res.json();
}

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function capitalize(s) {
  if (!s || typeof s !== 'string') return s;
  return s.charAt(0).toUpperCase() + s.slice(1);
}
