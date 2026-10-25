# Bloque 2: Fundamentos de TypeScript

## ⚙️ 2.0 Entorno de Trabajo y el Compilador (`tsc`)

::: warning Concepto Clave para el Aula
**El navegador no entiende TypeScript.** Los motores de JavaScript de Chrome, Firefox o Safari solo saben ejecutar JavaScript puro. Por lo tanto, TypeScript funciona como una herramienta de desarrollo: escribimos código en archivos `.ts` y utilizamos el **Compilador de TypeScript (`tsc`)** para traducirlo o "transpilarlo" a archivos `.js` estándar.
:::

Vamos a configurar nuestro entorno local paso a paso en la terminal para entender cómo funciona este proceso antes de delegarlo automáticamente en Angular.

### Paso 1: Instalación Global del Compilador
Dado que TypeScript corre sobre el entorno de Node.js, abrimos nuestra terminal e instalamos el compilador oficial de forma global en el equipo para poder usar el comando `tsc`:

```bash
npm install -g typescript
```
*Para verificar que se ha instalado correctamente, ejecuta `tsc -v`. Debería devolverte la versión actual del compilador.*

### Paso 2: Inicializar la Configuración (`tsconfig.json`)
Cada proyecto tiene unas reglas de tipado y compilación diferentes (por ejemplo, si queremos que traduzca a código JS moderno o antiguo). Para generar el archivo de configuración oficial en la raíz de nuestra carpeta, ejecutamos:

```bash
tsc --init
```
Esto creará un archivo llamado **`tsconfig.json`**. Abre este archivo en VS Code y busca las siguientes propiedades clave para desomentarlas o editarlas:

```json
{
  "compilerOptions": {
    "target": "ES2022",           // ¿A qué versión de JavaScript queremos traducir?
    "module": "commonjs",         // El sistema de módulos a emplear
    "rootDir": "./src",           // Dónde guardamos nuestros archivos fuente .ts
    "outDir": "./dist",           // Dónde va a escupir el compilador los archivos .js traducidos
    "strict": true,               // Activa el tipado estricto (Obligatorio en DAW)
    "skipLibCheck": true          // Acelera la compilación saltándose la revisión de librerías
  }
}
```

### Paso 3: Estructura de Trabajo en Local
Crea la siguiente estructura de carpetas en tu proyecto para mantener el código ordenado:
```text
mi-proyecto-ts/
├── dist/                <-- Vacía (Aquí se generarán los .js automáticamente)
├── src/
│   └── app.ts           <-- Tu archivo de código TypeScript
├── index.html           <-- Enlaza SIEMPRE a 'dist/app.js'
└── tsconfig.json
```

### Paso 4: El Modo Observador (`--watch`)
Estar ejecutando el comando `tsc` en la terminal cada vez que guardamos un archivo en VS Code es una pérdida de tiempo. TypeScript incluye un modo "espía" u observador. Ejecuta este comando en tu terminal y déjala abierta:

```bash
tsc --watch
```
A partir de este momento, cada vez que hagas un cambio en tu archivo `src/app.ts` y pulses guardar, **el compilador traducirá el código a `dist/app.js` en milisegundos de forma totalmente automática**. En tu `index.html`, solo tendrás que enlazar el archivo de la carpeta `dist`:

```html
<script src="dist/app.js"></script>
```
# Fundamentos de TypeScript: programando

::: info ¿Por qué TypeScript antes de Angular?
JavaScript es un lenguaje dinámico: permite guardar un texto dentro de una variable que antes contenía un número, o llamar a funciones pasándole menos parámetros de los que necesita. Esto en aplicaciones grandes (como las que estructuramos con Angular) provoca errores impredecibles en producción. 

TypeScript es un **superconjunto (superset)** de JavaScript desarrollado por Microsoft. No sustituye a JavaScript; simplemente añade una capa de **tipado estático** y herramientas avanzadas de desarrollo para detectar los errores en nuestro editor antes de ejecutar la web.
:::

---

## Tipado Estático e Interfaces

### 2.1 Tipos Primitivos y Arrays

En TypeScript podemos (y debemos) declarar de qué tipo es cada variable. Si intentamos asignar un valor incorrecto, el compilador bloqueará la compilación.

```typescript
// Declaración explícita de tipos
const nombreProfesor: string = 'Manuel';
let alumnosMatriculados: number = 22;
const esModuloEvualuable: boolean = true;

// Tipado de Arrays (Dos sintaxis válidas)
const modulosDaw: string[] = ['DWEC', 'DWES', 'DIW'];
const notasExamen: Array<number> = [8.5, 4.2, 9.0];

// ❌ Esto lanzará un error inmediato en VS Code:
// alumnosMatriculados = "veintidós"; // Error: Tipo string no asignable a number.
```

::: tip Explicación para clase: El tipo `any`
Si no sabemos qué tipo de datos va a devolver una API externa, existe el tipo `any`. Usar `any` le dice a TypeScript: *"Desactiva el analizador de errores para esta variable"*. En clase debemos **prohibir o desaconsejar el uso sistemático de `any`** (conocido como *AnyScript*), ya que destruye la seguridad que nos aporta el lenguaje.
:::

