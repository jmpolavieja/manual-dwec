# Ejercicios prácticos:

Cada ejercicio es autónomo e incluye la *estructura de carpetas*, la configuración estricta de compilación
(`tsconfig.json`), la plantilla `index.html` enlazada al archivo transpilado en `dist/app.js`, la hoja de estilos 'style.css` y el código fuente TypeScript (`src/app.ts`) sin uso de any.

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

# Ejercicio 2: Tarjetero de Usuarios (Interfaces, Modificación Inmutable y Renderizado)
**Objetivo**: Modelar datos con una interface, manejar propiedades opcionales (?), uniones de roles literales y renderizar listas inmutables actualizadas en el DOM.
## Estructura del Proyecto
```
ejercicio2-usuarios/
├── dist/
├── src/
│   ├── interfaces/
│   │   └── usuario.interface.ts
│   └── app.ts
├── index.html
├── style.css
└── tsconfig.json
```
## 1. src/interfaces/usuario.interface.ts
```
// ============================================================================
// EJERCICIO 2: LÓGICA Y MANEJO DEL DOM (Interfaces y Estado Inmutable)
// ============================================================================
export type RolUsuario = 'admin' | 'editor' | 'alumno';

// ----------------------------------------------------------------------------
// 1. ESTADO INICIAL DE LA APLICACIÓN
// ----------------------------------------------------------------------------

// TODO 1: Declarar el array 'usuarios' con tipado estricto 'Usuario[]'
// PISTA: Inicialízalo con 2 objetos que cumplan estrictamente con la interfaz Usuario.
let usuarios: Usuario[] = [
  // TODO: Agrega aquí los objetos iniciales de prueba
];
```
::: details 💡 Ver Solución del Ejercicio

export interface Usuario {
  readonly id: number;
  nombre: string;
  email: string;
  rol: RolUsuario;
  activo: boolean;
  biografia?: string; // Propiedad opcional
}
:::
```
## 2. index.html
```
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ejercicio 2 - Directorio de Usuarios</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <header>
      <h1>Directorio de Usuarios 👥</h1>
      <p>Gestión de roles e inmutabilidad con TypeScript</p>
    </header>
    <form id="form-usuario" class="card-form">
      <input type="text" id="input-nombre" placeholder="Nombre completo" required>
      <input type="email" id="input-email" placeholder="Correo electrónico" required>
      <select id="select-rol">
        <option value="alumno">Alumno</option>
        <option value="editor">Editor</option>
        <option value="admin">Admin</option>
      </select>
      <input type="text" id="input-bio" placeholder="Biografía (opcional)">
      <button type="submit" class="btn-submit">Dar de Alta</button>
    </form>
    <main id="lista-usuarios" class="grid-usuarios">
      <!-- Inyección dinámica -->
    </main>
  </div>

  <script src="dist/app.js"></script>
</body>
</html>
```
## 3. style.css
```
:root {
  --bg-main: #18181b;
  --bg-card: #27272a;
  --text-primary: #f4f4f5;
  --text-muted: #a1a1aa;
  --brand: #6366f1;
  --border: #3f3f46;
}

body {
  margin: 0;
  padding: 2rem;
  background-color: var(--bg-main);
  color: var(--text-primary);
  font-family: system-ui, sans-serif;
}

.container {
  max-width: 700px;
  margin: 0 auto;
}

.card-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  background: var(--bg-card);
  padding: 1.25rem;
  border-radius: 8px;
  border: 1px solid var(--border);
  margin-bottom: 2rem;
}

.card-form input, .card-form select, .card-form button {
  padding: 0.6rem;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: #18181b;
  color: white;
}

.card-form button {
  grid-column: span 2;
  background: var(--brand);
  cursor: pointer;
  font-weight: bold;
}

.grid-usuarios {
  display: grid;
  gap: 1rem;
}

.user-card {
  background: var(--bg-card);
  padding: 1rem 1.25rem;
  border-radius: 8px;
  border-left: 4px solid var(--brand);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  text-transform: uppercase;
  font-weight: 700;
}

