# Guía del proyecto — Extranjería con Paola

Web estática de asesoría de extranjería para latinos en España. Objetivo del
sitio: que la gente lo encuentre en Google y contacte por WhatsApp. Todo el
contenido está en **español**.

## Comandos

```
npm run dev          # servidor local en http://localhost:4321
npm run build        # genera el sitio en ./dist
npm run preview      # previsualiza el build
```

Para el servidor en segundo plano: `astro dev --background` (gestión con
`astro dev stop` / `status` / `logs`).

## Dónde está cada cosa

| Qué                                    | Dónde                             |
| -------------------------------------- | --------------------------------- |
| Datos de contacto, WhatsApp, servicios | `src/config.ts` (ÚNICA fuente)    |
| Colores, fuentes, tokens del tema      | `src/styles/global.css`           |
| SEO base (metas, canonical, JSON-LD)   | `src/layouts/BaseLayout.astro`    |
| Plantilla de página de servicio        | `src/layouts/ServiceLayout.astro` |
| Páginas                                | `src/pages/` (una ruta = un file) |
| Componentes propios                    | `src/components/`                 |
| Componentes shadcn/ui                  | `src/components/ui/`              |

## Reglas del proyecto (importantes — no las rompas sin avisar)

### Contenido y ortografía

- La palabra es **extranjería**, con **j** (RAE y organismos oficiales). Nunca
  "extrangería". Esto afecta al SEO: la gente busca "extranjería".
- Tono de los textos: cercano, claro, en "tú". Sin lenguaje jurídico frío y sin
  prometer resultados ("te acompaño", no "garantizamos tu residencia").
- Datos personales (nombre, teléfono, email, dominio) SOLO en `src/config.ts`.
  Nunca escribas un número de teléfono o nombre directamente en una página.

### Diseño

- Usa siempre los tokens del tema: `bg-primary`, `text-muted-foreground`,
  `bg-wa`, `text-saffron-deep`, etc. Nunca colores sueltos (`bg-blue-500`).
- El **verde está reservado para acciones de WhatsApp** (`--wa`). No lo uses
  para otra cosa; así el usuario aprende que verde = contactar.
- Paleta: azul tinta (oficial/confianza) + papel cálido + azafrán (acentos).
  Fuentes: Bricolage Grotesque (títulos, `font-heading`) y Source Sans 3
  (cuerpo). Están autoalojadas; no añadas Google Fonts por CDN.
- Para botones de WhatsApp usa `src/components/WhatsAppButton.astro` (acepta
  `message`, `label`, `size`). No crees enlaces `wa.me` a mano.
- shadcn/ui está configurado (preset base-nova, Base UI). Para añadir
  componentes: `npx shadcn@latest add <componente>`. Los ya instalados están en
  `src/components/ui/`. Si hay una skill de shadcn disponible, úsala.

### Rendimiento (regla de oro: cero JavaScript)

- El sitio se envía **sin JavaScript** al navegador. No añadas islands de React
  (`client:load`, `client:visible`…) salvo necesidad real e imprescindible;
  para interactividad simple usa CSS o `<details>` (así funciona el menú móvil
  en `Header.astro`). Los `.tsx` de shadcn pueden usarse renderizados en
  servidor (sin directiva `client:`) — eso no envía JS.
- Imágenes: usa `astro:assets` (`<Image>`) con `alt` siempre.

### SEO (no tocar sin entender)

- Cada página pasa `title` (≤ ~65 caracteres, keyword al principio) y
  `description` únicos a `BaseLayout`. No dupliques títulos entre páginas.
- Un solo `<h1>` por página; jerarquía h1 → h2 → h3 sin saltos.
- No elimines: canonical, sitemap, robots.txt, JSON-LD, ni el atributo
  `lang="es"`.
- Las URLs llevan barra final (`trailingSlash: 'always'`). Los enlaces internos
  también: `/servicios/arraigo/`.
- Páginas que no deben indexarse: pasa `noindex` a `BaseLayout` **y** exclúyelas
  del sitemap en `astro.config.mjs`.

## Recetas frecuentes

**Añadir un servicio nuevo**: 1) añade la entrada en `SERVICES` de
`src/config.ts` (slug, título, short, mensaje de WhatsApp); 2) crea
`src/pages/servicios/<slug>.astro` copiando la estructura de
`arraigo.astro` (usa `ServiceLayout` con `seoTitle`, `seoDescription`,
`heroIntro`, `faqs` y secciones h2/ul). El menú, footer, tarjetas de la home y
"otros trámites" se actualizan solos porque leen de `SERVICES`.

**Cambiar textos de la home**: `src/pages/index.astro` (hero, pasos, FAQ).

**Cambiar colores/fuentes**: solo en `src/styles/global.css` (variables en
`:root` y `.dark`). Comprueba contraste AA en textos.

**Antes de dar por terminado un cambio**: `npm run build` debe pasar sin
errores y conviene mirar la página afectada con `npm run dev`.

## Pendientes conocidos

- `src/config.ts`, `site` en `astro.config.mjs` y `public/robots.txt` llevan
  datos PLACEHOLDER (nombre, WhatsApp, dominio) hasta tener los reales.
- Falta og:image (1200×630) y foto real en "Quién te acompaña".
- NIF y dirección en `/aviso-legal/` y `/privacidad/` están como [PENDIENTE].

## Documentación

- Astro: https://docs.astro.build (rutas, componentes, estilos, imágenes)
- shadcn/ui: https://ui.shadcn.com/docs
