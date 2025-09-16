import { create } from 'zustand';
import axios from 'axios';
import { getEnv } from './lib/env';

export type WeatherData = {
  name: string;
  tempC: number;
  condition: string;
  icon: string;
};

export type NewsItem = {
  title: string;
  url: string;
  source?: string;
};

type State = {
  city: string;
  loading: boolean;
  error?: string;
  weather?: WeatherData;
  news: NewsItem[];
  setCity: (c: string) => void;
  search: (c?: string) => Promise<void>;
};

interface OpenWeatherResponse {
  name: string;
  main: {
    temp: number;
  };
  weather?: Array<{
    main: string;
    icon: string;
  }>;
}

interface NewsAPIResponse {
  articles?: Array<{
    title: string;
    url: string;
    source?: {
      name: string;
    };
  }>;
}

// PUBLIC_INTERFACE
/**
 * App state store: manages city input, loading, error, weather and news.
 */
export const useAppStore = create<State>((set, get) => ({
  city: localStorage.getItem('last_city') || '',
  loading: false,
  error: undefined,
  weather: undefined,
  news: [],
  setCity: (c: string) => set({ city: c }),
  search: async (c?: string) => {
    const city = (c ?? get().city).trim();
    if (!city) {
      set({ error: 'Please enter a city name.' });
      return;
    }
    set({ loading: true, error: undefined });
    try {
      const { OPENWEATHER_API_KEY, NEWS_API_KEY } = getEnv();
      
      if (!OPENWEATHER_API_KEY || !NEWS_API_KEY) {
        throw new Error(
          'API keys not configured. Please set VITE_OPENWEATHER_API_KEY and VITE_NEWS_API_KEY in your environment.'
        );
      }

      const weatherReq = axios.get<OpenWeatherResponse>(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${OPENWEATHER_API_KEY}&units=metric`
      );

      const newsReq = axios.get<NewsAPIResponse>(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(
          city
        )}&language=en&pageSize=5&apiKey=${NEWS_API_KEY}&sortBy=publishedAt`
      );

      const [w, n] = await Promise.all([weatherReq, newsReq]);

      const wData = w.data;
      const weather: WeatherData = {
        name: wData.name,
        tempC: Math.round(wData.main.temp),
        condition: wData.weather?.[0]?.main ?? 'N/A',
        icon: wData.weather?.[0]?.icon ?? ''
      };

      const news: NewsItem[] =
        n.data.articles?.map(a => ({
          title: a.title,
          url: a.url,
          source: a.source?.name
        })) ?? [];

      localStorage.setItem('last_city', city);
      set({ weather, news, loading: false, city });
    } catch (error: unknown) {
      console.error(error);
      const err = error as Error & {
        response?: {
          data?: {
            message?: string;
          };
        };
      };
      set({
        loading: false,
        error:
          err?.response?.data?.message ||
          'Failed to fetch data. Please try again later.'
      });
    }
  }
}));
