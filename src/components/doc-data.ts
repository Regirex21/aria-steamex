// Datos de la seccion "Documentacion publica" (ES/EN). Una sola fuente para el indice,
// las subpaginas y la revista. Para agregar un documento, solo se suma una entrada a `docs`.
export type Lang = "es" | "en";
export type CatId = "procesos" | "ingenieria" | "negocios" | "cads" | "identidad" | "revista";
type L = { es: string; en: string };
const t = (es: string, en: string): L => ({ es, en });

export const catOrder: CatId[] = ["procesos", "ingenieria", "negocios", "cads", "identidad", "revista"];

export const numerals: Record<CatId, string> = {
  procesos: "I",
  ingenieria: "II",
  negocios: "III",
  cads: "IV",
  identidad: "V",
  revista: "VI",
};

export const cats: Record<
  CatId,
  { slug: L; tab: L; title: L; intro: L; seoTitle: L }
> = {
  procesos: {
    slug: t("procesos", "processes"),
    tab: t("Procesos", "Processes"),
    title: t("Manuales de Proceso", "Process Manuals"),
    seoTitle: t("Manuales de proceso | ARIA STEAMEX", "Process manuals | ARIA STEAMEX"),
    intro: t(
      "Cómo trabajamos de principio a fin: del análisis del reto al taller, el software, la imagen y el impacto social. MDP significa manual de proceso.",
      "How we work from start to finish: from game analysis to the shop, software, media and social impact. PM stands for process manual.",
    ),
  },
  ingenieria: {
    slug: t("ingenieria", "engineering"),
    tab: t("Ingeniería", "Engineering"),
    title: t("Ingeniería", "Engineering"),
    seoTitle: t("Documentación de ingeniería | ARIA STEAMEX", "Engineering documentation | ARIA STEAMEX"),
    intro: t(
      "La documentación técnica del robot: arquitectura, programación, subsistemas, pruebas e iteraciones.",
      "The technical documentation of the robot: architecture, programming, subsystems, testing and iterations.",
    ),
  },
  negocios: {
    slug: t("negocios", "business"),
    tab: t("Negocios", "Business"),
    title: t("Negocios e Impacto", "Business and Impact"),
    seoTitle: t("Negocios e impacto | ARIA STEAMEX", "Business and impact | ARIA STEAMEX"),
    intro: t(
      "Estrategia, sostenibilidad e impacto: los documentos con los que el equipo planea su crecimiento.",
      "Strategy, sustainability and impact: the documents the team uses to plan its growth.",
    ),
  },
  cads: {
    slug: t("cads", "cads"),
    tab: t("CAD", "CAD"),
    title: t("CADs", "CADs"),
    seoTitle: t("Diseños CAD | ARIA STEAMEX", "CAD designs | ARIA STEAMEX"),
    intro: t(
      "Diseños mecánicos, ensamblajes y documentación CAD desarrollados durante la temporada.",
      "Mechanical designs, assemblies and CAD documentation developed during the season.",
    ),
  },
  identidad: {
    slug: t("branding", "visual-identity"),
    tab: t("Identidad visual", "Visual identity"),
    title: t("Identidad Visual", "Visual Identity"),
    seoTitle: t("Identidad visual | ARIA STEAMEX", "Visual identity | ARIA STEAMEX"),
    intro: t(
      "Marca, lineamientos gráficos y recursos visuales de ARIA STEAMEX.",
      "Branding, graphic guidelines and visual resources of ARIA STEAMEX.",
    ),
  },
  revista: {
    slug: t("revista", "magazine"),
    tab: t("Revista", "Magazine"),
    title: t("Olympus", "Olympus"),
    seoTitle: t("Olympus | Revista ARIA STEAMEX", "Olympus | ARIA STEAMEX Magazine"),
    intro: t(
      "La revista mensual de la comunidad FIRST en México.",
      "The monthly magazine of the FIRST community in Mexico.",
    ),
  },
};

export const base: L = t("/impacto", "/en/impact");
export const pathFor = (lang: Lang, cat: CatId) => `${base[lang]}/${cats[cat].slug[lang]}`;

