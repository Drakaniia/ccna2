// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages project site — repo is Drakaniia/ccna2, so the site is served
  // from https://Drakaniia.github.io/ccna2/ (site root + repo-name base path).
  site: 'https://Drakaniia.github.io',
  base: '/ccna2',
  integrations: [react()],
});
