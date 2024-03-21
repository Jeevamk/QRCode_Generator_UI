import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['axios', 'react', 'react-dom', 'react-qr-code', 'react-router-dom']
    }
  }
})
