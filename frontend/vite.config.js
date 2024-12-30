import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy API requests to backend
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true
      },
      // Proxy static image requests to backend
      "/storage/images": {
        target: "http://localhost:5000",
        changeOrigin: true
      }
    }
  }
});
