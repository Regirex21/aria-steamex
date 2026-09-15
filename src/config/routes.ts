// src/config/routes.ts
// Pares de rutas equivalentes ES <-> EN, para generar hreflang.
// Solo incluir páginas que existen en AMBOS idiomas.
export const localePairs: [string, string][] = [
  // ARIA
  ["/", "/en"],
  ["/nosotras", "/en/about_us"],
  ["/first", "/en/first"],
  ["/unirse", "/en/join"],
  ["/sponsors", "/en/sponsors"],
  ["/contacto", "/en/contact"],
  ["/liderazgo", "/en/leadership"],
  // ACRIS
  ["/acris", "/acris/en"],
  ["/acris/nosotros", "/acris/en/about"],
  ["/acris/ftc", "/acris/en/ftc"],
  ["/acris/unirse", "/acris/en/join"],
  ["/acris/liderazgo", "/acris/en/leadership"],
  ["/acris/contacto", "/acris/en/contact"],
];

// Normaliza un pathname quitando el slash final (excepto la raíz "/").
export function normalizePath(path: string): string {
  return path.length > 1 ? path.replace(/\/$/, "") : path;
}

// Dado el pathname actual, devuelve el par { es, en } al que pertenece,
// o null si la página no tiene equivalente en el otro idioma.
export function getLocalePair(pathname: string): { es: string; en: string } | null {
  const current = normalizePath(pathname);
  const pair = localePairs.find(
    ([es, en]) => normalizePath(es) === current || normalizePath(en) === current
  );
  if (!pair) return null;
  return { es: pair[0], en: pair[1] };
}
