// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import pagefind from 'astro-pagefind';

export default defineConfig({
  site: 'https://arunav-bhattacharya.github.io',
  base: '/ai-engineering-notes',
  integrations: [mdx(), preact(), pagefind()],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
});
