# Weather & News Frontend

This is a Vite + React + TypeScript app styled with TailwindCSS.

## Requirements

- Node.js >= 20.19 (or >= 22.12). Vite 7 requires a modern Node LTS. Older Node versions will fail to start the dev server.
- This project uses ESM ("type": "module") in package.json.
- The Node.js version is enforced via the `engines` field in `package.json`:
  - `"engines": { "node": ">=20.19.0" }`
  Ensure your environment (local or container) uses Node 20.19+ or 22+.

If you are containerizing this app and use a Dockerfile, choose a base image like:
- `node:20.19-bullseye` or `node:22-bullseye` (or `-alpine` variants as appropriate)

## Scripts

- `npm start` - start dev server (Vite, binds to 0.0.0.0:3000)
- `npm run dev` - start dev server (alias, binds to 0.0.0.0:3000)
- `npm run build` - build for production
- `npm run preview` - preview production build (binds to 0.0.0.0:3000)

Dev server is configured to listen on 0.0.0.0:3000 (see `vite.config.ts`), ensuring it is reachable from outside the container.

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
- If you see a Node version error on start, upgrade Node to the required version and retry.

## Dependency installation note (CI)

In CI environments where Node < 20.19 is present (e.g., Node 18), you may see engine warnings during `npm install`. The dependencies can still be installed for lockfile resolution using:

```
npm install --no-audit --no-fund --legacy-peer-deps --engine-strict=false
```

However, to run and develop reliably (Vite 7 + React 19), upgrade the runtime to Node >= 20.19 (or >= 22.12) and re-run a plain `npm install` to avoid engine warnings.
