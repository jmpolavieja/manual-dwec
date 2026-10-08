# Bloque 1: JavaScript Moderno (ES6+)

En este bloque repasaremos los conceptos clave de JavaScript que utilizaremos constantemente en Angular. En el framework, casi toda la información viene enlistas (arrays de objetos). Para pintarlas en el HTML no usamos bucles for tradicionales; usamos métodos funcionales: .map que tansforma un array en otro y .filter que crib los elementos.

## 1.1 Métodos de Arrays (`map` y `filter`)

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

## 1.2 Desetructuración y Operador Spread (...)
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
### 1.2.1 ¿Por qué es obligatoio en fraemworks modernos? (La Teoría)
En JavaScript tradicional (Vanilla JS), si modificamos un objeto, modificamos su "interior", pero la referencia en memoria sigue siendo la misma.

* El problema: Si Angular tuviera que comprobar propiedad por propiedad dentro de cada objeto de la aplicación para ver si algo ha cambiado, las páginas web irían lentísimas (sería ineficiente).

* La solución (Inmutabilidad): Los frameworks modernos aplican una regla: "No modifiques el objeto antiguo; si algo cambia, dame un objeto completamente nuevo". Angular solo tiene que mirar si la dirección de memoria del objeto ha cambiado. Si es una dirección nueva, redibuja la pantalla al instante. Es una comprobación ultrarrápida [1.2].

### 1.2.2Código: Mutación vs. Inmutailidad
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
Usa el código con precaución.
¿Consideras útil incluir esta misma sección explicativa sobre inmutabilidad en el archivo bloque1-js.md de tu VitePress, o prefieres que avancemos viendo cómo subir este manual a internet (GitHub Pages) para que tus alumnos puedan consultarlo ya?
Las respuestas de la IA pueden contener errores. Más información
```
### 1.2.3 Aplicado a Arrays (Muy común en Angular)
Lo que te pide el cuerpo para añadir un elemento a una lista de Angular es utilizar .push(). Hay que enseñarles que .push() muta el array original. Hay que usar el operador spread para crear un array nuevo.
```javascript
const tareas = ['Estudiar JS', 'Configurar VitePress'];

// ❌ INCORRECTO en frameworks: tareas.push('Aprender Angular');

//  CORRECTO: Creamos un array nuevo combinando lo anterior con lo nuevo
const nuevasTareas = [...tareas, 'Aprender Angular'];

console.log(nuevasTareas); // ['Estudiar JS', 'Configurar VitePress', 'Aprender Angular']
```
## 1.3 Asincronía Pura (async/await)
Angular utiliza servicios para conectarse a APIs de internet. Si los alumnos no entienden que el código de internet tarda en llegar (asincronía), romperán la aplicación. Primero lo vemos con el estándar de JavaScript (fetch).
```javascript
// Función asíncrona para obtener usuarios de una API de pruebas
async function obtenerUsuarios() {
  try {
    console.log("Cargando usuarios...");
    const respuesta = await fetch('https://typicode.com');
    
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
