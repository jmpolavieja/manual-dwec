# Estructura del Código Inicial (Fase 1)
Crea una carpeta en tu ordenador con estos tres archivos básicos:
## 1. `index.html`
El esqueleto HTML proporciona los contenedores vacios con los `id` específicos donde se inyectará la información, además del formulario de inserción.
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>DevTask - Enfoque Vanilla JS</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <div class="app-container">
    <header>
      <h1>DevTask 🚀 <small>Vanilla JS Edition</small></h1>
    </header>

    <!-- Formulario para añadir nuevas tareas -->
    <section class="form-section">
      <form id="form-tareas">
        <input type="text" id="input-titulo" placeholder="¿Qué tienes que programar hoy?..." required>
        <select id="select-prioridad">
          <option value="Alta">Alta</option>
          <option value="Media" selected>Media</option>
          <option value="Baja">Baja</option>
        </select>
        <button type="submit">Añadir Tarea</button>
      </form>
    </section>

    <!-- Botones de Filtrado de Estado -->
    <section class="filter-section">
      <button class="btn-filtro active" data-filtro="Todas">Todas</button>
      <button class="btn-filtro" data-filtro="Pendientes">Pendientes</button>
      <button class="btn-filtro" data-filtro="Completadas">Completadas</button>
    </section>

    <!-- Contenedor Dinámico para las Tareas -->
    <main class="tasks-section">
      <div id="loading-state" class="loading">Cargando tareas desde el servidor...</div>
      <ul id="lista-tareas">
        <!-- Las tareas generadas con JS se inyectarán aquí -->
      </ul>
    </main>
  </div>

  <script src="app.js"></script>
</body>
</html>
```
## 2. `style.css`
Un diseño moderno, minimalista y con variables CSS para que el resultado visual sea atractivo desde el primer minuto.
```css
:root {
  --bg-primary: #1e1e24;
  --bg-secondary: #2a2a35;
  --text-main: #f5f5f6;
  --brand-color: #646cff;
  --border-color: #3f3f50;
  --high-priority: #ff4a4a;
  --med-priority: #ffb703;
  --low-priority: #4caf50;
}

body {
  background-color: var(--bg-primary);
  color: var(--text-main);
  font-family: system-ui, -apple-system, sans-serif;
  margin: 0;
  padding: 2rem;
}

.app-container {
  max-width: 600px;
  margin: 0 auto;
}

form {
  display: flex;
  gap: 0.5rem;
  background-color: var(--bg-secondary);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--border-color);
}

input, select, button {
  padding: 0.6rem;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background: var(--bg-primary);
  color: white;
}

input { flex-grow: 1; }

button[type="submit"] {
  background-color: var(--brand-color);
  cursor: pointer;
}

.filter-section {
  margin: 1.5rem 0;
  display: flex;
  gap: 0.5rem;
}

.btn-filtro {
  cursor: pointer;
  background: transparent;
}

.btn-filtro.active {
  background-color: var(--brand-color);
  border-color: var(--brand-color);
}

ul {
  list-style: none;
  padding: 0;
}

.item-tarea {
  background-color: var(--bg-secondary);
  padding: 1rem;
  margin-bottom: 0.5rem;
  border-radius: 6px;
  border-left: 5px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-tarea.Alta { border-left-color: var(--high-priority); }
.item-tarea.Media { border-left-color: var(--med-priority); }
.item-tarea.Baja { border-left-color: var(--low-priority); }

.completada {
  text-decoration: line-through;
  opacity: 0.6;
}

.loading {
  text-align: center;
  font-style: italic;
  color: #888;
}
```
## 3. `app.js`(El esqueleto lógico)
Este es el archivo crítico. Os dejo  los datos iniciales y las funciones vacías estructuradas. Debéis rellenar la lógica aplicando lo aprendido.
```javascrit
// 1. Estado de la aplicación (Datos iniciales que simulan venir de una base de datos)
let tareas = [
  { id: 1, titulo: 'Aprender la sintaxis de ES6', prioridad: 'Alta', completada: true },
  { id: 2, titulo: 'Dominar la asincronía y Fetch', prioridad: 'Media', completada: false },
  { id: 3, titulo: 'Migrar el proyecto a Angular', prioridad: 'Baja', completada: false }
];

// Estado del filtro activo actual ('Todas', 'Pendientes', 'Completadas')
let filtroActual = 'Todas';

// 2. Selectores del DOM principales
const formulario = document.querySelector('#form-tareas');
const inputTitulo = document.querySelector('#input-titulo');
const selectPrioridad = document.querySelector('#select-prioridad');
const listaContenedor = document.querySelector('#lista-tareas');
const loadingState = document.querySelector('#loading-state');
const botonesFiltro = document.querySelectorAll('.btn-filtro');

// 3. FUNCIÓN ASÍNCRONA (AJAX simulado): Debe ejecutarse al arrancar la web
async function inicializarApp() {
  // TODO: Simular una espera de 1.5 segundos usando una Promesa (setTimeout)
  // TODO: Una vez pasada la espera, ocultar el div #loading-state
  // TODO: Invocar a la función pintarTareas()
}

// 4. FUNCIÓN DE RENDERIZADO: Encargada de pintar los nodos en el HTML
function pintarTareas() {
  // TODO: Limpiar el contenedor listaContenedor (innerHTML = '')
  // TODO: Filtrar el array 'tareas' según el 'filtroActual' usando .filter()
  // TODO: Recorrer el array filtrado y crear dinámicamente un elemento <li> por cada tarea
  // TODO: Configurar las clases CSS según la prioridad y el estado (completada)
  // TODO: Añadir un botón dentro de cada <li> para poder alternar el estado (Completada/Pendiente)
  // TODO: Inyectar el <li> resultante en listaContenedor usando .appendChild()
}

// 5. MANEJO DE EVENTOS: Captura de formulario
formulario.addEventListener('submit', (event) => {
  event.preventDefault();
  
  // TODO: Capturar los valores de los inputs de forma segura
  // TODO: Crear un nuevo objeto tarea inmutable con un id único (Date.now())
  // TODO: Añadir el objeto al array global de tareas de forma inmutable (operador spread)
  // TODO: Volver a invocar pintarTareas() y resetear el formulario
});

// 6. MANEJO DE EVENTOS: Captura de botones de filtrado
botonesFiltro.forEach(boton => {
  boton.addEventListener('click', (event) => {
    // Quitar clase active al botón anterior y ponérsela al pulsado
    document.querySelector('.btn-filtro.active').classList.remove('active');
    event.target.classList.add('active');

    // TODO: Actualizar la variable 'filtroActual' con el atributo 'data-filtro' del botón
    // TODO: Invocar pintarTareas() para refrescar la pantalla
  });
});

// Arrancar la aplicación
inicializarApp();
```
---