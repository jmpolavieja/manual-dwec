### 🌐 Semana 11 y 12: Consumo de APIs REST con HttpClient y RxJS

::: info De Arrays en Memoria a Servidores Remotos
Hasta ahora nuestros servicios manejaban arrays locales de tareas. En el entorno real, las aplicaciones web consumen **APIs REST** enviando peticiones HTTP (GET, POST, PUT, DELETE) e interactuando con bases de datos remotas de forma asíncrona mediante **Observables de RxJS**.
:::

---

#### 1. Configuración del Cliente HTTP (`provideHttpClient`)

Para poder inyectar el servicio `HttpClient` en cualquier parte de la aplicación, primero debemos registrar el proveedor en `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient() // Habilita HttpClient en toda la aplicación
  ]
};
```

---

#### 2. Creación de un Servicio HTTP (`TaskApiService`)

Creamos un servicio encargado de realizar las llamadas asíncronas a la API backend:

```typescript
// src/app/services/task-api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Tarea } from '../interfaces/tarea.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskApiService {
  private readonly endpoint = '/api/tareas';

  constructor(private http: HttpClient) {}

  // Petición GET: Obtener listado de tareas
  public obtenerTareas(): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(this.endpoint).pipe(
      catchError(error => {
        console.error('Error al recuperar tareas:', error);
        return throwError(() => new Error('No se pudo conectar con el servidor.'));
      })
    );
  }

  // Petición POST: Guardar una nueva tarea
  public crearTarea(nuevaTarea: Omit<Tarea, 'id'>): Observable<Tarea> {
    return this.http.post<Tarea>(this.endpoint, nuevaTarea);
  }

  // Petición DELETE: Borrar tarea por ID
  public borrarTarea(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
```

---

#### 3. Consumo de Observables en el Componente

Existen dos estrategias principales para consumir datos devueltos por un `Observable`:

##### Estrategia A: Suscripción manual (`.subscribe()`)

```typescript
import { Component, OnInit } from '@angular/core';
import { TaskApiService } from '../../services/task-api.service';
import { Tarea } from '../../interfaces/tarea.interface';

@Component({
  selector: 'app-task-list-http',
  standalone: true,
  template: `
    <h2>Lista desde API REST 📡</h2>
    @if (cargando) {
      <p>Cargando datos remotos...</p>
    } @else {
      <ul>
        @for (t of tareas; track t.id) {
          <li>
            {{ t.titulo }}
            <button (click)="borrar(t.id)">Quitar</button>
          </li>
        }
      </ul>
    }
  `
})
export class TaskListHttpComponent implements OnInit {
  public tareas: Tarea[] = [];
  public cargando: boolean = true;

  constructor(private taskApi: TaskApiService) {}

  ngOnInit(): void {
    this.taskApi.obtenerTareas().subscribe({
      next: (data) => {
        this.tareas = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
      }
    });
  }

  public borrar(id: number): void {
    this.taskApi.borrarTarea(id).subscribe(() => {
      this.tareas = this.tareas.filter(t => t.id !== id);
    });
  }
}
```

##### Estrategia B: Tubería Reactiva (`async` Pipe)

Evita tener que suscribirse y desuscribirse manualmente en TypeScript:

```typescript
import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { TaskApiService } from '../../services/task-api.service';
import { Tarea } from '../../interfaces/tarea.interface';

@Component({
  selector: 'app-task-async',
  standalone: true,
  imports: [AsyncPipe],
  template: `
    @if (tareas$ | async; as lista) {
      <ul>
        @for (item of lista; track item.id) {
          <li>{{ item.titulo }}</li>
        }
      </ul>
    } @else {
      <p>Consultando API REST...</p>
    }
  `
})
export class TaskAsyncComponent {
  public tareas$: Observable<Tarea[]>;

  constructor(private taskApi: TaskApiService) {
    this.tareas$ = this.taskApi.obtenerTareas();
  }
}
```

---

### 🏋️ Banco de Ejercicios Prácticos

#### Ejercicio 1: Creación de Tarea vía HTTP POST

<details>
<summary>🔍 Ver Enunciado y Solución</summary>

**Enunciado:**
Escribe la función `guardarTarea(titulo: string)` en el componente para enviar una nueva tarea mediante POST a la API y refrescar el estado local de forma inmutable tras la respuesta exitosa.

**Solución:**

```typescript
public guardarTarea(titulo: string): void {
  if (!titulo.trim()) return;

  const nueva = { titulo, prioridad: 'Media' as const, completada: false };

  this.taskApi.crearTarea(nueva).subscribe({
    next: (tareaCreada) => {
      this.tareas = [...this.tareas, tareaCreada];
      console.log('Tarea creada en el servidor:', tareaCreada);
    },
    error: (err) => console.error('Error al guardar:', err)
  });
}
```

</details>
