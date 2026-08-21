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
| Páginas                                | `src/pages/` (una ruta = un file) |
| Componentes propios                    | `src/components/`                 |
| Componentes shadcn/ui                  | `src/components/ui/`              |
| Logos (`PO_Logo_1/2/3.svg`)            | `public/` — ver nota abajo         |

## Reglas del proyecto (importantes — no las rompas sin avisar)

### Contenido y ortografía

- La palabra es **extranjería**, con **j** (RAE y organismos oficiales). Nunca
  "extrangería". Esto afecta al SEO: la gente busca "extranjería".
- Tono de los textos: cercano, claro, en "tú". Sin lenguaje jurídico frío y sin
  prometer resultados ("te acompaño", no "garantizamos tu residencia").
- Datos personales (nombre, teléfono, email, dominio) SOLO en `src/config.ts`.
  Nunca escribas un número de teléfono o nombre directamente en una página.

### Diseño

- **Fuente de verdad de marca**: `public/Manual_de_Marca_Paola_Ocampo.docx`
  (esencia de marca, logotipo, paleta con proporciones de uso, tipografía,
  tono de voz). Ante cualquier duda de diseño, se resuelve por el manual, no
  por gusto propio. Es un `.docx`; para leerlo desde código: descomprimirlo
  como zip y extraer `word/document.xml` (es un XML con el texto plano).
- **Dirección de arte: editorial, bold, con mucho aire** — referencia de
  composición y tipografía a gran escala: invade.design (estudio de Medellín).
  De ahí se toma el manejo de tipografía grande, el uso de negativo y el
  tratamiento editorial por secciones — **no** su paleta (ellos usan
  negro/blanco; Paola usa su propia paleta de marca, ver abajo). Grid de 12
  columnas con composiciones asimétricas (`lg:col-span-N lg:col-start-M`),
  contenedor ancho `max-w-[100rem]` con márgenes grandes
  (`px-6 sm:px-10 lg:px-16`). Evita: iconos decorativos genéricos (balanzas,
  maletines...), gradientes, exceso de botones, sombras duras.
- **Paleta oficial — solo 3 colores** (Manual de Marca, sección 04; los HEX
  ya están verificados como conversión exacta a los tokens oklch de abajo):
  - Morado eggplant `#391A3F` (`--ink` / `bg-primary`) — primario, ~60% del
    uso. La sección 04 lista "fondos, titulares, texto principal", pero la
    sección 07 (Aplicaciones) es más específica para este entregable exacto
    y dice que la web va en **fondo blanco** — así que en la práctica el
    60% de eggplant se cumple vía titulares/texto/acentos puntuales
    (ver regla "Fondo de página: blanco, no eggplant" más abajo), no
    pintando secciones enteras.
  - Lavanda `#C4B3E5` (`--lavender`) — acento, ~10%: iconos, detalles,
    llamados de atención puntuales. Para texto/enlaces sobre blanco (donde la
    lavanda clara no da contraste AA) usa `--lavender-deep`, una variante más
    saturada pensada solo para texto.
  - Blanco puro (`--paper` / `bg-background`) — base, ~30% según la sección
    04, pero en la práctica es el fondo dominante del sitio por la regla de
    la sección 07 explicada arriba.
  - No introduzcas colores fuera de esta paleta (nada de azafrán, crema,
    negro puro, etc. — si en algún momento ves esos tokens en el código es
    que quedaron de una iteración anterior y hay que quitarlos).
  - **El botón flotante (`WhatsAppFloat.astro`) siempre en verde de
    WhatsApp**: pasó brevemente a lavanda de marca (`bg-lavender`, ícono
    `text-primary`) a pedido del cliente, pero se revirtió — el cliente
    pidió que el ícono que "está por fuera" (la burbuja fija que sigue el
    scroll) sea siempre verde, en el tono de WhatsApp (`bg-wa`/`bg-wa-deep`
    en hover, icono blanco), igual que el resto de botones de WhatsApp
    (`WhatsAppButton.astro` con `tone="wa"`). No reintroduzcas el lavanda
    en este componente sin que el cliente lo pida explícitamente de nuevo.
