import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Scroll suave (Lenis) + reveals disparados por scroll (GSAP ScrollTrigger),
// a pedido del cliente tras ver el scroll animado de brand.squarespace.com/logo
// (esa referencia usa Lenis + GSAP ScrollTrigger). Esto rompe la regla de
// "cero JavaScript" documentada en CLAUDE.md — decisión consciente del
// cliente, no un descuido; ver la nota actualizada en ese archivo.
//
// El .reveal por CSS (animation-timeline: view()) que había antes se retiró:
// ataba la animación a la posición de scroll en vez de a un tiempo fijo, así
// que con scroll lento el fade quedaba a medio camino un buen rato y se leía
// "borroso" (motivo explícito por el que el cliente pidió esta reescritura).
// Con GSAP, el reveal es un tween de duración FIJA (0.6s) que se dispara una
// sola vez al entrar en pantalla — se ve nítido sin importar qué tan rápido
// o lento se scrollee.
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReducedMotion) {
  gsap.registerPlugin(ScrollTrigger);

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  document.querySelectorAll<HTMLElement>(".reveal").forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      }
    );
  });

  // Links del menú (Trámites, Sobre Paola, Preguntas frecuentes, footer,
  // etc.) que apuntan a una sección de ESTA MISMA página: en vez de dejar
  // que el navegador salte de golpe (scroll-behavior quedó en "auto" más
  // arriba en global.css, a propósito, para no pelear con Lenis), el click
  // se intercepta y se le pide a Lenis que anime el scroll — mismo motor
  // que ya suaviza la rueda/trackpad, así que no hay dos sistemas
  // compitiendo. lenis.scrollTo ya respeta el scroll-margin-top del
  // destino (scroll-mt-24, etc.), así que no hace falta calcular el offset
  // a mano. Los links a otra página (p. ej. "/#tramites" desde una página
  // de trámite) NO se interceptan: el navegador navega normal y el salto
  // a la sección ocurre de golpe al cargar, que es lo esperado.
  document.addEventListener("click", (e) => {
    const link = (e.target as HTMLElement).closest?.("a[href*='#']") as HTMLAnchorElement | null;
    if (!link) return;
    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
    const target = document.querySelector<HTMLElement>(url.hash);
    if (!target) return;
    e.preventDefault();
    lenis.scrollTo(target);
  });
}
