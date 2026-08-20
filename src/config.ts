/**
 * ============================================================
 *  DATOS DEL SITIO — CAMBIA AQUÍ LOS PLACEHOLDERS
 * ============================================================
 *  Este es el ÚNICO archivo que hay que editar para poner los
 *  datos reales. Todo el sitio (botones de WhatsApp, textos,
 *  SEO, schema.org) lee de aquí.
 *
 *  ⚠️ Recuerda cambiar también `site` en astro.config.mjs
 *     cuando tengas el dominio definitivo (debe coincidir con
 *     SITE.url) para que el sitemap y las canonicals sean correctas.
 */

export const SITE = {
  name: "Paola Ocampo",

  /** [PLACEHOLDER] Marca / título del sitio */
  brand: "Extranjería con Paola",

  /**
   * [PLACEHOLDER] Número de WhatsApp en formato internacional,
   * SIN "+", SIN espacios. Ej: España 6XX XX XX XX → "346XXXXXXXX"
   */
  whatsappNumber: "34600000000",

  /** [PLACEHOLDER] Cómo se muestra el teléfono en pantalla */
  phoneDisplay: "+34 600 00 00 00",

  /** [PLACEHOLDER] Email de contacto (aparece en el footer y legales) */
  email: "hola@ejemplo.com",

  /**
   * [PLACEHOLDER] URL definitiva del sitio, sin barra final.
   * Debe coincidir con `site` en astro.config.mjs.
   */
  url: "https://extranjeria-con-paola.vercel.app",

  /** Descripción corta reutilizada en SEO y schema.org */
  tagline:
    "Asesoría de extranjería online para latinos en toda España: arraigos, renovaciones, residencia inicial, reagrupación familiar y modificaciones.",

  /** Mensaje que se prellena al abrir WhatsApp desde el botón general */
  defaultWhatsAppMessage:
    "Hola Paola, vengo de tu página web. Quiero hacer una consulta sobre mi trámite de extranjería.",
} as const;

/** Enlace de WhatsApp con mensaje prellenado */
export function waLink(message: string = SITE.defaultWhatsAppMessage): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Ruta interna de la página de un trámite (con barra final). */
export function servicePath(slug: string): string {
  return `/servicios/${slug}/`;
}

/** Servicios: alimentan las tarjetas de la home y la franja del footer */
export const SERVICES = [
  {
    slug: "arraigo",
    title: "Arraigo social, sociolaboral y familiar",
    short:
      "Regulariza tu situación sin salir de España: arraigo social, sociolaboral, socioformativo y familiar según el nuevo reglamento.",
    cta: "Consultar sobre mi arraigo",
    whatsAppMessage:
      "Hola Paola, vengo de tu página web. Quiero información sobre el arraigo.",
  },
  {
    slug: "renovaciones",
    title: "Renovación de residencia",
    short:
      "Renueva tu autorización de residencia y trabajo a tiempo y sin errores que pongan en riesgo tus papeles.",
    cta: "Renovar mi residencia",
    whatsAppMessage:
      "Hola Paola, vengo de tu página web. Necesito renovar mi residencia.",
  },
  {
    slug: "residencia-inicial",
    title: "Residencia inicial",
    short:
      "Tu primera autorización de residencia en España: requisitos, documentación y presentación paso a paso.",
    cta: "Empezar mi residencia",
    whatsAppMessage:
      "Hola Paola, vengo de tu página web. Quiero información sobre la residencia inicial.",
  },
  {
    slug: "reagrupacion-familiar",
    title: "Reagrupación familiar",
    short:
      "Trae a tu familia a España de forma legal: requisitos de vivienda, ingresos y todo el expediente completo.",
    cta: "Reagrupar a mi familia",
    whatsAppMessage:
      "Hola Paola, vengo de tu página web. Quiero reagrupar a mi familia.",
  },
  {
    slug: "modificaciones",
    title: "Modificación de residencia",
    short:
      "Cambia de tipo de autorización: de estudios a trabajo, de no lucrativa a laboral, de cuenta ajena a propia y más.",
    cta: "Cambiar mi autorización",
    whatsAppMessage:
      "Hola Paola, vengo de tu página web. Quiero modificar mi autorización de residencia.",
  },
] as const;

export type Service = (typeof SERVICES)[number];

/**
 * [PLACEHOLDER] Testimonios: alimentan la sección de reviews de la home.
 * Estos 5 son de relleno para poder maquetar la sección — el "name" queda
 * marcado como [PENDIENTE] a propósito para que sea imposible confundirlos
 * con citas reales de clientas/clientes. Antes de publicar, reemplaza cada
 * "quote" y "name" por un testimonio real (con el nombre real o, si la
 * persona prefiere anonimato, con iniciales/nombre de pila — nunca dejes
 * un testimonio sin una persona real detrás).
 */
export const TESTIMONIALS = [
  {
    quote:
      "Desde el primer mensaje entendí qué necesitaba y cuánto iba a costar. Nada de sorpresas ni de esperar semanas para una respuesta.",
    name: "[Nombre pendiente]",
  },
  {
    quote:
      "Llevaba meses dando vueltas sin saber por dónde empezar. Paola me lo explicó todo por WhatsApp, paso a paso, sin tecnicismos.",
    name: "[Nombre pendiente]",
  },
  {
    quote:
      "Revisó cada documento antes de presentarlo, así que llegué segura a la cita. Se nota que conoce el proceso de memoria.",
    name: "[Nombre pendiente]",
  },
  {
    quote:
      "Lo que más valoro es que siempre supe en qué punto estaba mi trámite. Nunca tuve que perseguir a nadie para pedir novedades.",
    name: "[Nombre pendiente]",
  },
  {
    quote:
      "Me trató como persona, no como un número de expediente más. Eso se agradece mucho cuando no entiendes nada de leyes.",
    name: "[Nombre pendiente]",
  },
] as const;
