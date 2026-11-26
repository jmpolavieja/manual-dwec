### 🦅 Práctica Evaluativa del Bloque 3: Panel de Monitorización de Servidores (`ServerTracker`)

::: info 
Evaluación Práctica de Competencias — Bloque 3
Esta práctica evalúa la capacidad del alumno para estructurar una aplicación modular con **Angular Standalone**, crear componentes desacoplados, aplicar enlazado de datos (*Data Binding*), manejar directivas estructurales modernas (`@if`, `@for`) y gestionar el estado local mediante un servicio centralizado.
:::

---

## 🎯 Objetivo de la Práctica

Desarrollar la aplicación **ServerTracker**, un panel interactivo que permite visualizar y cambiar en tiempo real el estado operacional de un conjunto de servidores corporativos, así como dar de alta nuevos nodos en el sistema.

---

## 📐 Requisitos Técnicos Obligatorios

### 1. Modelado de Datos e Interfaces (`src/app/interfaces/server.interface.ts`)
* Define el tipo literal: `export type ServerStatus = 'online' | 'offline' | 'maintenance';`
* Define la interfaz `Server` con las propiedades:
  * `readonly id: number` (generado mediante timestamp).
  * `nombre: string`
  * `ip: string`
  * `estado: ServerStatus`
  * `cpuUsage: number` (porcentaje entre 0 y 100).

### 2. Servicio Centralizado (`src/app/services/server.service.ts`)
* Debe estar decorado con `@Injectable({ providedIn: 'root' })`.
* Encapsular como propiedad privada la lista de servidores (`private servers: Server[]`).
* Exponer métodos públicos:
  * `getServers(): ReadonlyArray<Server>`: Retorna la lista de servidores protegida contra mutaciones directas.
  * `addServer(nombre: string, ip: string): void`: Construye un nuevo objeto `Server` y lo añade al array de forma inmutable (utilizando el operador spread `[...]`).
  * `toggleStatus(id: number): void`: Alterna secuencialmente el estado de un servidor (`online` ➔ `maintenance` ➔ `offline` ➔ `online`) utilizando `.map()` inmutable.

### 3. Componente Hijo (`src/app/components/server-card.component.ts`)
* Es un componente standalone dedicado a renderizar la tarjeta individual de un servidor.
* **Entrada (`@Input`):** Recibe la propiedad `server!: Server` (obligatoria).
* **Salida (`@Output`):** Declara un `statusChange = new EventEmitter<number>()` para notificar al padre cuando el usuario pulsa el botón de cambiar estado.

### 4. Componente Padre / Contenedor (`src/app/components/server-dashboard.component.ts`)
* Inyecta `ServerService` a través de su constructor.
* Renderiza la plantilla principal con:
  * Formulario de alta para añadir nuevos servidores (capturando nombre e IP).
  * Bloque de estadísticas globales utilizando la directiva condicional **`@if`**.
  * Bucle declarativo **`@for`** para iterar sobre la lista de servidores e instanciar un `<app-server-card>` por cada uno, escuchando el evento `(statusChange)`.

---

## 📊 Rúbrica de Calificación (10 Puntos)

| Criterio | Puntuación | Descripción |
| :--- | :---: | :--- |
| **Modelado e Interfaces** | 1.5 pts | Definición correcta del tipo literal y de la interfaz con propiedades inmutables. |
| **Servicio & Inmutabilidad** | 2.5 pts | Propiedades privadas, métodos inmutables (`map`, `spread`) sin mutar el array original. |
| **Comunicación `@Input` / `@Output`** | 2.5 pts | Desacoplamiento correcto entre el componente tarjeta (hijo) y el panel (padre). |
| **Directivas `@if` y `@for`** | 2.0 pts | Renderizado dinámico de la lista con `track` y manejo condicional de vacíos o estadísticas. |
| **Limpieza y Tipado Estricto** | 1.5 pts | Ausencia total del tipo `any`, uso de modificadores `public`/`private` y buena presentación. |

---

## 📄 Plantilla para el Alumno (Pistas y Guía de Implementación)

### 1. `src/app/interfaces/server.interface.ts`

```typescript
// TODO 1: Definir la unión de tipos literales 'ServerStatus'
// PISTA: Solo debe admitir las cadenas 'online', 'offline' o 'maintenance'.
export type ServerStatus = any;

// TODO 2: Definir la interfaz 'Server'
// PISTA: Asegúrate de declarar el 'id' como readonly.
export interface Server {
  // TODO: Escribe aquí la estructura de la interfaz
}
```

