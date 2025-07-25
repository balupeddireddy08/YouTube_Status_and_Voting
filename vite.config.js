import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // Set the base path to match the GitHub Pages repository name
  base: '/YouTube_Status_and_Voting/',
  plugins: [react()],
})
