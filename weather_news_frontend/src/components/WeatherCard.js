import React from 'react';

/**
 * WeatherCard displays current weather information in a card style.
 * Props:
 * - data: {
 *    name, sys: { country }, weather: [{ main, description, icon }],
 *    main: { temp, feels_like, humidity },
 *    wind: { speed }
 * }
 */
const WeatherCard = ({ data }) => {
  if (!data) return null;

  const city = data?.name;
  const country = data?.sys?.country;
  const icon = data?.weather?.[0]?.icon;
  const condition = data?.weather?.[0]?.main;
  const description = data?.weather?.[0]?.description;
  const temp = Math.round(data?.main?.temp);
  const feels = Math.round(data?.main?.feels_like);
  const humidity = data?.main?.humidity;
  const wind = Math.round(data?.wind?.speed);

  return (
    <div className="card weather-grid" role="region" aria-label="Weather">
      <div>
        <div className="weather-header">
          <div className="weather-icon" aria-hidden="true">
            {icon ? (
              <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={condition || 'Weather icon'}
                width="56"
                height="56"
                style={{ display: 'block' }}
              />
            ) : (
              <span>⛅</span>
            )}
          </div>
          <div>
            <div className="title">{city}{country ? `, ${country}` : ''}</div>
            <div className="subtitle" title={description || ''}>
              {condition || '—'}{description ? ` · ${description}` : ''}
            </div>
          </div>
        </div>
        <div className="weather-temp" style={{ marginTop: 8 }}>
          {Number.isFinite(temp) ? `${temp}°C` : '—'}
        </div>
      </div>

      <div className="weather-meta">
        <div className="meta-item">
          <div className="news-meta">Feels like</div>
          <div className="news-title">{Number.isFinite(feels) ? `${feels}°C` : '—'}</div>
        </div>
        <div className="meta-item">
          <div className="news-meta">Humidity</div>
          <div className="news-title">{Number.isFinite(humidity) ? `${humidity}%` : '—'}</div>
        </div>
        <div className="meta-item">
          <div className="news-meta">Wind</div>
          <div className="news-title">{Number.isFinite(wind) ? `${wind} m/s` : '—'}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
