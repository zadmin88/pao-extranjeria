// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Dominio definitivo (con www, el primario del hosting). Debe coincidir con
  // SITE.url en src/config.ts — sitemap y canonicals dependen de esto.
  site: 'https://www.tramitesconpaola.es',
  trailingSlash: 'always',

  integrations: [
    react(),
    sitemap({
      // Las páginas noindex no deben aparecer en el sitemap
      filter: (page) => !page.includes('/aviso-legal/') && !page.includes('/privacidad/'),
    }),
  ],

  vite: {
    plugins: [tailwindcss()]
  }
});
