import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// The app is published from dist to GitHub Pages at /sameerwedshania/.
export default defineConfig({
  base: '/sameerwedshania/',
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: { outDir: 'dist', emptyOutDir: true },
  test: { include: ['src/**/*.test.{ts,tsx}'] },
});
