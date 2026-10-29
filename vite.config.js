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
      // v1 app at /, chat lofi at /lofi.html
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        lofi: path.resolve(import.meta.dirname, 'lofi.html'),
      },
    },
  },
})