- **Jerarquía tipográfica**: sin texto en mayúscula en ningún sitio del sitio
  (decisión posterior al manual — desvía de la sección 05, que sí pedía H1 y
  eyebrows en mayúsculas). Todos los títulos (H1, H2, H3, FAQ y elementos con
  tratamiento de título como el wordmark o los títulos de las cards) usan
  `font-medium` (500) — no `font-semibold`/`font-bold`/`font-extrabold`/
  `font-black` — para igualar el grosor de zenda.com, que usa el mismo peso
  500 en sus títulos. Los párrafos van en peso regular (400), sin negrita.
  H1 en color eggplant; H2 eggplant o negro; cuerpo en `--muted-foreground`
  (gris oscuro neutro); eyebrows/captions con tracking amplio en
  `--lavender-deep`. `font-semibold` queda para controles de UI (botones,
  nav, CTAs), no para texto de título; `font-black` queda solo para
  elementos no textuales, como el número dentro del círculo de "Proceso".
- **Títulos de sección, mismo tamaño de H2, pero ya no todos llevan
  eyebrow**: el patrón original (eyebrow corto + H2) se probó en todas las
  secciones siguiendo `section-header__label` + `section-header__heading`
  de allinnhomeofstudents.com, pero el cliente pidió quitar los eyebrows de
  "Trámites" ("Servicios"), "Preguntas frecuentes" ("Ayuda") y del CTA final
  (`{SITE.name} — Trámites de extranjería` y `¿Hablamos?`) por ser
  redundantes con el H2 de al lado. Hoy solo conservan eyebrow "Proceso" (en
  Proceso) y "Sobre Paola" (en Sobre Paola); el resto de secciones van
  directas al `<h2>`. En todas partes donde hay H2 (con o sin eyebrow) se
  mantiene **el mismo tamaño**: `font-heading leading-[1.05] font-medium` +
  `style="font-size: clamp(1.85rem, 4.5vw, 3.25rem);"`. No le des a una
  sección un H2 más grande o con tratamiento distinto que a las demás, ni le
  agregues un eyebrow de vuelta, sin que el cliente lo pida explícitamente.
  **Excepción vigente**: el H1 del hero y el H2 de "Sobre Paola" comparten un
  tratamiento más grande/protagonista (`clamp(2.25rem, 6vw, 4.5rem)` en
  "Sobre Paola"; el hero usa su propio clamp) — el cliente lo pidió
  explícitamente comparando con el estilo de un titular de orthofx.com, pero
  **sin mezclar tipografía serif/cursiva** (eso sí se probó una vez y se
  revirtió) — ambos van en `font-heading` normal, mismo peso `font-medium`
  que el resto. El hero va alineado a la izquierda; "Sobre Paola" sigue
  centrado.
- **Fondo de página: blanco, no eggplant** — el manual de marca
  (sección 07, "Aplicaciones") dice explícitamente para "Landing page y
  sitio web": *"fondo blanco, acentos en morado y lavanda, tipografía bold
  en titulares"*. Se probó pintar "Sobre Paola" y "Preguntas frecuentes" de
  eggplant sólido y se revirtió por esto — el eggplant es para **texto,
  títulos y acentos** (60% de uso según la sección 04, pero interpretado
  como texto/detalle, no como fondo de página completo), no para fondos de
  sección grandes. Las únicas superficies eggplant del sitio son el footer
  (franja de cierre, patrón ya establecido desde el inicio del proyecto) y
  bloques puntuales como la card llena de "Trámites" o el círculo del
  número en "Proceso" — nunca una sección entera de contenido de lectura.
  Antes de pintar una sección nueva de `bg-primary`, revisa esta regla.
- **Wordmark bicolor**: cuando "Paola" y "Ocampo" aparecen como lockup grande
  (footer), van en colores distintos según el fondo, tal cual el
  manual: sobre blanco, "Paola" en lavanda y "Ocampo" en eggplant; sobre
  fondo eggplant (footer, secciones `bg-primary`), "Paola" en lavanda y
  "Ocampo" en blanco. No los recolorees igual ni cambies cuál va primero.
