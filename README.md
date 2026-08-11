# Extranjería con Paola — sitio web

Web estática (Astro + Tailwind v4 + shadcn/ui) de asesoría de extranjería online
para latinos en España, con contacto directo por WhatsApp.

## ✏️ Antes de publicar: cambia los placeholders

1. **`src/config.ts`** — el único archivo con los datos de contacto:
   nombre, marca, **número de WhatsApp**, teléfono visible, email y URL del sitio.
2. **`astro.config.mjs`** — el campo `site` debe ser el dominio definitivo
   (igual que `SITE.url` en `config.ts`).
3. **`public/robots.txt`** — actualiza la URL del sitemap con el dominio definitivo.
4. **`src/pages/aviso-legal.astro` y `src/pages/privacidad.astro`** — completa
   NIF y dirección donde pone `[PENDIENTE]`.
5. Opcional: sustituye el bloque con la inicial en la sección "Quién te acompaña"
   (`src/pages/index.astro`) por una foto real, y añade una imagen Open Graph
   (`og:image`) de 1200×630 cuando haya branding definitivo.

## Comandos

| Comando           | Acción                                     |
| ----------------- | ------------------------------------------ |
| `npm install`     | Instala dependencias                       |
| `npm run dev`     | Servidor de desarrollo en `localhost:4321` |
| `npm run build`   | Genera el sitio estático en `./dist/`      |
| `npm run preview` | Previsualiza el build                      |

## Publicar en Vercel

El sitio es 100% estático (no necesita adapter). En [vercel.com](https://vercel.com):
importa el repositorio → framework "Astro" → deploy. Después, apunta el dominio
y actualiza `site`/`SITE.url`/`robots.txt`.

## Estructura

- `src/config.ts` — datos del sitio y lista de servicios (menú, tarjetas, footer).
- `src/layouts/BaseLayout.astro` — SEO base: metas, canonical, Open Graph, JSON-LD.
- `src/layouts/ServiceLayout.astro` — plantilla de página de servicio (breadcrumb,
  FAQ con schema, servicios relacionados, CTA).
- `src/pages/servicios/*.astro` — una página por trámite (SEO por palabra clave).
- `src/components/` — Header, Footer, botones de WhatsApp, FAQ, tarjetas.
- Sitemap automático (`@astrojs/sitemap`) en `/sitemap-index.xml`.
