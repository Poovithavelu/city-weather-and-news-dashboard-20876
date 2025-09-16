# Weather & News Frontend

This is a Vite + React + TypeScript app styled with TailwindCSS.

## Scripts

- `npm run dev` - start dev server
- `npm run build` - build for production
- `npm run preview` - preview production build

## Environment variables

The orchestrator will provide an `.env` file. Vite exposes variables prefixed with `VITE_`. Given the request details, the environment has keys:

- REACT_APP_REACT_APP_OPENWEATHER_API_KEY
- REACT_APP_REACT_APP_NEWS_API_KEY

To ensure compatibility in Vite, the code also checks for:

- VITE_REACT_APP_OPENWEATHER_API_KEY or VITE_OPENWEATHER_API_KEY
- VITE_REACT_APP_NEWS_API_KEY or VITE_NEWS_API_KEY

If you manage `.env` locally, prefer:

```
VITE_OPENWEATHER_API_KEY=your_key
VITE_NEWS_API_KEY=your_key
```

No secrets are hard-coded in code.

## Notes

- TailwindCSS is configured via `tailwind.config.js` and `postcss.config.js`.
- The UI follows a modern, card-based layout with a light theme per the project style guide.