export type Kind = "pdf" | "repo" | "page" | "zip" | "soon";
export interface Doc {
  id: string;
  cat: CatId;
  kind: Kind;
  thumb: string | null; // portada en /public; null usa la portada de Olympus hecha en CSS
  cover?: boolean;
  isDefault?: boolean;
  title: L;
  desc: L;
  href: L | null;
  docLang: L; // idioma del documento en cada version del sitio
}

const pdf = (
  id: string, cat: CatId, thumb: string, title: L, desc: L, hrefEs: string, hrefEn: string, langEn = "ES",
): Doc => ({ id, cat, kind: "pdf", thumb, title, desc, href: t(hrefEs, hrefEn), docLang: t("ES", langEn) });

const soon = (id: string, cat: CatId, thumb: string, title: L, desc: L): Doc => ({
  id, cat, kind: "soon", thumb, title, desc, href: null, docLang: t("ES", "EN"),
});

export const docs: Doc[] = [
  // I. Procesos
  pdf("mdp-kickoff", "procesos", "/assets/impacto/covers/mdp-kickoff.webp",
    t("MDP: kickoff y análisis del reto", "PM: Kickoff and game analysis"),
    t("Proceso de análisis del reto, generación de ideas y planificación inicial.", "Game analysis process, idea generation, and initial planning."),
    "/docs/MDP-Kickoff-y-Analisis-del-Reto.pdf", "/docs/EN-MDP-Kickoff-and-Game-Analysis.pdf", "EN"),
  pdf("mdp-cad", "procesos", "/assets/impacto/covers/mdp-cad.webp",
    t("MDP: modelado y CAD", "PM: Modeling and CAD"),
    t("Workflow de modelado, diseño CAD y desarrollo de prototipos digitales.", "Modeling workflow, CAD design, and development of digital prototypes."),
    "/docs/MDP-Modelado-y-CAD.pdf", "/docs/EN-MDP-Modeling-and-CAD.pdf", "EN"),
  pdf("mdp-fab", "procesos", "/assets/impacto/covers/mdp-fab.webp",
    t("MDP: fabricación y ensamblaje", "PM: Fabrication and assembly"),
    t("Procesos de manufactura, técnicas de ensamblaje y organización del taller.", "Manufacturing processes, assembly techniques, and shop organization."),
    "/docs/MDP-Fabricacion-y-Ensamblaje.pdf", "/docs/EN-MDP-Fabrication-and-Assembly.pdf", "EN"),
  pdf("mdp-prog", "procesos", "/assets/impacto/covers/mdp-prog.webp",
    t("MDP: programación y electrónica", "PM: Programming and electronics"),
    t("Desarrollo de software, integración de sistemas y procesos de testing.", "Software development, systems integration, and testing processes."),
    "/docs/MDP-Programacion-y-Electronica.pdf", "/docs/EN-MDP-Programming-and-Electronics.pdf", "EN"),
  pdf("mdp-imagen", "procesos", "/assets/impacto/covers/mdp-imagen.webp",
    t("MDP: imagen y medios", "PM: Image and media"),
    t("Lineamientos de comunicación, redes, contenido y manejo de imagen del equipo.", "Communication guidelines, social media, content, and management of the team's image."),
    "/docs/Manual-Proceso-Imagen.pdf", "/docs/Manual-Proceso-Imagen.pdf"),
  pdf("mdp-impacto", "procesos", "/assets/impacto/covers/mdp-impacto.webp",
    t("MDP: impacto social", "PM: Social impact"),
    t("Metodología de outreach, actividades STEM y proyectos de impacto en la comunidad.", "Outreach methodology, STEM activities, and community impact projects."),
    "/docs/Manual-Proceso-Impacto-Social.pdf", "/docs/Manual-Proceso-Impacto-Social.pdf"),
  pdf("mdp-marketing", "procesos", "/assets/impacto/covers/mdp-marketing.webp",
    t("MDP: marketing", "PM: Marketing"),
    t("Estrategias, métricas, KPI y embudos para comunicar y medir el impacto del equipo.", "Strategies, metrics, KPIs and funnels to communicate and measure the team's impact."),
    "/docs/Manual-Proceso-Marketing.pdf", "/docs/Manual-Proceso-Marketing.pdf"),
  pdf("handbook", "procesos", "/assets/impacto/covers/handbook.webp",
    t("Handbook del equipo", "Team Handbook"),
    t("Organización, misión, valores, áreas de trabajo y lineamientos de participación del equipo.", "Organization, mission, values, work areas and participation guidelines of the team."),
    "/docs/Handbook-ARIA-11040.pdf", "/docs/EN-Team-Handbook-ARIA-11040.pdf", "EN"),
  // II. Ingenieria
  pdf("libro-ing", "ingenieria", "/assets/impacto/covers/libro-ing.webp",
    t("Libro de Ingeniería 2026", "Engineering Notebook 2026"),
    t("Arquitectura del robot, estrategia, subsistemas y programación.", "Robot architecture, strategy, subsystems, and programming."),
    "/docs/Libro-de-Ingenieria-25-26.pdf", "/docs/EN-Engineering-Notebook-25-26.pdf", "EN"),
  {
    id: "codigo", cat: "ingenieria", kind: "repo", thumb: "/assets/impacto/programacion-doc.png",
    title: t("Código 2026", "Code 2026"),
    desc: t("Estructura del código, organización de archivos y estándares de programación.", "Code structure, file organization, and programming standards."),
    href: t("https://github.com/Regirex21/Aria-Artemis", "https://github.com/Regirex21/Aria-Artemis"),
    docLang: t("EN", "EN"),
  },

  // III. Negocios
  pdf("plan-negocios", "negocios", "/assets/impacto/covers/plan-negocios.webp",
    t("Plan de Negocios 2025-26", "Business Plan 2025-26"),
    t("Identidad, organización, marca y estrategias del equipo para la temporada.", "Identity, organization, brand and strategies of the team for the season."),
    "/docs/Plan-de-Negocios-25-26.pdf", "/docs/Plan-de-Negocios-25-26.pdf"),
  pdf("reporte-desempeno", "negocios", "/assets/impacto/covers/reporte-desempeno.webp",
    t("Reporte de desempeño 2026", "Performance Report 2026"),
    t("Resultados del robot en el regional, fallas detectadas y plan de mejora para la siguiente temporada.", "Robot results at the regional, issues found and improvement plan for the next season."),
    "/docs/Reporte-de-Desempeno-REBUILT-25-26.pdf", "/docs/Reporte-de-Desempeno-REBUILT-25-26.pdf"),
  soon("patrocinios", "negocios", "/assets/impacto/sponsors-doc.png",
    t("Patrocinios", "Sponsorships"),
    t("Estructura de patrocinio, beneficios y relación con aliados.", "Sponsorship structure, benefits, and relationship with partners.")),
  soon("impacto-comunitario", "negocios", "/assets/impacto/documentacion.png",
    t("Impacto Comunitario", "Community Impact"),
    t("Actividades STEM, outreach y proyectos desarrollados por el equipo.", "STEM activities, outreach, and projects developed by the team.")),
  soon("sostenibilidad", "negocios", "/assets/impacto/sostenibilidad.png",
    t("Sostenibilidad", "Sustainability"),
    t("Planeación financiera, continuidad y crecimiento a largo plazo.", "Financial planning, continuity, and long-term growth.")),
  soon("pitch", "negocios", "/assets/impacto/brand-guidelines.png",
    t("Pitch Deck", "Pitch Deck"),
    t("Presentación institucional del equipo y su propuesta de valor.", "Institutional presentation of the team and its value proposition.")),

  // IV. CAD
  soon("artemis", "cads", "/assets/impacto/artemis-cad.png",
    t("Artemis", "Artemis"),
    t("CAD completo del robot 2026 desarrollado por ARIA STEAMEX.", "Full CAD of the 2026 robot developed by ARIA STEAMEX.")),

  // V. Identidad visual
  pdf("manual-marca", "identidad", "/assets/impacto/covers/manual-marca.webp",
    t("Manual de Marca", "Brand Manual"),
    t("Lineamientos visuales, tipografía, colores y uso correcto de la identidad de ARIA STEAMEX.", "Visual guidelines, typography, colors, and correct use of the ARIA STEAMEX identity."),
    "/docs/Manual-de-Marca-ARIA-11040.pdf", "/docs/Manual-de-Marca-ARIA-11040.pdf"),
  {
    id: "logos", cat: "identidad", kind: "zip", thumb: "/assets/impacto/covers/logos.webp",
    title: t("Logos Oficiales", "Official Logos"),
    desc: t("Versiones oficiales del logo de ARIA STEAMEX en PNG y SVG, en todas sus variantes de color.", "Official ARIA STEAMEX logo versions in PNG and SVG, in all color variants."),
    href: t("/docs/ARIA-Logos-Oficiales.zip", "/docs/ARIA-Logos-Oficiales.zip"),
    docLang: t("ES", "EN"),
  },
  pdf("creacion-marca", "identidad", "/assets/impacto/covers/creacion-marca.webp",
    t("Manual de Creación de Marca", "Brand Creation Manual"),
    t("Cómo construir una marca: ADN, posicionamiento, logotipo, tipografía, color y aplicaciones.", "How to build a brand: DNA, positioning, logo, typography, color and applications."),
    "/docs/Manual-de-Creacion-de-Marca.pdf", "/docs/Manual-de-Creacion-de-Marca.pdf"),
  soon("media-kit", "identidad", "/assets/impacto/sponsors-doc.png",
    t("Media Kit", "Media Kit"),
    t("Recursos gráficos y materiales institucionales para sponsors y difusión.", "Graphic resources and institutional materials for sponsors and outreach.")),
  soon("redes", "identidad", "/assets/impacto/documentacion.png",
    t("Identidad de Redes", "Social Media Identity"),
    t("Sistema visual para publicaciones, contenido digital y comunicación del equipo.", "Visual system for posts, digital content, and team communication.")),
  soon("presentaciones", "identidad", "/assets/impacto/business-plan.png",
    t("Presentaciones", "Presentations"),
    t("Templates y lineamientos para pitch decks y presentaciones oficiales.", "Templates and guidelines for pitch decks and official presentations.")),

  // VI. Revista
  {
    id: "olympus-pagina", cat: "revista", kind: "page", thumb: "/assets/impacto/covers/olympus-01.webp",
    title: t("Olympus, la revista", "Olympus, the magazine"),
    desc: t("Una revista mensual hecha por y para la comunidad FIRST en México. Equipos y personas comparten sus proyectos y experiencias, y tu equipo puede aparecer en la siguiente.",
      "A monthly magazine made by and for the FIRST community in Mexico. Teams and people share their projects and experiences, and your team can be featured in the next one."),
    href: t("/impacto/revista", "/en/impact/magazine"),
    docLang: t("ES", "EN"),
  },
  {
    id: "olympus-01", cat: "revista", kind: "pdf", thumb: "/assets/impacto/covers/olympus-01.webp", isDefault: true,
    title: t("Olympus, edición 01", "Olympus, issue 01"),
    desc: t("Primera edición, octubre 2026. 54 páginas.", "First issue, October 2026. 54 pages, in Spanish."),
    href: t("/docs/Olympus-Edicion-01-Octubre-2026.pdf", "/docs/Olympus-Edicion-01-Octubre-2026.pdf"),
    docLang: t("ES", "ES"),
  },
];