- **Hero** (calcado de orthofx.com, adaptado sin gradientes — el manual los
  prohíbe): foto de Paola a sangre (`w-full`, sin el padding del contenedor,
  `id="hero"` para que el header sepa cuándo salió de vista) ocupando casi
  toda la pantalla (`h-[72svh] sm:h-[85svh]`), esquinas inferiores muy
  redondeadas (`rounded-b-[2.5rem]`). Todo el texto (eyebrow, H1, bajada,
  CTA — un solo botón, el de WhatsApp) va superpuesto directamente sobre la
  foto, alineado a la izquierda y anclado arriba — igual que orthofx.com, no
  en un panel aparte. Esto funciona porque `object-[64%_16%]` encuadra la
  foto dejando la zona clara (cortina/pared) a la izquierda, donde va el
  texto; si se cambia la foto o el encuadre, hay que verificar que esa
  esquina siga siendo clara o el texto pierde contraste. Como red de
  seguridad (no gradiente, solo texto) el texto lleva un `text-shadow`
  blanco difuso. El bloque de texto usa el mismo padding estándar de sección
  (`inset-x-6 sm:inset-x-10 lg:inset-x-16` = `px-6 sm:px-10 lg:px-16`) que
  el resto del sitio y que la barra de navegación (ver nota de alineación
  global más abajo), así que el H1 queda alineado con el logo y con el
  resto de títulos de página.
- **Barra en colores de marca** (se probó una versión "barra oscura" tipo
  SaaS — fondo eggplant, logo blanco — inspirada en un sitio de referencia,
  pero el cliente pidió volver a los colores originales): el header sólido
  usa `bg-lavender` — el #C4B3E5 del manual de marca, a secas, sólido. Se
  probaron variantes intermedias antes de llegar acá: `bg-secondary`
  (lavanda casi blanca, un tono aparte no listado en el manual) se perdía
  contra el blanco de la página; un `bg-lavender/NN` transparente dejaba
  pasar contenido de atrás; un `--header-solid` con `color-mix` a medio
  camino tampoco es un color de marca real. El cliente pidió explícitamente
  "un solo color de marca" — por eso `bg-lavender` sin mezclar. Con la
  barra ahora en lavanda sólida (no casi blanca), el pill de "sección
  activa" y los estados hover del nav pasaron de tintes de lavanda
  (`hover:bg-lavender/25`, invisibles sobre lavanda sólida) a tintes de
  blanco (`hover:bg-white/40`; pill activo con
  `color-mix(in oklch, var(--paper) 45%, transparent)` en `global.css`) —
  si tocás esos hovers, que contrasten contra lavanda, no contra blanco. El
  header usa el logo
  `PO_Logo_4.svg` (morado, no la variante blanca — esa quedó sin uso y se
  borró) y texto en `text-foreground`. El header lleva esquinas inferiores
  redondeadas (`rounded-b-2xl` `sm:rounded-b-3xl`), sin `overflow-hidden`
  (para no cortar el desplegable de "Trámites" ni el menú móvil, que
  sobresalen del header). Sin sombra propia ni `filter: drop-shadow` (se
  probaron y se quitaron a pedido del cliente).
- **Alineación global izquierda**: el header usa el mismo padding horizontal
  que el resto del sitio, `px-6 sm:px-10 lg:px-16` (antes tenía
  `px-8 sm:px-12 lg:px-20`, más generoso, "para darle más aire al logo" —
  se revirtió porque el cliente pidió que el logo, el H1 del hero y los H2
  de cada sección quedaran alineados en el mismo borde izquierdo; con
  paddings distintos el logo quedaba visualmente más adentro que el resto
  del contenido). Si algún elemento nuevo necesita separarse del borde,
  hazlo con margen/padding interno de ese elemento, no cambiando el padding
  del contenedor — así se mantiene la alineación en toda la página.
