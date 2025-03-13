import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
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
      },
      // Proxy static thumbnail requests to backend
      "/storage/thumbnails": {
        target: "http://localhost:5000",
        changeOrigin: true
      },
    },
    allowedHosts:['5f98-2400-1a00-bd11-3ffd-8acb-71d0-a33c-5d3c.ngrok-free.app']
  }
})