// Destacados del indice (fuera del catalogo por categorias, no cuentan en las pestañas)
export const firstAid: Doc = {
  id: "primeros-auxilios", cat: "procesos", kind: "pdf", thumb: "/assets/impacto/covers/primeros-auxilios.webp",
  title: t("Manual de primeros auxilios", "First aid manual"),
  desc: t("Un recurso esencial para la seguridad del equipo, con protocolos claros para emergencias médicas durante talleres, eventos y actividades de campo.",
    "An essential resource for team safety, with clear protocols for medical emergencies during workshops, events, and field activities."),
  href: t("/docs/Manual-Primeros-Auxilios.pdf", "/docs/Manual-Primeros-Auxilios.pdf"),
  docLang: t("ES", "ES"),
};
export const ui = {
  es: {
    htmlLang: "es",
    seoTitle: "Documentación pública | ARIA STEAMEX",
    seoDesc: "Documentación pública de ARIA STEAMEX: ingeniería, procesos, negocios, CADs, identidad visual y la revista Olympus, abiertos para toda la comunidad.",
    team: "ARIA STEAMEX",
    h1a: "Documentación",
    h1b: "pública",
    lead: "Aquí dejamos por escrito cómo diseñamos, construimos y organizamos nuestro trabajo: manuales de proceso, el libro de ingeniería, la marca y la revista Olympus. Todo es abierto, para que cualquier persona o equipo lo lea, lo use y lo mejore.",
    featured: "Destacados",
    featuredDoc: "Documento destacado",
    featuredMag: "Revista",
    available: "disponibles",
    inProgress: "en preparación",
    tabsLabel: "Categorías de documentos",
    all: "Todo",
    searchLabel: "Buscar en la documentación",
    searchPh: "Buscar por título o tema",
    count: "Mostrando {n} de {t} documentos",
    empty: "No encontramos documentos con esa búsqueda. Prueba con otra palabra o elige otra categoría.",
    section: "Ver sección",
    previewLabel: "Vista previa del documento",
    previewHint: "Pasa el cursor sobre un documento para ver su portada.",
    format: "Formato",
    language: "Idioma",
    status: "Estado",
    statusReady: "Disponible",
    statusSoon: "Próximamente",
    langName: { ES: "Español", EN: "Inglés" } as Record<string, string>,
    kind: { pdf: "PDF", repo: "Repositorio", page: "Página", zip: "ZIP (PNG y SVG)", soon: "En preparación" } as Record<string, string>,
    go: { pdf: "Abrir", repo: "Ver repositorio", page: "Entrar", zip: "Descargar", soon: "Próximamente" } as Record<string, string>,
    cta: { pdf: "Abrir documento", repo: "Ver repositorio", page: "Entrar a la sección", zip: "Descargar logos" } as Record<string, string>,
    newTab: "(se abre en una pestaña nueva)",
    crumbRoot: "Documentación pública",
    crumbLabel: "Ruta de navegación",
    sibsLabel: "Otras secciones",
    sibsAll: "Todas",
    back: "Volver a la documentación",
    colonnade: "Columnas jónicas dibujadas como adorno",
  },
  en: {
    htmlLang: "en",
    seoTitle: "Public documentation | ARIA STEAMEX",
    seoDesc: "ARIA STEAMEX public documentation: engineering, processes, business, CADs, visual identity and the Olympus magazine, open to the whole community.",
    team: "ARIA STEAMEX",
    h1a: "Public",
    h1b: "documentation",
    lead: "This is where we write down how we design, build and organize our work: process manuals, the engineering notebook, our brand and the Olympus magazine. It is all open, so any person or team can read it, use it and improve it.",
    featured: "Featured",
    featuredDoc: "Featured document",
    featuredMag: "Magazine",
    available: "available",
    inProgress: "in progress",
    tabsLabel: "Document categories",
    all: "All",
    searchLabel: "Search the documentation",
    searchPh: "Search by title or topic",
    count: "Showing {n} of {t} documents",
    empty: "We could not find documents for that search. Try another word or pick another category.",
    section: "View section",
    previewLabel: "Document preview",
    previewHint: "Hover over a document to see its cover.",
    format: "Format",
    language: "Language",
    status: "Status",
    statusReady: "Available",
    statusSoon: "Coming soon",
    langName: { ES: "Spanish", EN: "English" } as Record<string, string>,
    kind: { pdf: "PDF", repo: "Repository", page: "Page", zip: "ZIP (PNG and SVG)", soon: "In progress" } as Record<string, string>,
    go: { pdf: "Open", repo: "View repository", page: "Enter", zip: "Download", soon: "Coming soon" } as Record<string, string>,
    cta: { pdf: "Open document", repo: "View repository", page: "Go to the section", zip: "Download logos" } as Record<string, string>,
    newTab: "(opens in a new tab)",
    crumbRoot: "Public documentation",
    crumbLabel: "Breadcrumb",
    sibsLabel: "Other sections",
    sibsAll: "All",
    back: "Back to the documentation",
    colonnade: "Ionic columns drawn as decoration",
  },
};