- **Barra integrada al hero**: solo en la home, `<Header transparent />`
  (prop pasado vía `transparentHeader` en `BaseLayout`) arranca `fixed`,
  transparente, con el mismo logo/texto morado de siempre (el hero está
  encuadrado — `object-[64%_10%]` en `index.astro` — para que esa zona de
  la foto sea clara, así que el morado se lee sin necesitar sombra de
  contraste). Pasa a `bg-lavender` apenas se detectan ~8px de scroll
  (listener de `scroll` en `Header.astro`, umbral chico para evitar
  parpadeo por rebote/overscroll) — el cliente pidió explícitamente que el
  cambio sea inmediato, no que espere a que el hero termine de salir de
  pantalla (así era antes, con un `IntersectionObserver` sobre `#hero`; se
  quitó por completo, ya no depende de la geometría del hero). En el resto
  de páginas el header sigue siendo `sticky` y sólido desde el principio,
  sin JS extra para eso.
- **Selección en la barra** (inspirado en orthofx.com): los links del menú
  principal son píldoras (`rounded-full`, no texto suelto con punto debajo)
  — fondo `hover:bg-white/40` en hover y un tinte de blanco
  (`color-mix(in oklch, var(--paper) 45%, transparent)`, en `global.css`)
  en la sección activa (`aria-current=true`), en vez del azul/negro de la
  referencia. Son tintes de BLANCO, no de lavanda — la barra sólida ya es
  `bg-lavender` (ver más arriba), así que un hover/pill en lavanda encima
  no se distinguía; si la barra cambia de color de nuevo, revisar que
  estos hovers sigan contrastando. Todo el texto/íconos del menú (desktop,
  desplegable de "Trámites", menú móvil, botón hamburguesa) usa
  `text-primary` (eggplant), **no** `text-foreground` — ese último token es
  un gris casi negro pensado para cuerpo de texto neutro, no para la marca;
  usarlo en el menú se leía "negro" y fuera de paleta. Si agregás un link
  nuevo al menú, cópiale `text-primary`.
- **Ícono de hamburguesa: dos barras, no tres**: el clásico de tres líneas
  se sintió "muy genérico" — con dos barras (`h-px w-6`, `gap-2`) alcanza
  para leerse como menú y el morph a X al abrir (rotan ±45° y se juntan en
  el centro, `group-open:translate-y-[5px] group-open:rotate-45` y su
  espejo) queda más limpio, sin necesitar desvanecer una tercera línea del
  medio.
- **Agrupación del menú con el CTA**: dentro de `Header.astro`, el `<nav>`
  de escritorio y el bloque de la derecha (botón de WhatsApp + menú móvil)
  van envueltos juntos en un `<div class="flex items-center gap-4 md:gap-6">`
  — así el `justify-between` del contenedor exterior separa **logo** de
  **[nav + CTA]** como dos bloques, en vez de repartir logo/nav/CTA a partes
  iguales a lo ancho de toda la barra (que dejaba el menú lejos del botón de
  WhatsApp). Si agregás algo nuevo a la barra, revisa dentro de qué grupo
  debe ir. Los links del `<nav>` van con `gap-5` (antes `gap-8`, se redujo a
  pedido del cliente por exceso de aire entre los 4 links).
