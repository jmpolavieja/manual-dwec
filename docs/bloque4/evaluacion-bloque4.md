### 🚀 Práctica Evaluativa del Bloque 4: Portal de Gestión de Incidencias (`DevTask Pro SPA`)

::: info Evaluación Práctica de Competencias — Bloque 4
Esta práctica evalúa las competencias avanzadas necesarias para construir una Single Page Application (SPA) completa con Angular Standalone: enrutamiento entre vistas, consumo de servicios HTTP asíncronos con RxJS, captura y validación de datos mediante formularios reactivos, maquetación profesional y gestión moderna del estado con **Signals**.
:::

---

## 🎯 Objetivo de la Práctica

Desarrollar **DevTask Pro SPA**, un portal web de gestión de incidencias técnicas que permite navegar entre vistas, consultar un servidor remoto ficticio/API REST, validar mediante formularios reactivos los datos de entrada y actualizar el estado de forma reactiva mediante señales.

---

## 📐 Requisitos Técnicos Obligatorios

### 1. Sistema de Rutas (`src/app/app.routes.ts`)
Configura las siguientes rutas utilizando el enrutador standalone:
* `''`: Redirección a `/incidencias` (coincidencia completa `pathMatch: 'full'`).
* `'incidencias'`: Carga el componente `IncidenciaListComponent`.
* `'nueva'`: Carga el componente `IncidenciaFormComponent`.
* `'incidencias/:id'`: Carga el componente `IncidenciaDetailComponent`.
* `'**'`: Ruta comodín para pantallas 404.

### 2. Cliente HTTP y Servicio API (`src/app/services/incidencia-api.service.ts`)
* Configura `provideHttpClient()` en `app.config.ts`.
* Crea la interfaz `Incidencia` con: `id?`, `titulo`, `prioridad` (`'Alta' | 'Media' | 'Baja'`), `emailContacto`, `estado` (`'Abierta' | 'Resuelta'`).
* Implementa en el servicio los métodos HTTP asíncronos que retornen `Observable`:
  * `getIncidencias(): Observable<Incidencia[]>`
  * `getById(id: number): Observable<Incidencia>`
  * `crearIncidencia(incidencia: Incidencia): Observable<Incidencia>`

### 3. Formulario Reactivo (`src/app/components/incidencia-form.component.ts`)
* Importa `ReactiveFormsModule`.
* Construye un `FormGroup` utilizando `FormBuilder` con las siguientes validaciones estrictas:
  * `titulo`: Obligatorio, longitud mínima de 6 caracteres.
  * `prioridad`: Obligatorio (valor inicial `'Media'`).
  * `emailContacto`: Obligatorio, formato válido de email (`Validators.email`).
* Muestra mensajes de error en la plantilla HTML únicamente cuando los campos hayan sido tocados (`touched`) y contengan errores.
* Tras enviar el formulario con éxito, redirige al usuario a la lista `/incidencias` mediante el servicio `Router`.

### 4. Reactividad con Signals (`src/app/components/incidencia-list.component.ts`)
* Administra la lista de incidencias recibida de la API utilizando una señal mutable: `public incidencias = signal<Incidencia[]>([]);`
* Declara dos señales derivadas con `computed()`:
  * `totalIncidencias`: Longitud total del array de incidencias.
  * `totalAbiertas`: Número de incidencias con estado `'Abierta'`.

---

## 📊 Rúbrica de Calificación (10 Puntos)

| Criterio | Puntuación | Descripción |
| :--- | :---: | :--- |
| **Configuración del Routing SPA** | 2.0 pts | Definición correcta de rutas, parámetros por URL y redirección `router-outlet`. |
| **Servicio HTTP & Observables** | 2.5 pts | Consumo asíncrono con `HttpClient` y tipado estricto mediante `Observable<T>`. |
| **Formularios Reactivos & Validaciones** | 2.5 pts | Uso de `FormGroup`, validadores dinámicos y feedback visual al usuario. |
| **Estado Reactivo con Signals** | 2.0 pts | Uso correcto de `signal()`, `computed()` para valores derivados y actualización. |
| **Calidad de Código & Arquitectura** | 1.0 pt | Estructura modular, inyección de dependencias y ausencia de errores de compilación. |

---

## 📄 Plantilla para el Alumno (Pistas y Guía de Implementación)

### 1. `src/app/app.routes.ts`

