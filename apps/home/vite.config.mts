import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  root: import.meta.dirname,
  base: './',
  cacheDir: '../../node_modules/.vite/home',
  plugins: [react()],
  server: { host: 'localhost', port: 4200 },
  build: { outDir: '../../dist/apps/home', emptyOutDir: true },
  test: {
    name: 'home',
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    include: ['src/**/*.spec.tsx'],
    watch: false,
  },
});
