import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    proxy: {
      '/api': {
        target: 'https://galaxo-backend.onrender.com',
        changeOrigin: true,
        secure: false, // if using self-signed certs locally, but for render https it should be fine
      },
    },
  },
})
