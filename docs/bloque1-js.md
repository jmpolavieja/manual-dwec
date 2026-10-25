# Bloque 1: JavaScript Moderno (ES6+)

En este bloque repasaremos los conceptos clave de JavaScript que utilizaremos constantemente en Angular. En el framework, casi toda la información viene en listas (arrays de objetos). Para pintarlas en el HTML no usamos bucles for tradicionales; usamos métodos funcionales: .map que tansforma un array en otro y .filter que crib los elementos.
Además, para poder entender correctamente el funcionamiento del framework, es necesario repasar cómo JavaScript accede y manipula el DOM, y manejar correctamente AJAX.
Pero... ante todo, hechemos un vistazo a lo básico de JavaScript: variables, ámbitos y funciones flecha, la sintaxis y los conceptos más básicos de JavaScript.
## 1.1 El Motor de JavaScript Moderno: Variables, Ámbito y Funciones Flecha

Para entender la sintaxis limpia y compacta que utiliza Angular, primero debemos desterrar los vicios del JavaScript antiguo y comprender cómo gestiona el motor del navegador las variables y las funciones en la actualidad.

### 1.1.1 Adiós a `var`: La llegada de `let` y `const`
Tradicionalmente en JavaScript se utilizaba `var` para declarar variables. Esto introducía problemas graves como el *hoisting* (elevación) y la falta de control en los bloques de código. En el desarrollo moderno **el uso de `var` está completamente prohibido**.

*   `let`: Se utiliza para variables cuyo valor va a cambiar a lo largo del tiempo.
*   `const`: Se utiliza para constantes cuyos valores no van a reasignarse. **Por buena práctica, declara siempre por defecto tus variables con `const`**, y cámbialas a `let` únicamente si necesitas modificar su valor más adelante.

```javascript
const pi = 3.1416;
// pi = 3.15; // ❌ Error: No se puede reasignar una constante.

let contador = 0;
contador++; //  Correcto: let permite la reasignación.
```

### 1.1.2 El Ámbito de Bloque (*Block Scope*)
`let` y `const` introducen el concepto de **ámbito de bloque**. Un bloque de código es cualquier espacio delimitado entre llaves `{}` (como un `if`, un bucle `for` o una función). Las variables declaradas dentro de un bloque **mueren** al salir de él, protegiendo la memoria de la aplicación.

```javascript
let usuarioLogueado = true;

if (usuarioLogueado) {
  const tokenTemporal = "XYZ123";
  var tokenAntiguo = "ABC987"; // ❌ Enfoque antiguo perjudicial
  console.log(tokenTemporal); //  Funciona dentro del bloque
}

console.log(tokenAntiguo);   // ⚠️ ¡Funciona! var se "escapa" del bloque if (Peligroso).
console.log(tokenTemporal);  // ❌ Error: tokenTemporal no está definido fuera del bloque.
```

### 1.1.3 Funciones Flecha (*Arrow Functions*)
Las funciones flecha (`() => {}`) no son solo una forma más corta y elegante de escribir funciones estandarizadas; introducen una característica vital para Angular: **no crean su propio contexto para la palabra clave `this`**, sino que lo heredan de su entorno (ámbito léxico).

```javascript
// 1. Sintaxis clásica vs Sintaxis Flecha
function duplicarClasico(numero) {
  return numero * 2;
}

const duplicarFlecha = (numero) => numero * 2; // Retorno implícito en una línea

// 2. El problema del contexto 'this' (Por qué Angular las necesita)
const componenteReloj = {
  segundos: 0,
  arrancar: function() {
    // Si usáramos una función clásica aquí, 'this' perdería la referencia al objeto
    setInterval(() => {
      this.segundos++; // 'this' apunta correctamente a componenteReloj
      console.log(`Tiempo: ${this.segundos}s`);
    }, 1000);
  }
};
```

## 1.2 Acceso y Manipulación del DOM  (El destino de los datos).
::: info ¿Qué es el DOM y por qué lo repasamos?
El **DOM (Document Object Model)** es el árbol de objetos que el navegador genera a partir del HTML. En JavaScript tradicional, si queremos cambiar un texto en la pantalla, tenemos que buscar el nodo manualmente, leer el valor del input y modificar la propiedad de forma imperativa. 
:::

