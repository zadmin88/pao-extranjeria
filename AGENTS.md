# Agents guide

Lee y sigue **CLAUDE.md** en la raíz del proyecto: contiene la guía completa
(estructura, reglas de diseño y SEO, comandos y recetas). Resumen mínimo:

- Contenido en español; la palabra correcta es **extranjería** (con j).
- Datos de contacto solo en `src/config.ts`; botones de WhatsApp con
  `src/components/WhatsAppButton.astro`.
- Colores por tokens del tema (`bg-primary`, `bg-wa`…), nunca colores sueltos.
- Cero JavaScript en el navegador: nada de `client:*` salvo necesidad real.
- SEO: title/description únicos por página, un solo h1, no tocar canonical,
  sitemap ni JSON-LD.
- Verificación: `npm run build` sin errores antes de terminar.
