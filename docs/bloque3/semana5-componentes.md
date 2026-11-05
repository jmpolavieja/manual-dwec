# 🦅 Semana 5: Entorno Angular CLI y Componentes Standalone

En esta semana realizamos el cambio de paradigma principal del curso: pasamos de la manipulación imperativa del DOM en JavaScript nativo a la **programación declarativa** con Angular. 

---

## 3.1 Creación del Entorno con Angular CLI

**Angular CLI (Command Line Interface)** es la herramienta oficial por consola para crear, compilar, testear y mantener aplicaciones de Angular de forma automatizada.

### Paso 1: Instalación de herramientas globales
Abrimos la terminal de comandos e instalamos Angular CLI de forma global en Node.js:

```bash
npm install -g @angular/cli
```

*Para verificar la instalación, ejecuta `ng version`.*

### Paso 2: Generar un nuevo espacio de trabajo Standalone
Generamos la estructura inicial del proyecto utilizando la arquitectura moderna **Standalone** (componentes autónomos sin módulos adicionales):

```bash
ng new devtask-angular --standalone --style=css
```

### Paso 3: Arrancar el servidor de desarrollo en tiempo real
Accedemos a la carpeta del proyecto y ejecutamos el servidor local con recarga automática (*Hot Reload*):

```bash
cd devtask-angular
ng serve
```

Nuestra aplicación estará disponible en `http://localhost:4200`. Cada vez que editemos y guardemos un archivo `.ts`, `.html` o `.css`, el navegador refrescará la vista automáticamente.

---

## 3.2 Anatomía de un Componente Standalone

Un **componente** es la unidad funcional mínima en Angular. Encapsula tres elementos indispensables:
1. **Lógica de negocio:** Clase en TypeScript (`.ts`).
2. **Plantilla visual:** Estructura HTML (`.html` o inline).
3. **Estilos:** Reglas CSS aisladas (`.css` o inline).

### El Decorador `@Component`

Un componente es una clase estándar de TypeScript como las creadas en el Bloque 2, a la que le añadimos el **decorador `@Component`** para indicarle a Angular cómo relacionarla con la interfaz visual.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-task-row',
  standalone: true,
  template: `
    <div class="task-card">
      <h3>{{ tituloTarea }}</h3>
      <button (click)="marcarAsDone()">Completar</button>
    </div>
  `,
  styles: `
    .task-card {
      background-color: #2a2a35;
      padding: 1rem;
      border-radius: 8px;
      color: #f5f5f6;
    }
  `
})
export class TaskRowComponent {
  // Propiedad tipada (Heredado del Bloque 2)
  public tituloTarea: string = 'Refactorizar código fuente a Angular';
  private completada: boolean = false;

  // Método de clase (Heredado del Bloque 2)
  public marcarAsDone(): void {
    this.completada = true;
    console.log(`La tarea "${this.tituloTarea}" ha sido completada.`);
  }
}
```

### Explicación de las Propiedades del Decorador

* **`selector`:** Define el nombre de la etiqueta HTML personalizada (ejemplo: `<app-task-row></app-task-row>`) que utilizaremos para insertar este componente en otras plantillas.
* **`standalone: true`:** Especifica que el componente es autónomo y gestiona sus propias dependencias directamente.
* **`template` / `templateUrl`:** Contiene la plantilla HTML. Usamos `template` para código en línea breve o `templateUrl: './app.component.html'` para archivos HTML separados.
* **`styles` / `styleUrls`:** Define las reglas de estilo CSS asociadas.

---

## 🏋️ Banco de Ejercicios Prácticos (Semana 5)

---

### Ejercicio 5.1: Tarjeta de Perfil de Usuario (`UserProfileComponent`)

**Enunciado:**  
Genera mediante el CLI de Angular un nuevo componente llamado `UserProfileComponent` (o créalo manualmente en `src/app/components/user-profile.component.ts`).

El componente debe cumplir los siguientes requisitos:
1. Tener las propiedades tipadas: `nombre` (texto), `rol` (solo puede ser `'admin'` o `'alumno'`) y `activo` (booleano).
2. Tener un método público `toggleEstado(): void` que alterne el valor del booleano `activo`.
3. Inyectar en la plantilla HTML el nombre y el rol utilizando la sintaxis de interpolación `{{ }}` y un botón para ejecutar `toggleEstado()`.

<details>
<summary>🔍 Haz clic aquí para ver la solución en TypeScript y HTML</summary>

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  template: `
    <div class="user-card">
      <h2>{{ nombre }} <small>({{ rol }})</small></h2>
      <p>Estado actual: <strong>{{ activo ? '🟢 En línea' : '🔴 Desconectado' }}</strong></p>
      <button (click)="toggleEstado()">Cambiar Estado</button>
    </div>
  `,
  styles: `
    .user-card {
      background: #1e1e24;
      border: 1px solid #3f3f50;
      padding: 1.5rem;
      border-radius: 8px;
      color: white;
    }
  `
})
export class UserProfileComponent {
  public nombre: string = 'Ana Gómez';
  public rol: 'admin' | 'alumno' = 'admin';
  public activo: boolean = true;

  public toggleEstado(): void {
    this.activo = !this.activo;
  }
}
```

</details>

---

### Ejercicio 5.2: Contador Tipado en Angular (`TaskCounterComponent`)

**Enunciado:**  
Crea un componente standalone denominado `TaskCounterComponent` que reescriba la lógica del contador vista en el Bloque 2, pero adaptada al modelo declarativo de Angular:

1. Propiedad privada `contador` de tipo número inicializada en `0`.
2. Tres métodos públicos: `incrementar(): void`, `decrementar(): void` y `reset(): void`.
3. Un método público getter `obtenerValor(): number` para permitir a la plantilla HTML leer el valor del contador protegido.

<details>
<summary>🔍 Haz clic aquí para ver la solución en TypeScript y HTML</summary>

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-task-counter',
  standalone: true,
  template: `
    <div class="counter-box">
      <h3>Contador de Tareas ⏱️</h3>
      <div class="display">{{ obtenerValor() }}</div>
      <div class="controls">
        <button (click)="decrementar()">-1</button>
        <button (click)="reset()">Reset</button>
        <button (click)="incrementar()">+1</button>
      </div>
    </div>
  `,
  styles: `
    .counter-box { text-align: center; background: #2a2a35; padding: 1.5rem; border-radius: 8px; color: white; }
    .display { font-size: 2.5rem; font-weight: bold; margin: 1rem 0; color: #646cff; }
    .controls { display: flex; gap: 0.5rem; justify-content: center; }
    button { padding: 0.5rem 1rem; border-radius: 4px; border: none; background: #646cff; color: white; cursor: pointer; }
  `
})
export class TaskCounterComponent {
  private contador: number = 0;

  public obtenerValor(): number {
    return this.contador;
  }

  public incrementar(): void {
    this.contador++;
  }

  public decrementar(): void {
    this.contador--;
  }

  public reset(): void {
    this.contador = 0;
  }
}
```

</details>