En Angular no tocaremos el DOM directamente (el framework lo gestiona por nosotros mediante *data-binding*), pero para entender qué hace Angular por debajo, debemos dominar el flujo nativo:

```javascript
// 1. Captura de elementos (El enfoque clásico)
const formulario = document.querySelector('#form-tareas');
const inputTarea = document.querySelector('#input-titulo');
const listaContenedor = document.querySelector('#lista-tareas');

// 2. Escuchar eventos del usuario
formulario.addEventListener('submit', (event) => {
  event.preventDefault(); // Evita que la página se recargue (Vital en Single Page Applications)
  
  const textoTarea = inputTarea.value.trim();
  if (!textoTarea) return;

  // 3. Creación y manipulación dinámica del DOM
  const nuevoItem = document.createElement('li');
  nuevoItem.textContent = textoTarea;
  nuevoItem.classList.add('item-tarea'); // Aplicar estilos CSS

  // 4. Inyección en el árbol HTML
  listaContenedor.appendChild(nuevoItem);

  // Limpiar el formulario
  inputTarea.value = '';
});
```

---
## 1.3 La Evolución de AJAX: de XMLHttpRequest a Fetch (Cómo viajan los datos).

::: info Concepto Clave: AJAX
**AJAX (Asynchronous JavaScript and XML)** no es una tecnología en sí misma, sino un concepto: la capacidad de una página web de **solicitar datos a un servidor en segundo plano sin necesidad de recargar la página completa**. 
:::

Es fundamental que comprendas cómo ha evolucionado esta técnica, ya que Angular utiliza un servicio basado en la versión más moderna y optimizada de este flujo.

### La Prehistoria: `XMLHttpRequest` (XHR)
Así se hacía tradicionalmente. El código era engorroso, propenso al "Callback Hell" y difícil de leer. **No lo uses en tus proyectos**, pero conócelo:

```javascript
const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com');
xhr.onload = function() {
  if (xhr.status === 200) {
    const usuario = JSON.parse(xhr.responseText);
    console.log('XHR Tradicional:', usuario.name);
  }
};
xhr.send();
```

#### El Estándar Moderno: La API `fetch`
Hoy en día, el navegador incluye de forma nativa la API `fetch`, que trabaja mediante **Promesas** y se combina con `async/await` para lograr un código limpio, secuencial y robusto [1.3]:

```javascript
// Este es el enfoque que usaremos como puente antes de ir a Angular
async function cargarUsuarioAJAX() {
  try {
    // 1. Lanzamos la petición asíncrona a la red
    const respuesta = await fetch('https://jsonplaceholder.typicode.com');
    
    // 2. Esperamos a transformar el flujo de datos crudos en un objeto JSON usable
    const usuario = await respuesta.json();
    
    // 3. Pintamos en la consola el resultado
    console.log('AJAX con Fetch Moderno:', usuario.name);
  } catch (error) {
    console.error('Error al procesar la petición AJAX:', error);
  }
}

cargarUsuarioAJAX();
```
## 1.4 Métodos de Arrays (`map` y `filter`)

```JavaScript
// El array de datos que simulamos recibir de una base de datos
const alumnos = [
  { nombre: 'Ana', nota: 8.5 },
  { nombre: 'Carlos', nota: 4.2 },
  { nombre: 'María', nota: 9.0 }
];

// 1. Filtrar alumnos aprobados (Equivalente lógico a lo que luego mostraremos en la vista)
const aprobados = alumnos.filter(alumno => alumno.nota >= 5);
console.log('Aprobados:', aprobados);

// 2. Transformar el array para quedarnos solo con los nombres
const nombresAlumnos = alumnos.map(alumno => alumno.nombre);
console.log('Nombres:', nombresAlumnos); // Resultado: ['Ana', 'Carlos', 'María']
```

## 1.5 Desetructuración y Operador Spread (...)
Sirve para extraaer datos de objetos de forma limpia y para clonar/modifica estados de forma inmutale, algo obligatorio en frameworks modernos.



