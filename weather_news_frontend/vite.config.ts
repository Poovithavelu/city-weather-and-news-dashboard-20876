import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// PUBLIC_INTERFACE
/**
 * Vite configuration for the Weather & News Frontend.
 * Ensures the dev server binds to 0.0.0.0:3000 so it is reachable from outside the container.
 * Also allows orchestrator host access via server.allowedHosts.
 */
export default defineConfig({
  plugins: [react()],
  server: {
    // Force the dev server to listen on 0.0.0.0:3000 for containerized environments
    host: '0.0.0.0',
    port: 3000,
    strictPort: true
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true
  }
});
