import {defineConfig} from "vitepress";

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
      {text: "Home", link: "/"},
      {text: "Apuntes", link: "/bloque1/bloque1-js"},
      { text: 'TypeScript', link: '/bloque2/bloque2-ts' },
      { text: 'Angular', link: '/bloque3/bloque3-angular' },
      { text: 'Ang.Avanzado', link: '/bloque4/bloque4-angular-avanzado'},
      { text: 'Criterios', link: '/evaluacion-criterios' }
    ],

    sidebar: [
      {
        text: "Nivelación JavaScript",
        items: [
          {
            text: "Bloque 1: JavaScript Moderno (ES6+)",
            link: "/bloque1/bloque1-js"
          },
          {
            text: "🏋️ Ejercicios y Autoevaluación",
            link: "/bloque1/bloque1-ejercicios",
          },
        ],
      },
      {
        text: "El Puente a Angular",
        items: [
          {text: "Bloque 2: Fundamentos de TypeScript", link: "/bloque2/bloque2-ts"},
          {text: "Bloque 2: Ejercicios 1", link: "/bloque2/ejercicios/bl2-ejercicios-1"},
          {
            text: "Bloque 2: Ejercicios 2",
            link: "/bloque2/ejercicios/bl2-ejercicios-2",
          },
          {
            text: "Bloque 2: Retos y Autoevaluación",
            link: "/bloque2/ejercicios/bloque2-ejercicios"
          } 
        ],
      },
      {
        text: "Bloque 3: Angular Standalone",
        items: [
          {
            text: "3.0 Introducción al Framework",
            link: "/bloque3/bloque3-angular",
          },
          {
            text: '3.1 Entorno Angular CLI y Componentes',
            link: '/bloque3/semana5-componentes'
          },
          {
            text: '3.2 Data Binding y Directivas (@if / @for)',
            link: '/bloque3/semana6-databinding'
          },
          {
            text: '3.3 Comunicación (@Input/@Output) y Servicios',
            link: '/bloque3/semana7-servicios'
          },
          {
            text: '🏁 Proyecto Espejo - Fase 3 (Angular)',
            link: '/bloque3/practica-espejo-fase3'
          },
          {
            text: 'Bloque 4: Angular Avanzado',
            collapsed: false,
            items: [
              {
                text: '4.1 Enrutamiento y Navegación SPA',
                link: '/bloque4/semana9-routing'
              },
              {
                text: '4.2 Consumo de APIs REST (HttpClient & RxJS)',
                link: '/bloque4/semana11-httpclient'
              },
              {
                text: '4.3 Formularios Reactivos y Validaciones',
                link: '/bloque4/semana13-formularios'
              },
              {
                text: '4.4 Angular Material y Signals',
                link: '/bloque4/semana15-material-signals'
              }
            ]
          }
        ],
      },
      {
        text: "Evaluaciones",
        items: [
          {text: "📊 Criterios y Cronograma", link: "/evaluacion-criterios"},
          {
            text: "Práctica: Proyecto Espejo (Fase 1)",
            link: "/bloque1/practica-espejo-plantilla",
          },
          {
            text: "Práctica: Refactor TS (Fase 2)",
            link: "/bloque2/practica-espejo-fase2",
          },
        ],
      },
      {
        text: "Otros Recursos",
        items: [{text: "🛠️ Cómo se hizo esta web", link: "/anexo-vitepress"}],
      },
    ],

    socialLinks: [{icon: "github", link: "https://github.com"}],
  },
});
