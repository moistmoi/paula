import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [svelte()],
  define: {
    'process.env': {
      VITE_API_KEY: JSON.stringify(process.env.VITE_API_KEY),
      VITE_OPENAI_API_KEY: JSON.stringify(process.env.VITE_OPENAI_API_KEY),
    },
  },
});