```javascript
const configuracion = { tema: 'oscuro', idioma: 'es', version: '1.0' };

// Extracción rápida (Desestructuración)
const { tema, idioma } = configuracion;
console.log(tema); // 'oscuro'

// Clonar y modificar sin destruir el original (Operador Spread)
const nuevaConfiguracion = { ...configuracion, tema: 'claro' };
console.log(nuevaConfiguracion.tema); // 'claro'
console.log(configuracion.tema);      // 'oscuro' (Mantiene la integridad)
```
### 1.5.1 ¿Por qué es obligatorio en frameworks modernos? (La Teoría)
En JavaScript tradicional (Vanilla JS), si modificamos un objeto, modificamos su "interior", pero la referencia en memoria sigue siendo la misma.

* El problema: Si Angular tuviera que comprobar propiedad por propiedad dentro de cada objeto de la aplicación para ver si algo ha cambiado, las páginas web irían lentísimas (sería ineficiente).

* La solución (Inmutabilidad): Los frameworks modernos aplican una regla: "No modifiques el objeto antiguo; si algo cambia, dame un objeto completamente nuevo". Angular solo tiene que mirar si la dirección de memoria del objeto ha cambiado. Si es una dirección nueva, redibuja la pantalla al instante. Es una comprobación ultrarrápida [1.2].

### 1.5.2 Código: Mutación vs. Inmutabilidad
Aquí tienes el ejemplo perfecto para mostrar en clase la diferencia entre "destruir" un dato o clonarlo de forma limpia.

#### ❌ El enfoque incorrecto (Mutación de datos)

Modifica el objeto original directamente. En Angular, esto a menudo provoca que la vista no se entere del cambio.

``` javascript
// Estado inicial de un componente (p.ej., la configuración del usuario)
const usuario = {
  nombre: 'Carlos',
  rol: 'alumno',
  tema: 'oscuro'
};

// Modificación directa (Mutación)
usuario.tema = 'claro'; 

// Aunque el tema ha cambiado, el objeto 'usuario' sigue estando
// en el mismo sitio de la memoria. ¡Angular podría ignorar este cambio!
console.log(usuario); 
```
#### El enfoque moderno e inmutable (Uso de Spread ...)
Creamos un objeto totalmente nuevo en una dirección de memoria distinta, copiando lo anterior y sobreescribiendo solo lo que cambia [1.2].
``` javascript
const usuarioOriginal = {
  nombre: 'Carlos',
  rol: 'alumno',
  tema: 'oscuro'
};

// Clonamos inmutablemente usando el operador Spread (...)
const usuarioActualizado = { 
  ...usuarioOriginal, // 1. Vuelca aquí todo lo que tenía el original
  tema: 'claro'       // 2. Modifica o añade la propiedad 'tema'
};

// Resultado:
// 'usuarioOriginal' sigue intacto (mantiene 'oscuro'). Protegemos el estado anterior.
// 'usuarioActualizado' es un objeto nuevo en memoria (tiene 'claro'). 

console.log(usuarioOriginal.tema);    // 'oscuro'
console.log(usuarioActualizado.tema); // 'claro' -> ¡Angular detecta este cambio al instante!
Usa el código con precaución.

3. Aplicado a Arrays (Muy común en Angular)

Cuando tus alumnos tengan que añadir un elemento a una lista en Angular, el instinto les dirá que usen .push(). Hay que enseñarles que .push() muta el array original. Deben usar el operador spread para crear un array nuevo.
javascript
const tareas = ['Estudiar JS', 'Configurar VitePress'];

// ❌ INCORRECTO en frameworks: tareas.push('Aprender Angular');

//  CORRECTO: Creamos un array nuevo combinando lo anterior con lo nuevo
const nuevasTareas = [...tareas, 'Aprender Angular'];

console.log(nuevasTareas); // ['Estudiar JS', 'Configurar VitePress', 'Aprender Angular']
```
### 1.5.3 Aplicado a Arrays (Muy común en Angular)
Lo que te pide el cuerpo para añadir un elemento a una lista de Angular es utilizar .push(). Hay que enseñarles que .push() muta el array original. Hay que usar el operador spread para crear un array nuevo.
```javascript
const tareas = ['Estudiar JS', 'Configurar VitePress'];

// ❌ INCORRECTO en frameworks: tareas.push('Aprender Angular');

//  CORRECTO: Creamos un array nuevo combinando lo anterior con lo nuevo
const nuevasTareas = [...tareas, 'Aprender Angular'];

console.log(nuevasTareas); // ['Estudiar JS', 'Configurar VitePress', 'Aprender Angular']
```
## 1.6 Asincronía Pura (async/await)
Angular utiliza servicios para conectarse a APIs de internet. El código de internet tarda en llegar (asincronía), si no se entiende esto romperemos la aplicación. Primero lo vemos con el estándar de JavaScript (fetch).
```javascript
// Función asíncrona para obtener usuarios de una API de pruebas
async function obtenerUsuarios() {
  try {
    console.log("Cargando usuarios...");
    const respuesta = await fetch('https://jsonplaceholder.typicode.com');
    
    // Esperamos a que el flujo de datos se transforme en JSON
    const datos = await respuesta.json();
    
    // Mostramos los 3 primeros nombres por consola
    const nombres = datos.slice(0, 3).map(u => u.name);
    console.log("Usuarios recuperados:", nombres);
  } catch (error) {
    console.error("Error al traer los datos:", error);
  }
}

obtenerUsuarios();
```

