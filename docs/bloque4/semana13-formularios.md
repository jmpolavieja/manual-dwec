### 📝 Semana 13 y 14: Formularios Reactivos y Validaciones

::: info ¿Por qué Formularios Reactivos?
En aplicaciones profesionales de gran escala, la captura y validación de datos del usuario requiere control total desde la clase TypeScript. **ReactiveFormsModule** permite construir estructuras de formulario explicitas (`FormGroup`, `FormControl`), aplicar reglas de validación en tiempo real y reaccionar ante cambios de estado de forma síncrona e inmutable.
:::

---

#### 1. Importación y Estructura Base (`ReactiveFormsModule`)

Para utilizar formularios reactivos en un componente standalone, importamos `ReactiveFormsModule` en el array `imports` del decorador `@Component`:

```typescript
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  public miFormulario!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Definición estructurada del formulario y sus validaciones
    this.miFormulario = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      prioridad: ['Media', [Validators.required]],
      emailContacto: ['', [Validators.required, Validators.email]]
    });
  }

  // Getter auxiliar para facilitar el acceso desde la plantilla HTML
  get f() {
    return this.miFormulario.controls;
  }

  public onSubmit(): void {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched(); // Marca todos los campos para mostrar errores
      return;
    }

    console.log('Datos del Formulario:', this.miFormulario.value);
    this.miFormulario.reset({ prioridad: 'Media' });
  }
}
```

---

#### 2. Plantilla HTML con Control de Errores Dinámico

Vinculamos el objeto `FormGroup` al elemento `<form>` mediante `[formGroup]` y cada campo con `formControlName`:

```html
<form [formGroup]="miFormulario" (ngSubmit)="onSubmit()" class="form-card">
  <h2>Nueva Tarea (Formulario Reactivo) 📝</h2>

  <!-- Campo Título -->
  <div class="form-group">
    <label for="titulo">Título de la Tarea:</label>
    <input 
      id="titulo" 
      type="text" 
      formControlName="titulo" 
      placeholder="Ej. Configurar servidor HTTP"
    >
    @if (f['titulo'].touched && f['titulo'].errors) {
      <div class="error-msg">
        @if (f['titulo'].errors['required']) { <span>El título es obligatorio.</span> }
        @if (f['titulo'].errors['minlength']) { <span>Mínimo 5 caracteres.</span> }
      </div>
    }
  </div>

  <!-- Campo Prioridad -->
  <div class="form-group">
    <label for="prioridad">Prioridad:</label>
    <select id="prioridad" formControlName="prioridad">
      <option value="Alta">Alta</option>
      <option value="Media">Media</option>
      <option value="Baja">Baja</option>
    </select>
  </div>

  <!-- Campo Email -->
  <div class="form-group">
    <label for="email">Email de Notificación:</label>
    <input id="email" type="email" formControlName="emailContacto" placeholder="dev@altair.es">
    @if (f['emailContacto'].touched && f['emailContacto'].errors) {
      <div class="error-msg">
        @if (f['emailContacto'].errors['required']) { <span>El email es obligatorio.</span> }
        @if (f['emailContacto'].errors['email']) { <span>Formato de email no válido.</span> }
      </div>
    }
  </div>

  <button type="submit" [disabled]="miFormulario.invalid" class="btn-submit">
    Guardar Tarea
  </button>
</form>
```

---

#### 3. Validaciones Personalizadas (Custom Validators)

Podemos crear nuestras propias funciones de validación estricta en TypeScript:

```typescript
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Validador personalizado: prohíbe palabras reservadas o no permitidas
export function palabraProhibidaValidator(palabra: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value as string;
    if (!valor) return null;
    
    const contieneProhibida = valor.toLowerCase().includes(palabra.toLowerCase());
    return contieneProhibida ? { palabraProhibida: { palabra } } : null;
  };
}

// Uso en el FormGroup:
// titulo: ['', [Validators.required, palabraProhibidaValidator('test')]]
```

---

### 🏋️ Banco de Ejercicios Prácticos

#### Ejercicio 1: Resetear formulario manteniendo valores por defecto

<details>
<summary>🔍 Ver Enunciado y Solución</summary>

**Enunciado:**
Crea un botón "Limpiar" que restablezca el formulario reactivo a su estado inicial, fijando la prioridad por defecto en 'Media'.

**Solución:**

```typescript
public limpiarFormulario(): void {
  this.miFormulario.reset({
    titulo: '',
    prioridad: 'Media',
    emailContacto: ''
  });
}
```

</details>

#### Ejercicio 2: Deshabilitar o habilitar un control dinámicamente

<details>
<summary>🔍 Ver Enunciado y Solución</summary>

**Enunciado:**
Escribe un método que deshabilite o habilite el campo `emailContacto` según el valor de un checkbox `notificar: boolean`.

**Solución:**

```typescript
public alternarNotificacion(activado: boolean): void {
  const controlEmail = this.miFormulario.get('emailContacto');
  if (activado) {
    controlEmail?.enable();
  } else {
    controlEmail?.disable();
  }
}
```

</details>