```typescript
import { Routes } from '@angular/router';

// TODO 1: Importar los componentes de la aplicación
// import { IncidenciaListComponent } from './components/incidencia-list.component';
// import { IncidenciaFormComponent } from './components/incidencia-form.component';
// import { IncidenciaDetailComponent } from './components/incidencia-detail.component';

export const routes: Routes = [
  // TODO 2: Configurar la tabla de rutas
  // PISTA 1: Redirige la ruta vacía '' hacia 'incidencias'
  // PISTA 2: Asigna la ruta parametrizada 'incidencias/:id'
  // PISTA 3: Configura la ruta wildcard '**'
];
```

---

### 2. `src/app/services/incidencia-api.service.ts`

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// TODO 3: Definir la interfaz Incidencia
export interface Incidencia {
  id?: number;
  titulo: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  emailContacto: string;
  estado: 'Abierta' | 'Resuelta';
}

@Injectable({
  providedIn: 'root'
})
export class IncidenciaApiService {
  private readonly apiUrl = '/api/incidencias';

  // TODO 4: Inyectar HttpClient en el constructor
  constructor(private http: HttpClient) {}

  // TODO 5: Implementar el método GET para obtener todas las incidencias
  public getIncidencias(): Observable<Incidencia[]> {
    // PISTA: return this.http.get<Incidencia[]>(this.apiUrl);
    return new Observable(); // TODO: Sustituir por la llamada real
  }

  // TODO 6: Implementar el método POST para guardar una nueva incidencia
  public crearIncidencia(incidencia: Incidencia): Observable<Incidencia> {
    // PISTA: return this.http.post<Incidencia>(this.apiUrl, incidencia);
    return new Observable(); // TODO: Sustituir por la llamada real
  }
}
```

---

### 3. `src/app/components/incidencia-form.component.ts`

```typescript
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IncidenciaApiService } from '../services/incidencia-api.service';

@Component({
  selector: 'app-incidencia-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-container">
      <h2>Registrar Nueva Incidencia 📝</h2>

      <!-- TODO 7: Input Título -->
      <!-- PISTA: Vincula el control con formControlName="titulo" -->

      <!-- TODO 8: Select Prioridad -->
      <!-- PISTA: Vincula el control con formControlName="prioridad" -->

      <!-- TODO 9: Input Email -->
      <!-- PISTA: Muestra mensajes de error si form.controls['emailContacto'].touched && errors -->

      <button type="submit" [disabled]="form.invalid">Guardar Incidencia</button>
    </form>
  `
})
export class IncidenciaFormComponent implements OnInit {
  public form!: FormGroup;

  // TODO 10: Inyectar FormBuilder, IncidenciaApiService y Router en el constructor
  constructor(
    private fb: FormBuilder,
    private api: IncidenciaApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // TODO 11: Construir el FormGroup con validaciones
    // PISTA:
    // titulo: ['', [Validators.required, Validators.minLength(6)]]
    // prioridad: ['Media', [Validators.required]]
    // emailContacto: ['', [Validators.required, Validators.email]]
  }

  public onSubmit(): void {
    // TODO 12: Procesar el envío del formulario
    // PISTA 1: Si this.form.invalid, salir inmediatamente.
    // PISTA 2: Invoca a this.api.crearIncidencia(this.form.value).subscribe(...)
    // PISTA 3: Dentro del callback next, redirige con this.router.navigate(['/incidencias']);
  }
}
```

---

### 4. `src/app/components/incidencia-list.component.ts`

```typescript
import { Component, OnInit, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IncidenciaApiService, Incidencia } from '../services/incidencia-api.service';

@Component({
  selector: 'app-incidencia-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="list-container">
      <h2>Listado de Incidencias 🚨</h2>
      
      <!-- TODO 13: Mostrar contadores reactivos con Signals -->
      <!-- PISTA: Usa totalIncidencias() y totalAbiertas() en la plantilla -->
      <p>Total: {{ totalIncidencias() }} | Abiertas: {{ totalAbiertas() }}</p>

      <a routerLink="/nueva" class="btn">+ Nueva Incidencia</a>

      <!-- TODO 14: Renderizar la lista iterando sobre el signal 'incidencias()' -->
      <!-- PISTA: @for (inc of incidencias(); track inc.id) -->
    </div>
  `
})
export class IncidenciaListComponent implements OnInit {
  // TODO 15: Declarar el Signal de incidencias
  public incidencias = signal<Incidencia[]>([]);

  // TODO 16: Crear las señales derivadas con computed()
  public totalIncidencias = computed(() => this.incidencias().length);
  public totalAbiertas = computed(() => 
    this.incidencias().filter(i => i.estado === 'Abierta').length
  );

  constructor(private api: IncidenciaApiService) {}

  ngOnInit(): void {
    // TODO 17: Cargar las incidencias de la API al inicializar
    // PISTA: this.api.getIncidencias().subscribe(data => this.incidencias.set(data));
  }
}
```
