### 🛣️ Semana 9 y 10: Enrutamiento y Navegación SPA (Angular Router)

::: info ¿Qué es el Enrutamiento en una SPA?
En las webs tradicionales, hacer clic en un enlace solicita al servidor una página HTML completamente nueva. En una **Single Page Application (SPA)** con Angular, la página nunca se recarga: el **enrutador de Angular** intercepta la URL del navegador y destruye/construye dinámicamente el componente adecuado dentro del espacio asignado en el HTML.
:::

---

#### 1. Configuración de Rutas Standalone (`app.routes.ts`)

En Angular Standalone, las rutas se definen mediante un array de objetos tipo `Routes` en el archivo `src/app/app.routes.ts`:

```typescript
import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tareas', pathMatch: 'full' },           // Redirección inicial
  { path: 'tareas', component: TaskListComponent },                // Ruta principal
  { path: 'tareas/:id', component: TaskDetailComponent },           // Ruta con parámetro dinámico
  { path: '**', component: NotFoundComponent }                     // Ruta comodín para 404
];
```

Para habilitar el enrutador en la aplicación, se registra en `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
```

---

#### 2. El Marco de Navegación (`app.component.html`)

Para renderizar las rutas y permitir la navegación sin recargar la página, sustituimos el contenido de `app.component.html` por:

```html
<nav class="navbar">
  <h2>DevTask SPA 🚀</h2>
  <div class="nav-links">
    <a routerLink="/tareas" routerLinkActive="active-link">Lista de Tareas</a>
  </div>
</nav>

<!-- Hueco dinámico donde el enrutador inyectará el componente según la URL -->
<main class="content">
  <router-outlet></router-outlet>
</main>
```

---

#### 3. Lectura de Parámetros Dinámicos (`ActivatedRoute`)

Cuando navegamos a una ruta parametrizada como `/tareas/101`, el componente destino lee dicho valor inyectando el servicio `ActivatedRoute`:

```typescript
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="card">
      <h3>Detalle de Tarea ID: {{ taskId }}</h3>
      <a routerLink="/tareas" class="btn">← Volver a la Lista</a>
    </div>
  `
})
export class TaskDetailComponent implements OnInit {
  public taskId: number | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Lectura síncrona de los parámetros de la URL actual
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.taskId = Number(idParam);
    }
  }
}
```

---

#### 4. Protección de Rutas (`canActivateFn`)

Un **Guard** permite bloquear la navegación hacia una ruta si no se cumplen ciertas condiciones (por ejemplo, si el usuario no ha iniciado sesión):

```typescript
// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export class AuthService {
  private isLoggedIn: boolean = false;
  public isAuthenticated(): boolean { return this.isLoggedIn; }
}

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
```

---

### 🏋️ Banco de Ejercicios Prácticos

#### Ejercicio 1: Configurar una pantalla 404 (Not Found)

<details>
<summary>🔍 Ver Enunciado y Solución</summary>

**Enunciado:**
Crea un componente `NotFoundComponent` y configúralo en `app.routes.ts` para que cualquier ruta no definida muestre un mensaje de error 404 y un botón para volver al inicio.

**Solución:**

```typescript
// 1. src/app/components/not-found/not-found.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div style="text-align: center; padding: 3rem;">
      <h1>404 🚫</h1>
      <p>La página que buscas no existe o ha sido movida.</p>
      <a routerLink="/tareas" style="color: #6366f1;">Ir al inicio</a>
    </div>
  `
})
export class NotFoundComponent {}

// 2. Añadir al final de app.routes.ts:
// { path: '**', component: NotFoundComponent }
```

</details>

#### Ejercicio 2: Navegación Programática al completar una acción

<details>
<summary>🔍 Ver Enunciado y Solución</summary>

**Enunciado:**
En un formulario de edición, tras guardar los cambios, redirige al usuario automáticamente a la lista `/tareas` utilizando el servicio `Router`.

**Solución:**

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  template: `<button (click)="guardarYSalir()">Guardar Cambios</button>`
})
export class EditTaskComponent {
  constructor(private router: Router) {}

  public guardarYSalir(): void {
    // Lógica de guardado...
    console.log('Datos guardados correctamente');
    
    // Navegación por código
    this.router.navigate(['/tareas']);
  }
}
```

</details>