- **Cards**: esquina muy redondeada (`rounded-[2rem]`/`rounded-4xl`, nunca
  `rounded-lg` pequeño). En "Trámites" son un carrusel horizontal de
  tarjetas de ancho fijo, inspiradas en la sección "Booster" de
  allinnhomeofstudents.com: bloque superior tipo foto (`aspect-[16/10]`,
  esquina redondeada propia, inset con `p-3`/`p-4` respecto al borde de la
  card) — como no hay fotos reales de los trámites, ese bloque usa
  `bg-lavender/70` con el icono del servicio adentro, no un color sólido de
  marca ni una foto — y debajo el título + descripción + CTA. La card en sí
  ya **no alterna** (a pedido del cliente, `src/pages/index.astro` usa un
  único `cardStyle` para las 5, en vez del array `cardStyles` con
  alternancia que tenía antes) y su fondo es morado claro (`bg-lavender/15`
  — antes blanca con borde eggplant), más suave que el bloque tipo foto
  interno (`bg-lavender/70`) para que se sigan distinguiendo uno del otro;
  si en algún momento
  hay fotos reales de cada trámite, van en el bloque superior en lugar del
  lavanda. Gap generoso entre cards (`gap-8 sm:gap-10`, se aumentó a pedido
  del cliente porque se veían muy juntas). Scroll nativo (`overflow-x-auto`
  + `scroll-snap`, sin librería de carrusel) y sangrado a los bordes del
  contenedor mediante margen negativo. Debajo del carrusel hay dos flechas
  circulares (prev/next, `data-carousel-prev`/`data-carousel-next`,
  inspiradas en allinnhomeofstudents.com, alineadas a la izquierda del
  carrusel — no a la derecha: ahí vive el botón flotante fijo de WhatsApp,
  `WhatsAppFloat.astro`, y con las flechas a la derecha la de "siguiente"
  quedaba tapada por el botón — parecía que nunca se desactivaba al llegar
  al final del scroll, cuando en realidad sí lo hacía, solo que invisible)
  que llaman a `scrollBy()` sobre el contenedor — es la única pieza de JS
  de esta sección, imprescindible porque no hay forma de mover el scroll
  con un clic solo con CSS; el scroll táctil/trackpad sigue funcionando
  igual sin JS. El contenedor del carrusel lleva `pt-2 sm:pt-3` además del
  `pb-4` original (da aire para la escala de `.carousel-card`, ver abajo,
  y evita que la primera card se vea pegada sin margen).
  **Hover solo en el CTA, no en la card entera**: las cards NO tienen
  `hover:-translate-y-1` (se probó y el cliente lo sacó — quería que solo
  reaccionara el link "Consultar sobre mi arraigo →" al pasar el mouse,
  no toda la tarjeta). El span del CTA lleva
  `group-hover:text-primary` (se oscurece a eggplant) además de la flecha
  que ya trasladaba (`group-hover:translate-x-1`).
  **Animación al hacer scroll con las flechas**: cada card lleva la clase
  `.carousel-card` (`global.css`) con un scroll-driven animation en el eje
  horizontal (`animation-timeline: view(inline)`, mismo mecanismo que
  `.reveal` pero en `inline` en vez de `block`) — opacidad/escala bajan
  levemente en los bordes del carrusel y suben a full en el centro, así
  las cards no se ven estáticas al navegar con las flechas (ni con
  scroll táctil). Cero JS, mismo criterio de degradación que `.reveal`.
  **Alineación horizontal del carrusel — asimétrica a propósito**: el lado
  derecho sangra hasta el borde del contenedor igual que el resto del sitio
  (`-mr-6 ... pr-6`, etc. — mismo valor que el padding estándar de sección,
  para que el scroll llegue hasta el borde). El lado izquierdo lleva **más**
  padding que eso (`pl-10 sm:pl-14 lg:pl-20`, frente al estándar
  `px-6 sm:px-10 lg:px-16`): el cliente pidió que la primera card no
  quedara pegada al borde/al H2 "Trámites", así que ahora la card arranca
  ~1rem a la derecha del borde izquierdo del H2 — **ya no comparten el
  mismo borde** (se probó alinearlos exactamente y también se probó
  indentar el H2 con `pl-5 sm:pl-7` para igualarlo al texto interno de la
  card; ambas cosas se revirtieron). Si cambiás el padding de este
  carrusel, no lo hagas simétrico con `mx-*`/`px-*`: el borde izquierdo y
  el derecho son intencionalmente distintos.
- **Footer**: minimalista a pedido del cliente, aunque el logo volvió a
  pedido posterior (ver abajo) — no lleva la franja de servicios con icono
  + etiqueta que tenía originalmente, ni la descripción, ni la columna de
  contacto (WhatsApp/email), ni un listado separado de los 5 trámites
  (se probó y se quitó por redundante con la sección "Trámites" de la
  home). Hoy el footer es: logo (`PO_Logo_5.svg`, vía `src/assets` con
  `?raw` para inlinearlo y recolorear "Ocampo"/descriptor a blanco sobre el
  fondo eggplant — ver comentario en `Footer.astro`) en `h-20`, sin
  subtítulo "Navegación" arriba (se probó y se sacó a pedido del cliente,
  el label era redundante), + la columna de navegación (Trámites, Sobre
  Paola, Preguntas frecuentes — los mismos 3 enlaces del menú de
  `Header.astro`; si agregás un link al header, agrégalo también aquí, con
  `hover:text-lavender`) + la franja de copyright abajo, alineada a la
  izquierda (`text-left`, antes `text-right`). Los enlaces a
  `/aviso-legal/` y `/privacidad/` no están en el footer; esas páginas
  siguen existiendo y son accesibles por URL directa, solo que no están
  enlazadas desde ningún lado del sitio.
