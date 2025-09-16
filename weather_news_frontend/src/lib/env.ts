type Env = {
  OPENWEATHER_API_KEY?: string;
  NEWS_API_KEY?: string;
};

// PUBLIC_INTERFACE
/**
 * Returns environment variables for the app.
 * Note: Vite exposes only variables starting with VITE_ via import.meta.env.
 * The orchestrator provides REACT_APP_REACT_APP_* variables; we also attempt to
 * resolve those via build-time process.env fallbacks for robustness.
 */
export function getEnv(): Required<Env> {
  // Prefer VITE_* (standard for Vite)
  const owVite =
    import.meta.env.VITE_REACT_APP_OPENWEATHER_API_KEY ??
    import.meta.env.VITE_OPENWEATHER_API_KEY;

  const newsVite =
    import.meta.env.VITE_REACT_APP_NEWS_API_KEY ??
    import.meta.env.VITE_NEWS_API_KEY;

  // Fallbacks for environments that provide REACT_APP_* style names.
  // In Vite, process.env.* can be statically replaced at build time when defined.
  // These are safe fallbacks that do not leak secrets to code; they only resolve
  // to actual strings if present in the build environment.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pe = (typeof process !== 'undefined' ? (process.env as any) : {}) || {};
  const owReact =
    pe.REACT_APP_REACT_APP_OPENWEATHER_API_KEY ?? pe.REACT_APP_OPENWEATHER_API_KEY;
  const newsReact =
    pe.REACT_APP_REACT_APP_NEWS_API_KEY ?? pe.REACT_APP_NEWS_API_KEY;

  const OW = owVite ?? owReact;
  const NEWS = newsVite ?? newsReact;

  if (!OW) {
    console.warn(
      'Missing OpenWeatherMap API key. Set VITE_OPENWEATHER_API_KEY (preferred) or ensure REACT_APP_REACT_APP_OPENWEATHER_API_KEY is provided by the orchestrator.'
    );
  }
  if (!NEWS) {
    console.warn(
      'Missing NewsAPI key. Set VITE_NEWS_API_KEY (preferred) or ensure REACT_APP_REACT_APP_NEWS_API_KEY is provided by the orchestrator.'
    );
  }

  return {
    OPENWEATHER_API_KEY: OW || '',
    NEWS_API_KEY: NEWS || ''
  };
}