---

### 2. `src/app/services/server.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { Server, ServerStatus } from '../interfaces/server.interface';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  // TODO 3: Declarar e inicializar el array privado de servidores
  // PISTA: Crea 2 o 3 servidores de prueba iniciales.
  private servers: Server[] = [];

  // TODO 4: Crear el método público 'getServers()'
  // PISTA: Debe retornar ReadonlyArray<Server> o una copia del array.
  public getServers(): ReadonlyArray<Server> {
    // TODO: Retorna la lista protegida
    return [];
  }

  // TODO 5: Crear el método público 'addServer(nombre: string, ip: string): void'
  // PISTA: Genera un id único con Date.now(), asigna 'online' por defecto y usa [...this.servers, nuevo]
  public addServer(nombre: string, ip: string): void {
    // TODO: Implementa la adición inmutable
  }

  // TODO 6: Crear el método público 'toggleStatus(id: number): void'
  // PISTA: Recorre la lista con .map(). Si el id coincide, cambia su estado en una rotación:
  // 'online' -> 'maintenance' -> 'offline' -> 'online'.
  public toggleStatus(id: number): void {
    // TODO: Implementa la actualización de estado inmutable
  }
}
```

---

### 3. `src/app/components/server-card.component.ts`

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Server } from '../interfaces/server.interface';

@Component({
  selector: 'app-server-card',
  standalone: true,
  template: `
    <!-- TODO 7: Maquetar la tarjeta visual del servidor -->
    <!-- PISTA 1: Muestra el nombre, la IP, el estado y el uso de CPU ({{ server.cpuUsage }}%) -->
    <!-- PISTA 2: Añade un botón que al pulsar invoque al método 'onToggleClick()' -->
    <div class="card">
      <!-- TODO: Estructura HTML de la tarjeta -->
    </div>
  `
})
export class ServerCardComponent {
  // TODO 8: Declarar la entrada requerida @Input()
  // PISTA: Utiliza @Input({ required: true }) server!: Server;

  // TODO 9: Declarar la salida @Output()
  // PISTA: const statusChange = new EventEmitter<number>();

  // TODO 10: Crear el método que notifica la acción al padre
  public onToggleClick(): void {
    // PISTA: Emite el ID del servidor mediante este.statusChange.emit(...)
  }
}
```

---

### 4. `src/app/components/server-dashboard.component.ts`

```typescript
import { Component } from '@angular/core';
import { ServerService } from '../services/server.service';
import { ServerCardComponent } from './server-card.component';
import { Server } from '../interfaces/server.interface';

@Component({
  selector: 'app-server-dashboard',
  standalone: true,
  imports: [ServerCardComponent],
  template: `
    <div class="dashboard-container">
      <h2>Panel de Control ServerTracker 🖥️</h2>

      <!-- TODO 11: Formulario para añadir servidor -->
      <!-- PISTA: Utiliza variables de referencia local (#inputNombre, #inputIp) en los elementos HTML -->

      <!-- TODO 12: Renderizado dinámico con directivas estructurales -->
      <!-- PISTA 1: Utiliza @if (servers.length === 0) para mostrar un mensaje si no hay servidores -->
      <!-- PISTA 2: Utiliza @for (server of servers; track server.id) para instanciar <app-server-card> -->
      <!-- PISTA 3: Escucha el evento del hijo: (statusChange)="handleStatusChange($event)" -->
    </div>
  `
})
export class ServerDashboardComponent {
  // TODO 13: Inyectar 'ServerService' en el constructor
  constructor(
    // PISTA: private serverService: ServerService
  ) {}

  // TODO 14: Crear getter o propiedad para obtener la lista actualizada de servidores
  get servers(): ReadonlyArray<Server> {
    return []; // PISTA: Conecta con this.serverService.getServers()
  }

  // TODO 15: Crear el método para manejar el alta desde el formulario
  public handleAdd(nombre: string, ip: string): void {
    // PISTA: Valida que los campos no estén vacíos e invoca a serverService.addServer(...)
  }

  // TODO 16: Crear el método para delegar el cambio de estado
  public handleStatusChange(id: number): void {
    // PISTA: Invoca a serverService.toggleStatus(id)
  }
}
```
