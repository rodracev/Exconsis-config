import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      // Proxy para API 1
      '/api1': {
        target: 'http://localhost:5247/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api1/, ''),
      },
      // Proxy para API 2
      '/api2': {
        target: 'https://api2.example.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api2/, ''),
      },
    },
  },
});