.badge-admin { background: #ef4444; }
.badge-editor { background: #f59e0b; color: black; }
.badge-alumno { background: #10b981; }

.btn-toggle {
  background: transparent;
  border: 1px solid var(--border);
  color: white;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  cursor: pointer;
}
```
## 4. src/app.ts
``` TypeScript
type RolUsuario = 'admin' | 'editor' | 'alumno';

interface Usuario {
  readonly id: number;
  nombre: string;
  email: string;
  rol: RolUsuario;
  activo: boolean;
  biografia?: string;
}

// 1. Estado inicial inmutable
let usuarios: Usuario[] = [
  { id: 1, nombre: 'Ana Gómez', email: 'ana@altair.es', rol: 'admin', activo: true, biografia: 'Coordinadora DWEC' },
  { id: 2, nombre: 'Carlos Ruiz', email: 'carlos@altair.es', rol: 'alumno', activo: false }
];

// 2. Selectores del DOM
const form = document.querySelector('#form-usuario') as HTMLFormElement;
const inputNombre = document.querySelector('#input-nombre') as HTMLInputElement;
const inputEmail = document.querySelector('#input-email') as HTMLInputElement;
const selectRol = document.querySelector('#select-rol') as HTMLSelectElement;
const inputBio = document.querySelector('#input-bio') as HTMLInputElement;
const contenedorUsuarios = document.querySelector('#lista-usuarios') as HTMLElement;

// 3. Renderizado funcional
function renderizarUsuarios(): void {
  contenedorUsuarios.replaceChildren();

  usuarios.forEach((user: Usuario) => {
    const card = document.createElement('article');
    card.className = 'user-card';

    card.innerHTML = `
      <div>
        <strong>${user.nombre}</strong> <span class="badge badge-${user.rol}">${user.rol}</span>
        <div style="color: #a1a1aa; font-size: 0.9rem;">${user.email}</div>
        ${user.biografia ? `<small style="font-style: italic;">"${user.biografia}"</small>` : ''}
      </div>
      <button class="btn-toggle" data-id="${user.id}">
        ${user.activo ? '🟢 Activo' : '⚪ Inactivo'}
      </button>
    `;

    contenedorUsuarios.appendChild(card);
  });
}

// 4. Modificación inmutable del estado
function alternarEstadoUsuario(id: number): void {
  usuarios = usuarios.map((user: Usuario) => 
    user.id === id ? { ...user, activo: !user.activo } : user
  );
  renderizarUsuarios();
}

// 5. Manejo de Eventos
form.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();

  const nuevoUsuario: Usuario = {
    id: Date.now(),
    nombre: inputNombre.value.trim(),
    email: inputEmail.value.trim(),
    rol: selectRol.value as RolUsuario,
    activo: true,
    ...(inputBio.value.trim() ? { biografia: inputBio.value.trim() } : {})
  };

  // Añadir de forma inmutable con operador spread
  usuarios = [...usuarios, nuevoUsuario];
  form.reset();
  renderizarUsuarios();
});

// Delegación de eventos en el contenedor padre
contenedorUsuarios.addEventListener('click', (e: MouseEvent) => {
  const target = e.target as HTMLElement;
  if (target.classList.contains('btn-toggle')) {
    const id = Number(target.dataset.id);
    alternarEstadoUsuario(id);
  }
});

renderizarUsuarios();
```
# Ejercicio 3: Calculadora de Presupuestos (POO, Modificadores de Acceso y Atajo en Constructor)
**Objetivo**: Aplicar Programación Orientada a Objetos (POO), encapsulación con `private/public` y el atajo de parámetros del constructor de TypeScript, anticipando la arquitectura de componentes y servicios que se usará en Angular.
```
Estructura del Proyecto
ejercicio3-presupuestos/
├── dist/
├── src/
│   ├── models/
│   │   ├── ItemPresupuesto.ts
│   │   └── GestorPresupuestos.ts
│   └── app.ts
├── index.html
├── style.css
└── tsconfig.json
```
## 1. src/models/ItemPresupuesto.ts
```
export class ItemPresupuesto {
  // Atajo de parámetros de TypeScript: declara e inicializa automáticamente
  constructor(
    public readonly concepto: string,
    private precioBase: number,
    private porcentajeIVA: number = 0.21
  ) {}

  public obtenerSubtotal(): number {
    return this.precioBase;
  }

  public obtenerTotal(): number {
    return this.precioBase * (1 + this.porcentajeIVA);
  }

  public obtenerIVA(): number {
    return this.precioBase * this.porcentajeIVA;
  }
}
```
## 2. src/models/GestorPresupuestos.ts
```
import { ItemPresupuesto } from './ItemPresupuesto';

export class GestorPresupuestos {
  // Encapsulación estricta: datos protegidos contra mutación externa
  private items: ItemPresupuesto[] = [];

  public agregarItem(item: ItemPresupuesto): void {
    this.items = [...this.items, item];
  }

  public obtenerItems(): ReadonlyArray<ItemPresupuesto> {
    return this.items;
  }

  public calcularTotalGlobal(): number {
    return this.items.reduce((total, item) => total + item.obtenerTotal(), 0);
  }

  public vaciar(): void {
    this.items = [];
  }
}
```
## 3. index.html
```
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ejercicio 3 - Calculadora de Presupuestos POO</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="app-card">
    <h2>Cotizador de Proyectos 💻</h2>
    <p class="subtitle">Estructurado con Clases y Encapsulación (POO)</p>

    <form id="form-item">
      <input type="text" id="input-concepto" placeholder="Servicio (ej. Maquetación CSS)" required>
      <input type="number" id="input-precio" placeholder="Precio Base (€)" min="1" step="any" required>
      <select id="select-iva">
        <option value="0.21">IVA General (21%)</option>
        <option value="0.10">IVA Reducido (10%)</option>
        <option value="0.04">IVA Superreducido (4%)</option>
      </select>
      <button type="submit" class="btn-add">Añadir Concepto</button>
    </form>

    <table class="tabla-presupuesto">
      <thead>
        <tr>
          <th>Concepto</th>
          <th>Base</th>
          <th>IVA</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody id="cuerpo-tabla">
        <!-- Inyección dinámica -->
      </tbody>
    </table>

    <div class="total-box">
      <span>Total Presupuestado:</span>
      <strong id="total-global">0.00 €</strong>
    </div>
  </div>

  <script src="dist/app.js"></script>
</body>
</html>
```
## 4. style.css
```
body {
  margin: 0;
  padding: 2rem;
  background-color: #121214;
  color: #e1e1e6;
  font-family: system-ui, sans-serif;
  display: flex;
  justify-content: center;
}

.app-card {
  background: #202024;
  padding: 2rem;
  border-radius: 8px;
  width: 100%;
  max-width: 650px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.5);
}

