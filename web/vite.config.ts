import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), 
    tailwindcss()],
    
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test.setup.ts'],
  },
});
function tailwindcss(): import("vite").PluginOption {
  throw new Error('Function not implemented.');
}

