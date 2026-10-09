# 🛠️ Anexo: Cómo se ha creado este manual (Guía de Despliegue)

¿Te gusta cómo se ve y funciona esta web de apuntes? Está construida utilizando herramientas estándar de la industria del desarrollo web moderno. A continuación, tienes la guía paso a paso para que puedas crear, documentar y desplegar tus propios proyectos o portafolios de forma totalmente gratuita.

---

## 🚀 1. Tecnologías Utilizadas

*   **VitePress:** Un generador de sitios estáticos basado en **Vue.js** y **Vite**. Permite escribir el contenido en archivos Markdown normales (`.md`) y los transforma en una web SPA (Single Page Application) ultrarrápida, con buscador integrado y modo oscuro nativo.
*   **Git & GitHub:** Para el control de versiones del código fuente.
*   **GitHub Actions:** Un motor de automatización (CI/CD) que compila el código y actualiza la web de forma automática cada vez que subimos un cambio.
*   **GitHub Pages:** El servicio de alojamiento gratuito de GitHub para páginas estáticas.

---

## 🛠️ 2. Guía de Instalación Paso a Paso

Sigue estos comandos en tu terminal para montar tu entorno desde cero:

### Paso 2.1: Inicializar el proyecto Node.js
Crea una carpeta para tu proyecto, entra en ella e inicializa el gestor de paquetes de Node:
```bash
mkdir mi-documentacion
cd mi-documentacion
npm init -y
```

### Paso 2.2: Instalar VitePress
Instala la herramienta como una dependencia de desarrollo en tu proyecto:
```bash
npm add -D vitepress
```

### Paso 2.3: Lanzar el asistente de configuración
VitePress incluye un asistente interactivo en la terminal. Ejecútalo con el siguiente comando:
```bash
npx vitepress init
```
*Recomendación del asistente:* Cuando te pregunte la ruta de inicialización, selecciona `./docs`. Configura el título de tu web y elige el **Default Theme** (Tema por defecto).

---

## ⚙️ 3. Configuración y Desarrollo

### Paso 3.1: Estructura de carpetas
Tu proyecto quedará ordenado de la siguiente manera:
```text
mi-documentacion/
├── docs/
│   ├── .vitepress/
│   │   └── config.ts       <-- Menú superior, lateral y títulos
│   ├── public/             <-- Tus imágenes, logos y recursos estáticos
│   ├── index.md            <-- La portada de tu página web
│   └── tus-apuntes.md      <-- Tus páginas de contenido en Markdown
└── package.json
```

### Paso 3.2: Servidor de desarrollo local
Para ver los cambios que haces en tus archivos de texto en tiempo real en tu navegador, arranca el servidor local:
```bash
npm run docs:dev
```
Abre en tu navegador la dirección `http://localhost:5173` que te indicará la terminal.

---

## 🤖 4. Despliegue Automatizado en Internet (CI/CD)

Para que tu web esté online de forma pública y gratuita a través de GitHub Pages, utilizamos una **GitHub Action**.

### Paso 4.1: Configurar la ruta base
Abre tu archivo `docs/.vitepress/config.ts` y añade la propiedad `base` indicando el nombre exacto de tu repositorio de GitHub entre barras:
```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/nombre-de-tu-repositorio/', // ⚠️ Muy importante para que carguen los estilos
  title: "Mi Web Profesional",
  // ... resto de tu configuración
})
```

### Paso 4.2: Crear el flujo de automatización
Crea la siguiente ruta de carpetas ocultas en la raíz de tu proyecto: `.github/workflows/`. Dentro, crea un archivo llamado **`deploy.yml`** con el siguiente script de compilación automática:

```yaml
name: Deploy VitePress site to Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: npm ci
      - name: Build with VitePress
        run: npm run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### Paso 4.3: Subir a GitHub y Activar
1. Crea un repositorio **Público** en tu cuenta de GitHub con el mismo nombre que pusiste en la ruta `base`.
2. Sube tu código local ejecutando los comandos `git init`, `git add .`, `git commit` y `git push`.
3. Entra en la web de tu repositorio en GitHub, ve a **Settings** -> **Pages**. En la sección *Build and deployment*, cambia el desplegable *Source* de "Deploy from a branch" a **GitHub Actions**.

¡Listo! A partir de este momento, cada vez que hagas un cambio en tus archivos de texto y hagas un `git push`, los servidores de GitHub actualizarán tu web automáticamente en menos de un minuto.
