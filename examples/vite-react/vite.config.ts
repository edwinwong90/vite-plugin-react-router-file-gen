import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRouterGen from 'vite-plugin-react-router-file-gen'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), reactRouterGen()],
})