### 2.2 Modelando Datos con Interfaces

Una `interface` es un contrato o molde que define la estructura exacta que debe cumplir un objeto. Es la herramienta principal que usaremos en Angular para manejar respuestas de servidores e información compleja.

```typescript
// Definición de la interfaz
interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
  prioridad: 'Alta' | 'Media' | 'Baja'; // Uso de tipos literales (un "enum" simplificado)
  fechaEntrega?: string;                // El signo '?' indica que esta propiedad es opcional
}

// Aplicación de la interfaz a un objeto literal
const miTarea: Tarea = {
  id: 1,
  titulo: 'Configurar el routing de la app',
  completada: false,
  prioridad: 'Alta'
};

// ❌ Errores que TypeScript capturará en el acto:
// const tareaIncompleta: Tarea = { id: 2, titulo: 'Romper la app' }; // Error: Falta 'completada' y 'prioridad'
// miTarea.prioridad = 'Urgente'; // Error: 'Urgente' no pertenece a 'Alta' | 'Media' | 'Baja'
```

---

## Programación Orientada a Objetos (POO)

Angular abandona la programación funcional clásica de JavaScript y abraza por completo la **POO basada en Clases**. Cualquier componente, servicio o módulo de Angular es, bajo el capó, una clase de TypeScript.

### 2.3 Estructura de una Clase y Modificadores de Acceso

A diferencia de JavaScript Vanilla, TypeScript permite proteger el acceso a las propiedades de nuestras clases mediante modificadores:
*   `public` (Por defecto): Accesible desde cualquier lugar.
*   `private`: Solo accesible desde dentro de la propia clase.
*   `protected`: Solo accesible desde la clase y sus clases hijas (herencia).

```typescript
class Autenticador {
  // Propiedades declaradas con su tipo y visibilidad
  private claveSecreta: string;
  public usuarioActivo: string;

  // El constructor se ejecuta al instanciar el objeto con 'new'
  constructor(usuario: string, clave: string) {
    this.usuarioActivo = usuario;
    this.claveSecreta = clave;
  }

  // Método público: El exterior puede llamarlo
  public iniciarSesion(claveIntento: string): boolean {
    return this.validarClave(claveIntento);
  }

  // Método privado: Solo la propia clase puede ejecutarlo internamente
  private validarClave(claveIntento: string): boolean {
    return this.claveSecreta === claveIntento;
  }
}

// Uso de la clase
const auth = new Autenticador('admin', '12345');
console.log(auth.usuarioActivo); // Funciona ('admin')
console.log(auth.iniciarSesion('12345')); // Funciona (true)

// ❌ Errores de acceso:
// console.log(auth.claveSecreta); // Error: Propiedad 'claveSecreta' es privada.
// auth.validarClave('123');       // Error: El método 'validarClave' es privado.
```

### 2.4 El Atajo de TypeScript: Parámetros en Constructor

::: tip Truco de Productividad (Crucial para Angular)
En Angular usaremos un patrón llamado **Inyección de Dependencias** constantemente. Para evitar tener que declarar la propiedad arriba y luego hacer `this.propiedad = propiedad` dentro del constructor, TypeScript tiene un "atajo" sintáctico: si pones el modificador de acceso (`public`/`private`) directamente en los parámetros del constructor, TypeScript **declara e inicializa la propiedad automáticamente**.
:::

Compara este código con el del apartado 2.3; hacen exactamente lo mismo, pero este es el estándar que verán en Angular:

```typescript
class AutenticadorCompacto {
  // Al poner 'private' o 'public' aquí, TypeScript hace la magia por detrás
  constructor(
    public usuarioActivo: string, 
    private claveSecreta: string
  ) {}

  public verificar(): void {
    console.log(`Verificando al usuario ${this.usuarioActivo}`);
  }
}
```

---

## 🎯 El Enlace Final: Conectando con Angular

Para terminar este bloque, mira cómo se fusiona todo lo que hemos aprendido en una estructura real de Angular. Fíjate en cómo una **Interfaz** y una **Clase con modificadores** forman la anatomía completa de un componente:

```typescript
import { Component } from '@angular/core';

// 1. Usamos una interfaz para dar forma a los datos
interface ConfigPerfil {
  theme: string;
  notificaciones: boolean;
}

@Component({
  selector: 'app-perfil',
  template: `<h1>Bienvenido, {{ nombreUsuario }}</h1>`
})
export class PerfilComponent {
  // 2. Usamos propiedades tipadas y modificadores de acceso en la clase
  public nombreUsuario: string = 'María';
  private opcionesUsuario: ConfigPerfil = { theme: 'dark', notificaciones: true };

  // 3. Usamos métodos tipados con retornos explícitos
  public cambiarNombre(nuevoNombre: string): void {
    this.nombreUsuario = nuevoNombre;
  }
}
```
