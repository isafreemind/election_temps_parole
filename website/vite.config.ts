import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/election_temps_parole/',
  build: {
    outDir: '../docs',
    emptyOutDir: true,
  }
})
