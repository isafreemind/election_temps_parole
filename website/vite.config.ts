import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/election-temps-parole/',
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  }
})
