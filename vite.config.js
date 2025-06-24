import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    target: 'es2022'
  },
  esbuild: {
    target: 'es2022'
  },
  optimizeDeps: {
    include: ['three']
  }
})