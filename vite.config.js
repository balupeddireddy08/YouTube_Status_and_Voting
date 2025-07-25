import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Remove the base path to allow relative URLs to work
  plugins: [react()],
})