## 1.7 Patrones Avanzados del DOM: Delegación de Eventos y Arquitectura Espejo

Cuando desarrollamos aplicaciones reales en el entorno cliente, no basta con que el código "funcione". Es fundamental que la aplicación sea **eficiente en el consumo de memoria** y que su estructura esté **desacoplada**, preparando el terreno para el flujo de trabajo que utilizaremos en Angular.

### 1.7.1 Optimización de Memoria: Delegación de Eventos (*Event Delegation*)

Un error muy común al renderizar listas dinámicas es asignar un escuchador de eventos (`addEventListener`) a cada elemento individual (como un botón de eliminar o modificar) dentro de un bucle `forEach`.

* **El Problema:** Si la lista crece a 1000 elementos, el navegador tendrá que mantener 1000 funciones "oyentes" activas en la memoria RAM de forma simultánea. Esto degrada drásticamente el rendimiento del cliente.
* **La Solución (Delegación):** Consiste en aprovechar la **propagación de eventos** (*Event Bubbling*) nativa del navegador. En lugar de escuchar en cada hijo, asignamos **un único escuchador en el contenedor padre** (`<ul>` o `<div>`). Cuando el usuario hace click en un botón hijo, el evento "burbujea" hacia arriba, el padre lo caza y averiguamos qué elemento se pulsó mediante `event.target`.

#### ❌ Enfoque Ineficiente (Saturación de memoria)
```javascript
// Renderiza e inyecta un listener individual por cada iteración
tareasFiltradas.forEach(tarea => {
  const li = document.createElement('li');
  const boton = document.createElement('button');
  boton.textContent = 'Completar';

  // ❌ INCORRECTO: 1000 tareas crearán 1000 listeners redundantes en memoria
  boton.addEventListener('click', () => {
    cambiarEstadoTarea(tarea.id);
  });

  li.appendChild(boton);
  listaContenedor.appendChild(li);
});
```

#### ✅ Enfoque Optimizado (Delegación de Eventos)
```javascript
// 1. Al renderizar, solo inyectamos los datos en un atributo 'data-' en el HTML
tareasFiltradas.forEach(tarea => {
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${tarea.titulo}</span>
    <button data-id="${tarea.id}" class="btn-accion">Completar</button>
  `;
  listaContenedor.appendChild(li);
});

// 2. ✅ CORRECTO: Un único listener en el contenedor padre para toda la lista
listaContenedor.addEventListener('click', (event) => {
  // Comprobamos si el elemento que originó el click contiene la clase del botón
  if (event.target.classList.contains('btn-accion')) {
    // Recuperamos el ID guardado de forma segura en el atributo 'data-id'
    const idBuscar = parseInt(event.target.dataset.id, 10);
    
    // Ejecutamos la lógica de negocio mutando el estado de forma inmutable
    tareas = tareas.map(t => t.id === idBuscar ? { ...t, completada: !t.completada } : t);
    
    pintarTareas();
  }
});
```

---

### 1.7.2 Desacoplamiento de Interfaces: La Arquitectura Espejo

En el desarrollo de software moderno, es habitual que diferentes usuarios visualicen **los mismos datos pero con distintos niveles de interacción**. Por ejemplo, un administrador necesita botones para editar el inventario, mientras que un cliente en una pantalla externa solo debe ver el stock disponible en tiempo real de **solo lectura**.

La **Arquitectura Espejo** consiste en diseñar la aplicación bajo el principio de **Única Fuente de la Verdad** (*Single Source of Truth*):
1. Los componentes visuales no guardan información; solo obedecen al **Estado** (nuestro array de objetos en memoria).
2. Cuando el estado cambia, el motor de renderizado actualiza **en paralelo y al unísono** múltiples interfaces independientes conectadas a él.

#### 🏗️ Estructura del DOM Desacoplada (HTML)
```html
<!-- Bloque 1: Interfaz del Administrador (Interactiva con botones) -->
<h2>Gestión de Tareas</h2>
<ul id="lista-tareas"></ul>

