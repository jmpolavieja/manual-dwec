# 🔄 Semana 7: Paso de Datos entre Componentes y Servicios Centralizados

En esta semana aprendemos a estructurar aplicaciones web modulares dividiendo la interfaz en componentes padre/hijo y aislando la lógica de datos mediante **servicios centralizados e Inyección de Dependencias**.

---

## 3.5 Comunicación entre Componentes (`@Input()` y `@Output()`)

Cuando una interfaz se compone de múltiples elementos reutilizables, los componentes necesitan comunicarse entre sí de forma estructurada.

### Paso de Datos Descendente: `@Input()`
Permite que un componente padre le pase información a un componente hijo mediante propiedades binding:

```typescript
// Componente Hijo: TaskItemComponent
import { Component, Input } from '@angular/core';
import { Tarea } from '../interfaces/tarea.interface';

@Component({
  selector: 'app-task-item',
  standalone: true,
  template: `
    <div class="item-card">
      <h4>{{ tareaInput.titulo }}</h4>
      <span>Prioridad: {{ tareaInput.prioridad }}</span>
    </div>
  `
})
export class TaskItemComponent {
  // Recibe la tarea desde el componente padre
  @Input({ required: true }) tareaInput!: Tarea;
}
```

Uso desde la plantilla del **Componente Padre**:
```html
<app-task-item [tareaInput]="miTarea"></app-task-item>
```

### Notificación Ascendente: `@Output()` y `EventEmitter`
Permite que un componente hijo notifique acciones o eventos al componente padre para que este reaccione:

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-item',
  standalone: true,
  template: `
    <div>
      <span>{{ tareaInput.titulo }}</span>
      <button (click)="notificarBorrado()">Eliminar</button>
    </div>
  `
})
export class TaskItemComponent {
  @Input({ required: true }) tareaInput!: Tarea;
  
  // Emisor de eventos hacia el padre
  @Output() onEliminar = new EventEmitter<number>();

  public notificarBorrado(): void {
    this.onEliminar.emit(this.tareaInput.id);
  }
}
```

Escucha desde la plantilla del **Componente Padre**:
```html
<app-task-item 
  [tareaInput]="tarea" 
  (onEliminar)="eliminarTareaEnPadre($event)">
</app-task-item>
```

---

## 3.6 Servicios e Inyección de Dependencias

Un **Servicio** es una clase dedicada a centralizar la lógica de negocio, la comunicación con APIs externas y el estado global de los datos, liberando a los componentes de esa responsabilidad.

### Creación de un Servicio con Angular CLI

```bash
ng generate service services/task
```

### Ejemplo de Servicio Centralizado (`TaskService`)

```typescript
import { Injectable } from '@angular/core';
import { Tarea } from '../interfaces/tarea.interface';

@Injectable({
  providedIn: 'root' // Disponible globalmente en toda la app
})
export class TaskService {
  private tareas: Tarea[] = [
    { id: 1, titulo: 'Instalar Angular CLI', prioridad: 'Alta', completada: true },
    { id: 2, titulo: 'Crear servicio centralizado', prioridad: 'Media', completada: false }
  ];

  public obtenerTareas(): ReadonlyArray<Tarea> {
    return this.tareas;
  }

  public agregarTarea(nuevaTarea: Tarea): void {
    this.tareas = [...this.tareas, nuevaTarea];
  }

  public eliminarTarea(id: number): void {
    this.tareas = this.tareas.filter(t => t.id !== id);
  }
}
```

### Inyección de Dependencias en el Constructor

Los componentes consumen los servicios inyectándolos directamente desde su constructor:

```typescript
import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-main',
  standalone: true,
  template: `
    @for (t of taskService.obtenerTareas(); track t.id) {
      <p>{{ t.titulo }}</p>
    }
  `
})
export class TaskMainComponent {
  // Inyección de dependencias usando el atajo del constructor
  constructor(public taskService: TaskService) {}
}
```

---

## 🏋️ Banco de Ejercicios Prácticos (Semana 7)

---

### Ejercicio 7.1: Servicio Centralizado y Componente Consumidor (`TaskService` + `TaskMainComponent`)

**Enunciado:**  
1. Crea un servicio `TaskService` que mantenga una lista de tareas privada y exponga métodos inmutables para obtener (`getTareas()`), agregar (`addTarea()`) y alternar el estado (`toggleTarea()`).
2. Crea un componente `TaskMainComponent` que inyecte el servicio en su constructor y renderice la lista de tareas con la sintaxis de directivas estructurales moderna.

<details>
<summary>🔍 Haz clic aquí para ver la solución en TypeScript</summary>

#### Archivo 1: `src/app/services/task.service.ts`
```typescript
import { Injectable } from '@angular/core';

export interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tareas: Tarea[] = [
    { id: 101, titulo: 'Aprender Inyección de Dependencias', completada: false },
    { id: 102, titulo: 'Crear primer servicio Angular', completada: true }
  ];

  public getTareas(): ReadonlyArray<Tarea> {
    return this.tareas;
  }

  public addTarea(titulo: string): void {
    const nueva: Tarea = { id: Date.now(), titulo, completada: false };
    this.tareas = [...this.tareas, nueva];
  }

  public toggleTarea(id: number): void {
    this.tareas = this.tareas.map(t => t.id === id ? { ...t, completada: !t.completada } : t);
  }
}
```

#### Archivo 2: `src/app/components/task-main.component.ts`
```typescript
import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-task-main',
  standalone: true,
  template: `
    <div class="panel">
      <h2>Panel Centralizado de Tareas 🚀</h2>
      
      <div class="form">
        <input #inputTitulo type="text" placeholder="Nueva tarea...">
        <button (click)="agregar(inputTitulo.value); inputTitulo.value = ''">Añadir</button>
      </div>

      <ul>
        @for (t of taskService.getTareas(); track t.id) {
          <li>
            <span [style.text-decoration]="t.completada ? 'line-through' : 'none'">
              {{ t.titulo }}
            </span>
            <button (click)="taskService.toggleTarea(t.id)">
              {{ t.completada ? 'Reabrir' : 'Completar' }}
            </button>
          </li>
        }
      </ul>
    </div>
  `,
  styles: `
    .panel { background: #18181b; padding: 1.5rem; border-radius: 8px; color: white; }
    .form { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
    input { flex: 1; padding: 0.5rem; border-radius: 4px; border: 1px solid #3f3f46; background: #27272a; color: white; }
    button { padding: 0.5rem 1rem; background: #6366f1; border: none; color: white; border-radius: 4px; cursor: pointer; }
    ul { list-style: none; padding: 0; }
    li { display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #27272a; }
  `
})
export class TaskMainComponent {
  constructor(public taskService: TaskService) {}

  public agregar(titulo: string): void {
    if (titulo.trim()) {
      this.taskService.addTarea(titulo.trim());
    }
  }
}
```

</details>
