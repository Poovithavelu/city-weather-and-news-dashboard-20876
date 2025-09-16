const API_BASE = 'https://newsapi.org/v2';

/**
 * Fetch top headlines related to a query (city).
 * Defaults to English language.
 * Throws a descriptive Error on failures.
 * @param {string} city
 * @param {number} pageSize
 * @returns {Promise<object[]>}
 */
// PUBLIC_INTERFACE
export async function getTopHeadlines(city, pageSize = 5) {
  const key = process.env.REACT_APP_NEWS_API_KEY;
  if (!key) {
    throw new Error('NewsAPI key missing. Set REACT_APP_NEWS_API_KEY in .env');
  }
  const q = encodeURIComponent(city);
  const url = `${API_BASE}/everything?q=${q}&language=en&pageSize=${pageSize}&sortBy=publishedAt`;

  const res = await fetch(url, {
    headers: {
      'X-Api-Key': key
    }
  });

  if (!res.ok) {
    const body = await safeJson(res);
    const msg = body?.message || `News request failed (${res.status})`;
    throw new Error(msg);
  }

  const data = await res.json();
  return Array.isArray(data?.articles) ? data.articles : [];
}

async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}