.subtitle {
  color: #8d8d99;
  margin-top: -0.5rem;
  margin-bottom: 1.5rem;
}

form {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr auto;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

input, select, button {
  padding: 0.6rem;
  background: #121214;
  border: 1px solid #323238;
  color: white;
  border-radius: 4px;
}

.btn-add {
  background: #00875f;
  border: none;
  font-weight: bold;
  cursor: pointer;
}

.tabla-presupuesto {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.tabla-presupuesto th, .tabla-presupuesto td {
  padding: 0.75rem;
  border-bottom: 1px solid #323238;
}

.tabla-presupuesto th {
  color: #8d8d99;
  font-size: 0.85rem;
}

.total-box {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #121214;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  border-left: 4px solid #00875f;
}
```
## 5. src/app.ts;
```
class ItemPresupuesto {
  constructor(
    public readonly concepto: string,
    private precioBase: number,
    private porcentajeIVA: number = 0.21
  ) {}

  public obtenerSubtotal(): number {
    return this.precioBase;
  }

  public obtenerTotal(): number {
    return this.precioBase * (1 + this.porcentajeIVA);
  }

  public obtenerIVA(): number {
    return this.precioBase * this.porcentajeIVA;
  }
}

class GestorPresupuestos {
  private items: ItemPresupuesto[] = [];

  public agregarItem(item: ItemPresupuesto): void {
    this.items = [...this.items, item];
  }

  public obtenerItems(): ReadonlyArray<ItemPresupuesto> {
    return this.items;
  }

  public calcularTotalGlobal(): number {
    return this.items.reduce((total, item) => total + item.obtenerTotal(), 0);
  }
}

// Inicialización de la clase gestora
const gestor = new GestorPresupuestos();

// Selectores del DOM
const form = document.querySelector('#form-item') as HTMLFormElement;
const inputConcepto = document.querySelector('#input-concepto') as HTMLInputElement;
const inputPrecio = document.querySelector('#input-precio') as HTMLInputElement;
const selectIVA = document.querySelector('#select-iva') as HTMLSelectElement;
const tablaCuerpo = document.querySelector('#cuerpo-tabla') as HTMLTableSectionElement;
const displayTotal = document.querySelector('#total-global') as HTMLElement;

function actualizarVista(): void {
  tablaCuerpo.replaceChildren();

  gestor.obtenerItems().forEach((item: ItemPresupuesto) => {
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${item.concepto}</td>
      <td>${item.obtenerSubtotal().toFixed(2)} €</td>
      <td>${item.obtenerIVA().toFixed(2)} €</td>
      <td><strong>${item.obtenerTotal().toFixed(2)} €</strong></td>
    `;
    tablaCuerpo.appendChild(fila);
  });

  displayTotal.textContent = `${gestor.calcularTotalGlobal().toFixed(2)} €`;
}

form.addEventListener('submit', (e: SubmitEvent) => {
  e.preventDefault();

  const concepto = inputConcepto.value.trim();
  const precio = parseFloat(inputPrecio.value);
  const iva = parseFloat(selectIVA.value);

  if (!concepto || isNaN(precio) || precio <= 0) return;

  // Instanciación tipada de la clase
  const nuevoItem = new ItemPresupuesto(concepto, precio, iva);
  gestor.agregarItem(nuevoItem);

  form.reset();
  inputConcepto.focus();
  actualizarVista();
});
```