- **Proceso / pasos numerados**: secuencia horizontal (grid de 5 columnas en
  desktop, apila en mobile), inspirada en la sección "location" de
  allinnhomeofstudents.com — cada paso lleva una línea superior
  (`border-t-2 border-lavender`) a modo de conector, con el número grande
  arriba y título + texto debajo. La referencia original es un widget de
  mapa con arrastre horizontal en JS que no aplica a este contenido (no hay
  distancias que mostrar) y rompería la regla de cero JavaScript — se tomó
  solo la idea de secuencia horizontal conectada por una línea, sin mapa ni
  JS. Lleva eyebrow "Proceso" arriba del título, igual que el eyebrow
  "Location" de la referencia.
- **CTAs con jerarquía clara**: la acción principal siempre es la píldora
  verde de WhatsApp (`WhatsAppButton.astro`, nunca enlaces `wa.me` a mano).
  Las acciones secundarias usan un botón outline (`border-2 border-primary`,
  fondo transparente, se rellena de eggplant al hover) — nunca un segundo
  botón verde compitiendo con el de
  WhatsApp.
- Fuentes: **Satoshi Variable** (Fontshare) es el único sans-serif del
  sitio — titulares, navegación, botones, logo (`font-heading`) y
  cuerpo/párrafos/FAQ (`font-sans`, por defecto en `<body>`) usan la misma
  familia; la jerarquía se marca con el peso
  (`font-medium`/`font-semibold`/`font-bold`/`font-extrabold`/`font-black`),
  no con la fuente. Es una fuente variable (eje `wght` 300–900), autoalojada
  como archivo propio en `public/fonts/Satoshi-Variable.woff2` con
  `@font-face` manual en `global.css` (Satoshi no está en Google Fonts ni
  en Fontsource, así que no hay paquete `@fontsource-variable/*` para
  ella). Licencia Fontshare Free License: uso comercial y autoalojado sin
  atribución. **Ojo**: no todas las fuentes "de referencia" que pida un
  cliente son libres — antes de copiar el webfont de un sitio ajeno hay que
  verificar la licencia (ver ejemplo de "Decagram"/Emtype Foundry, que es de
  pago, en el historial de decisiones). No añadas Google Fonts por CDN —
  cargar fuentes desde fonts.googleapis.com envía la IP del visitante a
  Google en cada carga, lo
  cual es un problema de RGPD para un sitio dirigido a España/UE.
- Animaciones: la clase `.reveal` (en `global.css`) hace fade-in + subida al
  entrar en scroll usando `animation-timeline: view()` — **sin JavaScript**.
  Se degrada bien (el contenido se ve igual, sin animar) en navegadores sin
  soporte y respeta `prefers-reduced-motion`. Llevaba blur progresivo
  (`blur(10px)→0`, calcado de day1-run.webflow.io) pero el cliente lo sacó
  por no ir con el resto del sitio y pidió más movimiento en su lugar: hoy
  es un desplazamiento más largo (`translate: 0 4rem`, antes `2.5rem`) +
  una leve escala de entrada (`scale: 0.94→1`), sin blur.
