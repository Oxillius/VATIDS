import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://localhost:5000'
    }
  },
  plugins: [react()],
})