### 🎨 Semana 15 y 16: Angular Material & Angular Signals

::: info La Frontera Moderna de Angular
En esta unidad final del curso exploramos dos pilares de la arquitectura profesional en Angular:
1. **Angular Material:** La librería oficial de componentes UI listos para producción.
2. **Angular Signals:** El nuevo sistema reactivo que simplifica la gestión del estado sin necesidad de suscripciones complejas.
:::

---

#### 1. UI Profesional con Angular Material

##### Instalación en el proyecto:
```bash
ng add @angular/material
```

##### Uso de Componentes Material en Standalone:
Para utilizar componentes de Material (como campos de texto, tablas, diálogos o botones), importamos sus módulos directamente en el componente:

```typescript
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-material-demo',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatSnackBarModule],
  template: `
    <mat-card class="demo-card">
      <mat-card-header>
        <mat-card-title>Angular Material UI 🎨</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <p>Componentes accesibles y estilizados de forma nativa.</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" (click)="mostrarAviso()">
          <mat-icon>check_circle</mat-icon> Notificar
        </button>
      </mat-card-actions>
    </mat-card>
  `
})
export class MaterialDemoComponent {
  constructor(private snackBar: MatSnackBar) {}

  public mostrarAviso(): void {
    this.snackBar.open('¡Acción completada con éxito!', 'Cerrar', { duration: 3000 });
  }
}
```

---

#### 2. Angular Signals: Reactividad de Última Generación

Un **Signal** es un contenedor reactivo que notifica automáticamente a la vista cuando su valor cambia, eliminando la necesidad de gestionar manualmente suscripciones u Observables para el estado local.

##### 1. Crear e Incrementar un Signal (`signal()`):
```typescript
import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-counter-signal',
  standalone: true,
  template: `
    <div class="card">
      <h3>Contador con Signals: {{ contador() }}</h3>
      <button (click)="incrementar()">+1</button>
      <button (click)="decrementar()">-1</button>
      <button (click)="resetear()">Reset</button>
    </div>
  `
})
export class CounterSignalComponent {
  // Declaración del Signal reactivo
  public contador: WritableSignal<number> = signal(0);

  public incrementar(): void {
    this.contador.update(v => v + 1);
  }

  public decrementar(): void {
    this.contador.update(v => v - 1);
  }

  public resetear(): void {
    this.contador.set(0);
  }
}
```

##### 2. Señales Derivadas (`computed()`) y Efectos (`effect()`):
```typescript
import { Component, signal, computed, effect } from '@angular/core';
import { Tarea } from '../interfaces/tarea.interface';

@Component({
  selector: 'app-task-signals',
  standalone: true,
  template: `
    <h2>Gestión de Tareas con Signals 🚦</h2>
    <p>Total Tareas: {{ totalTareas() }} | Completadas: {{ totalCompletadas() }}</p>
  `
})
export class TaskSignalsComponent {
  public tareas = signal<Tarea[]>([
    { id: 1, titulo: 'Diseñar interfaz Material', prioridad: 'Alta', completada: true },
    { id: 2, titulo: 'Migrar estado a Signals', prioridad: 'Alta', completada: false }
  ]);

  // Computed: Se recalcula automáticamente solo cuando el signal 'tareas' cambia
  public totalTareas = computed(() => this.tareas().length);
  public totalCompletadas = computed(() => this.tareas().filter(t => t.completada).length);

  constructor() {
    // Effect: Ejecuta código ante cualquier cambio de estado (ideal para persistencia o logs)
    effect(() => {
      console.log(`Estado actualizado. Tareas totales: ${this.totalTareas()}`);
    });
  }
}
```

---

#### 🏁 Resumen del Proyecto Final (2.º Trimestre)

Para superar la evaluación del segundo trimestre, los alumnos entregarán la **Fase Final de DevTask Pro**, integrando:
1. **Enrutamiento SPA** con protección de rutas (`Guards`).
2. **Consumo de API REST** mediante `HttpClient`.
3. **Formulario Reactivo** con validación estricta de campos.
4. **Diseño e Interfaz** con componentes de **Angular Material**.
5. **Gestión de Estado** reactivo mediante **Angular Signals**.
