# Bloque 3: Inmersión en Angular Standalone

::: info ¿Por qué llegamos por fin a Angular?
En las fases anteriores has aprendido a manejar datos de forma inmutable y a estructurarlos dentro de clases limpias con TypeScript. Sin embargo, has tenido que seguir escribiendo código pesado para el DOM (`document.createElement`, `appendChild`, etc.).

**Angular** es un framework declarativo. A partir de ahora, tú te centrarás exclusivamente en gestionar los datos en tu archivo de TypeScript, y Angular se encargará por detrás de sincronizar y pintar el HTML de forma automática y ultrarrápida.
:::

---

## Semana 5 y 6: Arquitectura y Componentes Standalone

### 3.1 Creación del Entorno con Angular CLI
Angular automatiza la creación de archivos y configuraciones a través de su terminal de comandos.

```bash
# 1. Instalación global de las herramientas de Angular
npm install -g @angular/cli

# 2. Crear un nuevo espacio de trabajo estructurado
ng new devtask-angular --standalone --style=css

# 3. Arrancar el servidor de desarrollo en tiempo real
cd devtask-angular
ng serve
```

### 3.2 Anatomía de un Componente Standalone
Un componente es una porción de la página web que encapsula su propia lógica (TS), su propia vista (HTML) y sus propios estilos (CSS).

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-task-row',
  standalone: true, // No requiere NgModules antiguos
  template: `
    <div class="task-card">
      <h3>{{ tituloTarea }}</h3>
      <button (click)="marcarAsDone()">Completar</button>
    </div>
  `,
  styles: `.task-card { background: #222; padding: 1rem; border-radius: 4px; }`
})
export class TaskRowComponent {
  // Propiedad tipada (Concepto heredado del Bloque 2)
  public tituloTarea: string = 'Refactorizar código fuente';

  // Método de clase (Concepto heredado del Bloque 2)
  public marcarAsDone(): void {
    console.log(`Tarea completada`);
  }
}
```

---

## Semana 7: El Taller Práctico de Angular (Paso de Datos y Servicios)

Antes de pasar a la entrega final, dedicaremos esta semana a realizar dos ejercicios guiados en el aula para aprender cómo se comunican los componentes entre sí.

### Ejercicio Dirigido 1: Comunicación `@Input()` y `@Output()`
Aprenderemos a dividir la interfaz enviando datos desde un componente padre (el panel general) hacia un componente hijo (la fila de la tarea) mediante el decorador `@Input()`, y a notificar acciones de vuelta con `@Output()`.

### Ejercicio Dirigido 2: Introducción a los Servicios (`ng generate service`)
Aislaremos el array de datos fuera de los componentes y crearemos un archivo de **Servicio** encargado de centralizar la lógica, simulando una inyección de dependencias en el constructor mediante el cliente HTTP de Angular.
