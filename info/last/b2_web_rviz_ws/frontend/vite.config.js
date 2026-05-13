import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Production bundle is served under http://<gateway>:8080/app/ (FastAPI StaticFiles)
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/app/' : '/',
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
}));
