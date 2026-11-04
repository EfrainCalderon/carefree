import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, 'src') },
  },
  build: {
    rollupOptions: {
      // Chat app at /, original v1 app at /v1.html
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        v1: path.resolve(import.meta.dirname, 'v1.html'),
      },
    },
  },
})
