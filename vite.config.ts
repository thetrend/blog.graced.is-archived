import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~COMPONENTS': path.resolve(__dirname, './src/components'),
      '~UTILS': path.resolve(__dirname, './src/utils'),
      '~SRC': path.resolve(__dirname, './src'),
      '~NETLIFY': path.resolve(__dirname, './functions'),
    }
  },
  build: {
    rollupOptions: {
      external: [
        '~NETLIFY/auth/types', path.resolve(__dirname, './functions/auth/types')
      ]
    }
  }
});
