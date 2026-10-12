import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/manual-dwec/",
  title: "Manual DWEC: De JS a Angular",
  description: "Apuntes y prácticas ara el Ciclo Superior DAW",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "Escudo.jpg",
    siteTitle: "DWEC -DAW",
    nav: [
      { text: "Home", link: "/" },
      { text: "Apuntes", link: "/bloque1-js" },
    ],

    sidebar: [
      {
        text: "Nivelación JavaScript",
        items: [
          { text: "Bloque 1:JavaScript Moderno (ES6+)", link: "/bloque1-js" },
          {
            text: "🏋️ Ejercicios y Autoevaluación",
            link: "/bloque1-ejercicios",
          },
        ],
      },
      {
        text: "El Puente a Angular",
        items: [
          { text: "Bloque 2: Fundamentos de TypeScript", link: "/bloque2-ts" },
          {
            text: "🏋️ Banco de Retos Prácticos: TypeScript",
            link: "/bloque2-ejercicios",
          },
        ],
      },
      {
        text: "Desembarco en Angular",
        items: [
          {
            text: "Bloque 3: Componentes y Directivas",
            link: "/bloque3-angular",
          },
        ],
      },
      {
        text: "Evaluaciones",
        items: [
          { text: "📊 Criterios y Cronograma", link: "/evaluacion-criterios" },
          {
            text: "Práctica: Proyecto Espejo (Fase 1)",
            link: "/practica-espejo-plantilla",
          },
          {
            text: "Práctica: Refactor TS (Fase 2)",
            link: "/practica-espejo-fase2",
          },
        ],
      },
      {
        text: "Otros Recursos",
        items: [{ text: "🛠️ Cómo se hizo esta web", link: "/anexo-vitepress" }],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com" }],
  },
});
