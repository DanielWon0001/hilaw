import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
  output: 'static',
  build: {
    assets: 'assets',
  },
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});