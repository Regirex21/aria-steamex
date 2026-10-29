// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { localePairs } from './src/config/routes.ts';

const SITE = 'https://www.aria-steamex.com';

// URL canonica sin slash final (excepto la raiz), igual que <link rel="canonical">
const clean = (url) => {
  const u = new URL(url);
  if (u.pathname.length > 1) u.pathname = u.pathname.replace(/\/$/, '');
  return u.href;
};

// Mapa ruta -> { es, en } a partir de src/config/routes.ts
const pairByPath = new Map();
for (const [es, en] of localePairs) {
  pairByPath.set(es, { es, en });
  pairByPath.set(en, { es, en });
}

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [
    sitemap({
      // Fuera del sitemap: tienda (en construccion) y paginas de prueba
      filter: (page) => !/\/(tienda|404|test|prueba|demo|_design)(\/|$)/.test(new URL(page).pathname),
      // hreflang en el sitemap con los pares ES/EN de routes.ts
      // (la opcion i18n de la integracion no sirve aqui: ACRIS vive bajo /acris/en
      // y las rutas ES/EN no comparten el mismo slug)
      serialize(item) {
        const url = clean(item.url);
        const path = new URL(url).pathname;
        const pair = pairByPath.get(path);
        return {
          ...item,
          url,
          ...(pair && {
            links: [
              { url: new URL(pair.es, SITE).href, lang: 'es' },
              { url: new URL(pair.en, SITE).href, lang: 'en' },
              { url: new URL(pair.es, SITE).href, lang: 'x-default' },
            ],
          }),
        };
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});