- Logos en `public/`: `PO_Logo_1.svg` (versión principal, morado sobre
  transparente, con el wordmark + descriptor "TRÁMITES DE EXTRANJERÍA"),
  `PO_Logo_2.svg` (blanco con fondo morado propio, placa autocontenida),
  `PO_Logo_3.svg` (isotipo — monograma "P" con punto lavanda y fondo
  eggplant propio, placa autocontenida — sin uso activo ahora mismo),
  `PO_Logo_4.svg`
  (versión horizontal, solo "PAOLA OCAMPO", morado sobre transparente) —
  es el logo de `Header.astro`, visible en desktop y mobile (existió una
  variante blanca, `PO_Logo_4_blanco.svg`, para una barra oscura que ya no
  se usa — se borró);
  `PO_Logo_5.svg` (versión bicolor completa, con descriptor — es el logo de
  `Footer.astro`) y `PO_Logo_6.svg` (isotipo "P" sin fondo, solo trazo — es
  el favicon).
  **Ojo con los `viewBox`**: varios de estos archivos venían exportados sin
  recortar al contenido real (viewBox `0 0 1080 1080` completo con el dibujo
  ocupando solo una franja central) — ya se corrigieron a mano los de
  Logo_4, Logo_5 y Logo_6 calculando el bounding box real de los `<path>`
  (cuidado si recalculas esto: un parser de paths SVG que solo entienda
  M/L/C/Z y no H/V/S da bounding boxes incorrectos, que es como se rompieron
  la primera vez). Si algún día reexportas estos SVG desde el diseño
  original, vuelve a verificar su viewBox antes de asumir que ya viene
  recortado.
- Para botones de WhatsApp usa `src/components/WhatsAppButton.astro` (acepta
  `message`, `label`, `size`, y `variant="minimal"` para un enlace de texto
  con icono sin pastilla). No crees enlaces `wa.me` a mano.
- shadcn/ui está configurado (preset base-nova, Base UI). Para añadir
  componentes: `npx shadcn@latest add <componente>`. Los ya instalados están en
  `src/components/ui/`. Si hay una skill de shadcn disponible, úsala.

### Rendimiento (regla de oro: cero JavaScript — con una excepción, ver abajo)

- El sitio se envía **sin JavaScript** al navegador salvo la excepción de
  scroll/animaciones descrita abajo. No añadas islands de React
  (`client:load`, `client:visible`…) salvo necesidad real e imprescindible;
  para interactividad simple usa CSS o `<details>` (así funciona el menú móvil
  en `Header.astro`, los desplegables de `Faq.astro`, etc.). Los `.tsx` de
  shadcn pueden usarse renderizados en servidor (sin directiva `client:`) —
  eso no envía JS. El sitio ya llevaba antes un poco de JS vainilla mínimo
  para cosas puramente mecánicas que CSS no puede resolver (flechas de los
  carruseles de `[data-carousel]`, el cambio de fondo del header al hacer
  scroll en la home) — eso sigue igual, vive en `BaseLayout.astro`/
  `Header.astro`, sin librerías.
- **Excepción: scroll suave + reveals animados (Lenis + GSAP ScrollTrigger)**.
  El cliente pidió replicar el scroll animado de un sitio de referencia
  (Squarespace Foundations, `brand.squarespace.com/logo`), que usa Lenis
  (scroll suave) + GSAP ScrollTrigger (animaciones ancladas al scroll) — se
  le avisó explícitamente que esto significa sumar JavaScript real (dos
  librerías npm) y rompe la regla de cero JS de arriba, y confirmó que
  quería seguir igual. Vive en `src/scripts/scroll.ts`, importado desde un
  `<script>` en `BaseLayout.astro`. Reemplaza el reveal-on-scroll que antes
  era 100% CSS (`animation-timeline: view()`, en `.reveal`): ese enfoque
  ataba la animación a la posición de scroll en vez de a un tiempo fijo, así
  que con scroll lento se veía "borroso" a medio camino — con GSAP el
  tween tiene duración fija (0.6s, ease `power2.out`) y se dispara una sola
  vez al entrar en pantalla, sin ese problema. Respeta
  `prefers-reduced-motion: reduce` (si está activo, ni Lenis ni los tweens
  se inicializan — scroll nativo, contenido visible sin animar). GSAP y
  ScrollTrigger son 100% gratis para uso comercial desde que Webflow
  adquirió GreenSock (mayo 2025), sin necesidad de license key. Si el
  cliente pide más animaciones ancladas al scroll (parallax, texto que se
  divide en letras, secciones "pinneadas"), este es el lugar: ya está la
  infraestructura de Lenis + ScrollTrigger lista para registrar más
  triggers, no hace falta otra librería.