<!-- Bloque 2: Interfaz Espejo del Cliente (Solo Lectura, sin interacción directa) -->
<h2>Monitor de Estado (Vista Cliente)</h2>
<ul id="lista-espejo"></ul>
```

#### ⚙️ Implementación del Motor de Renderizado Sincrónico (JS)
```javascript
function pintarTareas() {
  // Limpiamos ambos contenedores de golpe de forma eficiente
  listaContenedor.replaceChildren(); // Zona interactiva
  listaEspejo.replaceChildren();     // Zona espejo

  tareas.forEach(tarea => {
    // --- 1. RENDERIZADO EN ZONA INTERACTIVA ---
    const liOriginal = document.createElement('li');
    liOriginal.innerHTML = `
      <span>${tarea.titulo}</span>
      <button data-id="${tarea.id}" class="btn-accion">Alternar Estado</button>
    `;
    listaContenedor.appendChild(liOriginal);

    // --- 2. RENDERIZADO EN INTERFAZ ESPEJO (SOLO LECTURA) ---
    // Refleja exactamente los mismos cambios en tiempo real pero capa los botones
    const liEspejo = document.createElement('li');
    liEspejo.className = tarea.completada ? 'completada' : 'pendiente';
    liEspejo.innerHTML = `
      <span>[RÉPLICA] ${tarea.titulo} — Estado: <strong>${tarea.completada ? 'Hecho' : 'Pendiente'}</strong></span>
    `;
    listaEspejo.appendChild(liEspejo);
  });
}
```

---

### 1.7.3 El Puente Hacia Angular: Directivas Reactivas (`@if` y `@for`)

Comprender la fontanería interna de vaciar contenedores y duplicar interfaces en JavaScript nativo es vital, ya que es exactamente lo que **Angular automatiza por debajo**. 

En el framework, no manipulamos nodos manualmente ni creamos elementos en memoria. Definimos un único estado en la lógica de TypeScript (`.ts`) y dejamos que el motor declarativo de la plantilla HTML proyecte los cambios en las diferentes vistas conectadas (interactivas o de solo lectura) utilizando **flujos de control nativos**.

#### El Equivalente en el Componente Angular (`.ts`)
```typescript
// El Estado actúa como la única fuente de la verdad para todas las vistas
tareas = [
  { id: 1, titulo: 'Aprender la sintaxis de ES6', prioridad: 'Alta', completada: true },
  { id: 2, titulo: 'Dominar la asincronía y Fetch', prioridad: 'Media', completada: false }
];

alternarEstado(id: number) {
  this.tareas = this.tareas.map(t => t.id === id ? { ...t, completada: !t.completada } : t);
}
```

#### Vista 1: Panel de Control Interactivo (HTML Administrador)
```html
<ul>
  @for (tarea of tareas; track tarea.id) {
    <li>
      <span>{{ tarea.titulo }}</span>
      <!-- Delegación de eventos nativa gestionada por Angular -->
      <button (click)="alternarEstado(tarea.id)">Alternar</button>
    </li>
  }
</ul>
```

#### Vista 2: Monitor Espejo Protegido (HTML Cliente con `@if`)
Pintamos exactamente la misma información en paralelo, pero resolvemos las restricciones de solo lectura y las etiquetas condicionales de forma elegante con la directiva `@if`, sin duplicar lógica de negocio:
```html
<ul>
  @for (tarea of tareas; track tarea.id) {
    <li [class.completada]="tarea.completada">
      <span>[MONITOR] {{ tarea.titulo }}</span>
      
      <!-- 🎯 Renderizado condicional espejo directo en la plantilla -->
      @if (tarea.completada) {
        <span class="badge-success">✅ Hecho</span>
      } @else {
        <span class="badge-warning">⏳ Pendiente</span>
      }
    </li>
  }
</ul>
```
