import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Production bundle served under /app/ by FastAPI StaticFiles
// Dev: Vite :5173 proxies API/WS to gateway :8080
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/app/' : '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': { target: 'http://localhost:8080', changeOrigin: true },
      '/ws': { target: 'ws://localhost:8080', ws: true, changeOrigin: true },
    },
  },
}));