- Imágenes: usa `astro:assets` (`<Image>`) con `alt` siempre.

### SEO (no tocar sin entender)

- Cada página pasa `title` (≤ ~65 caracteres, keyword al principio) y
  `description` únicos a `BaseLayout`. No dupliques títulos entre páginas.
- Un solo `<h1>` por página; jerarquía h1 → h2 → h3 sin saltos.
- No elimines: canonical, sitemap, robots.txt, JSON-LD, ni el atributo
  `lang="es"`.
- Las URLs llevan barra final (`trailingSlash: 'always'`). Los enlaces internos
  también: `/aviso-legal/`.
- Páginas que no deben indexarse: pasa `noindex` a `BaseLayout` **y** exclúyelas
  del sitemap en `astro.config.mjs`.

## Recetas frecuentes

**Añadir un servicio nuevo**: añade la entrada en `SERVICES` de
`src/config.ts` (slug, título, short, mensaje de WhatsApp). No hay página
propia por trámite — cada uno vive como una card en la sección "Trámites"
de la home y como celda en la franja del footer; ambas leen de `SERVICES`
y se actualizan solas. La card y la celda del footer abren WhatsApp
directamente con `whatsAppMessage` (usa `waLink()` de `src/config.ts`).

**Cambiar textos de la home**: `src/pages/index.astro` (hero, servicios,
Paola, acompañamiento — 5 pasos —, valores, FAQ).

**Cambiar colores/fuentes**: solo en `src/styles/global.css` (variables en
`:root` y `.dark`). Comprueba contraste AA en textos.

**Antes de dar por terminado un cambio**: `npm run build` debe pasar sin
errores y conviene mirar la página afectada con `npm run dev`.

## Pendientes conocidos

- **`TESTIMONIALS` en `src/config.ts` son placeholder**: alimentan la
  sección "Lo que dicen mis clientes" (después de "Trámites" en
  `index.astro`). Los 5 "name" están marcados `[Nombre pendiente]` a
  propósito — nunca son testimonios reales, no los confundas con contenido
  aprobado. Hay que reemplazarlos por citas reales (con nombre real o
  iniciales si la persona prefiere anonimato) antes de publicar; no
  agregues `Review`/`AggregateRating` a los `jsonLd` de `index.astro`
  mientras el contenido siga siendo placeholder — eso sería reseñas falsas
  en los resultados de Google, no solo en la página.
- `src/config.ts`, `site` en `astro.config.mjs` y `public/robots.txt` llevan
  datos PLACEHOLDER (WhatsApp, dominio, email) hasta tener los reales. El
  nombre ya es el real: "Paola Ocampo" (según el logo en `public/`).
- Falta og:image (1200×630). La foto real de Paola está en uso solo en el
  hero (`public/foto_paola_completa.png`, `<img>` directo — a pedido del
  cliente se queda en `public/` sin pasar por `astro:assets`, así que se
  sirve sin comprimir a WebP, ~4.5MB; si más adelante se quiere optimizar
  sin sacarla de esa carpeta, revisar la opción de `inferSize`/`getImage()`
  de Astro para imágenes remotas o locales fuera de `src/`). "Sobre Paola"
  es texto centrado sin foto, sin columna de imagen.
- NIF y dirección en `/aviso-legal/` y `/privacidad/` están como [PENDIENTE].
- Decisión deliberada: no hay páginas individuales por trámite
  (`/servicios/<slug>/` ya no existe). Los 5 trámites solo viven como cards
  en la home y en el footer, cada una abriendo WhatsApp directamente. Esto
  simplifica el sitio a costa de perder URLs indexables específicas por
  trámite (arraigo, renovación, etc.) — si en el futuro se quiere mejorar el
  SEO por keyword de cada trámite, habría que reintroducir páginas propias.

## Documentación

- Astro: https://docs.astro.build (rutas, componentes, estilos, imágenes)
- shadcn/ui: https://ui.shadcn.com/docs
