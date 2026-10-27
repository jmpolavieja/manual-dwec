# Ejercicios prácticos:

Cada ejercicio es autónomo e incluye la *estructura de carpetas*, la configuración estricta de compilción
(`tsconfig.json`), la plantilla `index.html` enlazada al aarchivo transpilado en `dist/app.js`, la hoja de estilos
'style.css` y el código fuente TypeScript (`src/app.ts`) sin uso de any.

## Configuración base compartida (`tsconfig.json`)

Para cualquiera de los ejercicios, la raíz del proyecto utiliza el siguiente archivo de configuración oficial:

```
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "skipLibCheck": true
  }
}
```

_Comando para compilar en tiempo real:_ `tsc --watch`

## Ejercicio 1: Contador de Pasos y Estado (Tipado Primitivo, Literales y DOM Tipado)

* **Objetivo**: Practicar el tipado de primitivos (`number`, `string`, `boolean`), uniones de tipos literales y el
  casteo seguro de elementos del DOM nativo (`HTMLButtonElement`, `HTMLSpanElement`) sin recurrir a `any`.

### Estructura del Proeycto

```
ejercicio1-contador/
├── dist/                <-- Se genera al compilar (dist/app.js)
├── src/
│   └── app.ts           <-- Lógica TypeScript
├── index.html
├── style.css
└── tsconfig.json
```

### 1. `index.html`

```
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ejercicio 1 - Contador TS</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="card">
    <h2>Contador Tipado ⏱️</h2>
    <div class="display">
      <span id="valor-contador">0</span>
    </div>
    <div class="estado-tag" id="tag-estado">En Reposo</div>

    <div class="acciones">
      <button id="btn-decrementar" class="btn btn-secundario">-1</button>
      <button id="btn-reset" class="btn btn-alerta">Reset</button>
      <button id="btn-incrementar" class="btn btn-primario">+1</button>
    </div>
  </div>

  <script src="dist/app.js"></script>
</body>
</html>
```

### 2. style.css

```
:root {
  --bg-dark: #1e1e24;
  --bg-card: #2a2a35;
  --text-main: #f5f5f6;
  --brand: #646cff;
  --accent: #ff4a4a;
  --border: #3f3f50;
}

body {
margin: 0;
min-height: 100vh;
display: grid;
place-items: center;
background-color: var(--bg-dark);
color: var(--text-main);
font-family: system-ui, sans-serif;
}

.card {
background: var(--bg-card);
padding: 2rem;
border-radius: 12px;
border: 1px solid var(--border);
text-align: center;
width: 320px;
}

.display {
font-size: 3.5rem;
font-weight: 700;
color: var(--brand);
margin: 1rem 0;
}

.estado-tag {
display: inline-block;
padding: 0.3rem 0.8rem;
border-radius: 20px;
font-size: 0.85rem;
background-color: var(--border);
margin-bottom: 1.5rem;
}

.acciones {
display: flex;
gap: 0.5rem;
justify-content: center;
}

.btn {
padding: 0.6rem 1rem;
border: none;
border-radius: 6px;
cursor: pointer;
color: white;
font-weight: 600;
}

.btn-primario { background: var(--brand); }
.btn-secundario { background: #4a4a58; }
.btn-alerta { background: var(--accent); }
```

## 3. `src/app.ts`

```
// 1. Tipos literales y variables estrictamente tipadas
type AccionContador = 'incrementar' | 'decrementar' | 'reset';
type EstadoProgreso = 'Positivo' | 'Negativo' | 'En Reposo';

let cuenta: number = 0;

// 2. Selección segura y casteo tipado de elementos del DOM
const displayContador = document.querySelector('#valor-contador') as HTMLSpanElement;
const tagEstado = document.querySelector('#tag-estado') as HTMLDivElement;
const btnInc = document.querySelector('#btn-incrementar') as HTMLButtonElement;
const btnDec = document.querySelector('#btn-decrementar') as HTMLButtonElement;
const btnReset = document.querySelector('#btn-reset') as HTMLButtonElement;

// 3. Funciones con argumentos y retornos tipados
function calcularEstado(valor: number): EstadoProgreso {
    if (valor > 0) return 'Positivo';
    if (valor < 0) return 'Negativo';
    return 'En Reposo';
}

function actualizarDOM(): void {
    displayContador.textContent = cuenta.toString();
    const estado: EstadoProgreso = calcularEstado(cuenta);
    tagEstado.textContent = estado;
    
    if (estado === 'Positivo') tagEstado.style.color = '#4caf50';
    else if (estado === 'Negativo') tagEstado.style.color = '#ff4a4a';
    else tagEstado.style.color = '#f5f5f6';
}

function ejecutarAccion(tipo: AccionContador): void {
    if (tipo === 'incrementar') cuenta++;
    else if (tipo === 'decrementar') cuenta--;
    else cuenta = 0;
    
    actualizarDOM();
}

// 4. Listeners de eventos
btnInc.addEventListener('click', () => ejecutarAccion('incrementar'));
btnDec.addEventListener('click', () => ejecutarAccion('decrementar'));
btnReset.addEventListener('click', () => ejecutarAccion('reset'));
```
# Ejercicio 1.B: Panel de Notificaciones con Delegación de Eventos 🔔
**Contexto**: En aplicaciones web interactivas (y posteriormente en Angular), renderizar botones dinámicos en listas grandes y asociar un addEventListener individual a cada elemento satura la memoria RAM del navegador. La delegación de eventos aprovecha la propagación natural del evento hacia arriba (bubbling) para capturar todas las interacciones desde un único punto de escucha en el elemento contenedor padre.
**Enunciado**: Crea una pequeña aplicación web en TypeScript estricto que gestione un listado de notificaciones. La aplicación debe cumplir los siguientes requisitos:
1. **Estructura de Datos**: Define un tipo literal `type NivelAlerta = 'info' | 'warning' | 'error'` y una interfaz `Notificacion` con las propiedades: `id` (número), `mensaje` (texto), `nivel` (NivelAlerta) y `leida` (booleano).
2. **Optimización de Eventos (Obligatorio)**:
   * Queda totalmente **prohibido** añadir `addEventListener` dentro de bucles o iteradores (`forEach`, `map`) al renderizar las notificaciones.
   * Asigna **un único listener de click en el elemento contenedor padre** (`<main id="contenedor-notificaciones">`.
   * Cada tarjeta de notificación tendrá dos botones identificados mediante atributos de datos HTML (`data-accion="marcar"` y `data-accion="eliminar"`) junto con el `data-id` de la notificación.
3. **Manejo del DOM en TypeScript**: Captura el elemento originario del evento mediante `event.target` usando casteo de tipos explícito (`as HTMLElement` o `as HTMLButtonElement`) para identificar la acción pulsada de forma segura sin utilizar `any`.
4. **Actualización Inmutable**: Al pulsar "Marcar leída" o "Eliminar", modifica el array de datos de forma inmutable (`.map()` o `.filter()`) y redibuja la interfaz.
