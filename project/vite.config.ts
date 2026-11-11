import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// The app builds to dist-next until the owner approves launch; dist holds the live test page.
export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
  build: { outDir: 'dist-next', emptyOutDir: true },
  test: { include: ['src/**/*.test.{ts,tsx}'] },
});
