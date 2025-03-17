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
    allowedHosts:['a97a-27-34-68-160.ngrok-free.app']
  }
})
