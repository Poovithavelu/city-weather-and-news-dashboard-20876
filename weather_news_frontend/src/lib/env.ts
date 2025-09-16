type Env = {
  OPENWEATHER_API_KEY?: string;
  NEWS_API_KEY?: string;
};

// PUBLIC_INTERFACE
/**
 * Returns environment variables for the app.
 * Note: Variables must be defined in the runtime environment (Vite uses import.meta.env).
 * For this project, the orchestrator will set .env values.
 */
export function getEnv(): Required<Env> {
  // The provided environment variables are double-prefixed in the request detail.
  // We accept both possibilities to be resilient.
  const OW =
    (import.meta as any).env.VITE_REACT_APP_OPENWEATHER_API_KEY ??
    (import.meta as any).env.VITE_OPENWEATHER_API_KEY ??
    (import.meta as any).env.REACT_APP_REACT_APP_OPENWEATHER_API_KEY ??
    (import.meta as any).env.REACT_APP_OPENWEATHER_API_KEY;

  const NEWS =
    (import.meta as any).env.VITE_REACT_APP_NEWS_API_KEY ??
    (import.meta as any).env.VITE_NEWS_API_KEY ??
    (import.meta as any).env.REACT_APP_REACT_APP_NEWS_API_KEY ??
    (import.meta as any).env.REACT_APP_NEWS_API_KEY;

  if (!OW) {
    console.warn(
      'Missing OpenWeatherMap API key. Set VITE_OPENWEATHER_API_KEY in your environment variables.'
    );
  }
  if (!NEWS) {
    console.warn(
      'Missing NewsAPI key. Set VITE_NEWS_API_KEY in your environment variables.'
    );
  }

  return {
    OPENWEATHER_API_KEY: OW || '',
    NEWS_API_KEY: NEWS || ''
  };
}
