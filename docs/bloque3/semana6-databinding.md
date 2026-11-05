# ⚡ Semana 6: Data Binding y Directivas Estructurales Modernas (`@if` / `@for`)

En esta semana exploramos la sincronización bidireccional entre la clase TypeScript y la vista HTML mediante las técnicas de **Data Binding** y las **directivas estructurales modernas** introducidas en las últimas versiones de Angular.

---

## 3.3 Técnicas de Enlazado de Datos (*Data Binding*)

Angular ofrece tres mecanismos fundamentales para comunicar el código de TypeScript con la plantilla HTML:

### 1. Interpolación (`{{ }}`)
Muestra el valor de una propiedad o el resultado de una expresión de TypeScript directamente en la plantilla como texto:

```html
<h1>Bienvenido, {{ usuario.nombre }}</h1>
<p>Total a pagar: {{ precio * 1.21 }} €</p>
```

### 2. Property Binding (`[propiedad]="expresion"`)
Enlaza el valor de una variable de TypeScript a un atributo o propiedad de un elemento del DOM en el HTML (unidireccional: clase ➔ HTML):

```html
<!-- Enlaza el estado deshabilitado de un botón -->
<button [disabled]="formularioInvalido">Enviar Datos</button>

<!-- Enlaza dinámicamente la clase CSS según un booleano -->
<div [class.completada]="tarea.completada">
  {{ tarea.titulo }}
</div>
```

### 3. Event Binding (`(evento)="metodo()"`)
Escucha los eventos del usuario en el DOM y ejecuta métodos definidos en la clase TypeScript (unidireccional: HTML ➔ clase):

```html
<button (click)="guardarTarea()">Guardar</button>
<input type="text" (input)="onInputText($event)">
```

---

## 3.4 Directivas Estructurales Modernas

Las directivas estructurales permiten manipular la estructura del DOM directamente desde la plantilla de forma declarativa.

### Renderizado Condicional: `@if` y `@else`

Sustituye la necesidad de mostrar u ocultar elementos mediante estilos `display: none` o comprobaciones manuales en JS:

```html
@if (cargando) {
  <div class="spinner">Cargando datos del servidor...</div>
} @else if (tareas.length === 0) {
  <p>No hay tareas pendientes en la lista.</p>
} @else {
  <p>Tienes tareas asignadas para el día de hoy.</p>
}
```

### Iteración de Listas: `@for` y `@empty`

Permite recorrer colecciones de datos (arrays de objetos) inyectando nodos HTML en el DOM. Es **obligatorio declarar la cláusula `track`** para permitir a Angular identificar cada elemento de forma única y optimizar el rendimiento de repintado.

```html
<ul>
  @for (tarea of listaTareas; track tarea.id) {
    <li [class.completada]="tarea.completada">
      <span>{{ tarea.titulo }} - <strong>{{ tarea.prioridad }}</strong></span>
      <button (click)="completar(tarea.id)">Completar</button>
    </li>
  } @empty {
    <li class="empty-state">La lista de tareas está completamente vacía.</li>
  }
</ul>
```

---

## 🏋️ Banco de Ejercicios Prácticos (Semana 6)

---

### Ejercicio 6.1: Lista de Tareas Dinámica con `@for` y `@if` (`TaskListComponent`)

**Enunciado:**  
Crea un componente standalone llamado `TaskListComponent` que gestione una lista de tareas dinámica utilizando la interfaz `Tarea` vista en el Bloque 2:

1. Define un array de tareas iniciales `tareas: Tarea[]`.
2. Incluye una propiedad booleana `mostrarSoloPendientes: boolean = false`.
3. En la plantilla HTML, utiliza la sintaxis `@for` con su correspondiente `track tarea.id` para renderizar el listado.
4. Utiliza `@if` para mostrar una etiqueta visual `'[COMPLETADA]'` solo en aquellas tareas cuyo estado `completada` sea `true`.
5. Incluye un botón para conmutar el filtro `mostrarSoloPendientes`.

<details>
<summary>🔍 Haz clic aquí para ver la solución en TypeScript y HTML</summary>

```typescript
import { Component } from '@angular/core';

interface Tarea {
  id: number;
  titulo: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  completada: boolean;
}

@Component({
  selector: 'app-task-list',
  standalone: true,
  template: `
    <div class="task-list-container">
      <h2>Gestor de Tareas 📋</h2>
      
      <button (click)="toggleFiltro()">
        {{ mostrarSoloPendientes ? 'Mostrar Todas' : 'Ver Solo Pendientes' }}
      </button>

      <ul>
        @for (item of tareasObtenidas; track item.id) {
          <li [class.completada]="item.completada">
            <span>{{ item.titulo }} ({{ item.prioridad }})</span>
            @if (item.completada) {
              <span class="badge-done">✓ Completada</span>
            } @else {
              <button (click)="marcarCompletada(item.id)">Completar</button>
            }
          </li>
        } @empty {
          <p>No se encontraron tareas pendientes.</p>
        }
      </ul>
    </div>
  `,
  styles: `
    .task-list-container { background: #1e1e24; padding: 1.5rem; border-radius: 8px; color: white; }
    ul { list-style: none; padding: 0; }
    li { display: flex; justify-content: space-between; padding: 0.75rem; border-bottom: 1px solid #3f3f50; }
    .completada span { text-decoration: line-through; opacity: 0.6; }
    .badge-done { color: #10b981; font-weight: bold; }
  `
})
export class TaskListComponent {
  public mostrarSoloPendientes: boolean = false;

  public tareas: Tarea[] = [
    { id: 1, titulo: 'Configurar Angular CLI', prioridad: 'Alta', completada: true },
    { id: 2, titulo: 'Aprender sintaxis @for y @if', prioridad: 'Alta', completada: false },
    { id: 3, titulo: 'Diseñar interfaz con CSS', prioridad: 'Baja', completada: false }
  ];

  public get tareasObtenidas(): Tarea[] {
    if (this.mostrarSoloPendientes) {
      return this.tareas.filter(t => !t.completada);
    }
    return this.tareas;
  }

  public toggleFiltro(): void {
    this.mostrarSoloPendientes = !this.mostrarSoloPendientes;
  }

  public marcarCompletada(id: number): void {
    this.tareas = this.tareas.map(t => t.id === id ? { ...t, completada: true } : t);
  }
}
```

</details>
