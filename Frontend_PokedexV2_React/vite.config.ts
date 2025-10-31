import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': new URL('./src', import.meta.url).pathname,
      '@assets': new URL('./src/assets', import.meta.url).pathname,
      '@components': new URL('./src/components', import.meta.url).pathname,
      '@context': new URL('./src/contexts', import.meta.url).pathname,
      '@data': new URL('./src/data', import.meta.url).pathname,
      '@hooks': new URL('./src/hooks', import.meta.url).pathname,
      '@models': new URL('./src/models', import.meta.url).pathname,
      '@pages': new URL('./src/pages', import.meta.url).pathname,
      '@routes': new URL('./src/routes', import.meta.url).pathname,
      '@services': new URL('./src/services', import.meta.url).pathname,
      '@styles': new URL('./src/styles', import.meta.url).pathname,
      '@types': new URL('./src/types', import.meta.url).pathname,
      '@utils': new URL('./src/utils', import.meta.url).pathname,
    },
  },
});


/*Alternativa:
*
* import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@context": path.resolve(__dirname, "src/contexts"),
      "@data": path.resolve(__dirname, "src/data"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@models": path.resolve(__dirname, "src/models"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@services": path.resolve(__dirname, "src/services"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@types": path.resolve(__dirname, "src/types"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
*
* */