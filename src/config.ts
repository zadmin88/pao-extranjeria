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
  /** [PLACEHOLDER] Nombre de la asesora */
  name: "Paola Rodríguez",

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

/** Servicios: alimentan el menú, las tarjetas de la home, el footer y el sitemap interno */
export const SERVICES = [
  {
    slug: "arraigo",
    title: "Arraigos",
    menuLabel: "Arraigo (social, sociolaboral…)",
    short:
      "Regulariza tu situación sin salir de España: arraigo social, sociolaboral, socioformativo y familiar según el nuevo reglamento.",
    whatsAppMessage:
      "Hola Paola, vengo de tu página web. Quiero información sobre el arraigo.",
  },
  {
    slug: "renovaciones",
    title: "Renovaciones",
    menuLabel: "Renovación de residencia",
    short:
      "Renueva tu autorización de residencia y trabajo a tiempo y sin errores que pongan en riesgo tus papeles.",
    whatsAppMessage:
      "Hola Paola, vengo de tu página web. Necesito renovar mi residencia.",
  },
  {
    slug: "residencia-inicial",
    title: "Residencia inicial",
    menuLabel: "Residencia inicial",
    short:
      "Tu primera autorización de residencia en España: requisitos, documentación y presentación paso a paso.",
    whatsAppMessage:
      "Hola Paola, vengo de tu página web. Quiero información sobre la residencia inicial.",
  },
  {
    slug: "reagrupacion-familiar",
    title: "Reagrupación familiar",
    menuLabel: "Reagrupación familiar",
    short:
      "Trae a tu familia a España de forma legal: requisitos de vivienda, ingresos y todo el expediente completo.",
    whatsAppMessage:
      "Hola Paola, vengo de tu página web. Quiero reagrupar a mi familia.",
  },
  {
    slug: "modificaciones",
    title: "Modificaciones",
    menuLabel: "Modificación de residencia",
    short:
      "Cambia de tipo de autorización: de estudios a trabajo, de no lucrativa a laboral, de cuenta ajena a propia y más.",
    whatsAppMessage:
      "Hola Paola, vengo de tu página web. Quiero modificar mi autorización de residencia.",
  },
] as const;

export type Service = (typeof SERVICES)[number];

export function servicePath(slug: string): string {
  return `/servicios/${slug}/`;
}
