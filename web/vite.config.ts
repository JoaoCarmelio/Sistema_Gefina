

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // ou o plugin do framework que estiver a utilizar

export default defineConfig({
  plugins: [react()],
});

defineConfig({ plugins: [ react() ]})
