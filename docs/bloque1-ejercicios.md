# Ejercicios Prácticos: Bloque 1

## Ejercicio 1: El Filtro de Productos (Nivel Básico)

**Enunciado**: Dado el siguiente array de productos tecnológicos, genera un nuevo array que contenga únicamente los productos que pertenezcan a la categoría 'componentes' y cuyo precio sea **superior a 50€**. Utiliza exclusivamente métodos funcionales de arrays (`filter`).

```javascript
const stock = [
  { id: 1, nombre: "Ratón óptico", precio: 25, categoria: "perifericos" },
  { id: 2, nombre: "Memoria RAM 16GB", precio: 85, categoria: "componentes" },
  { id: 3, nombre: "Monitor 4K", precio: 320, categoria: "perifericos" },
  { id: 4, nombre: "Disco SSD 1TB", precio: 65, categoria: "componentes" },
];

// Tu código aquí abajo:
```

## Ejercicio 2: Actualización inuta-Carrito (Nivel Medio)

**Enunciado**: Tienes el estado actual del carrito de la compra de un usuario. El usuario ha decidido modificar las unidades del artículo con id: 102 a **3 unidades**. Recuerda las normas de los frameworks modernos: **no puedes mutar el objeto original**. Utiliza el método .map() y el operador Spread (...) para devolver un carrito totalmente nuevo con el dato actualizado [1.2]

```javascript
const carritoOriginal = [
  { id: 101, articulo: "Teclado", precio: 45, cantidad: 1 },
  { id: 102, articulo: "Cable HDMI", precio: 12, cantidad: 1 },
];

// Tu código aquí abajo (recuerda que carritoOriginal debe quedar intacto):
```

## Ejercicio 3: Consumo de API Asíncrona (Nivel Avanzado)

**Enunciado**: Crea una función asíncrona llamada `obtenerPostPorUsuario(userId)` que realice una petición `fetch` a la API pública `https://typicode.com`. Debes esperar los datos, filtrarlos para quedarte únicamente con los posts que coincidan con el userId pasado por parámetro, y mostrar por consola los títulos de dichos posts [1.3]. Utiliza la estructura `try/catch` para capturar posibles errores.

```javascript
// Tu código aquí abajo:
async function obtenerPostPorUsuario(userId) {
  // ...
}

// Ejecución de prueba:
obtenerPostPorUsuario(2);
```

### Ejercicio 4: Generación Dinámica de Nodos (DOM Nactivo)
**Enunciado:** Crea una estructura HTML básica con un contenedor vacío (`<div id="contenedor-usuarios"></div>`). Utilizando el siguiente array de datos simula la creación manual de "tarjetas de usuario". Debes recorrer el array y, por cada objeto, crear dinámicamente un elemento de tipo `div`, inyectar el nombre en un encabezado `<h3>`, el correo en un párrafo `<p>` y añadirle la clase CSS `.card-usuario`. Finalmente, introduce cada tarjeta dentro del contenedor principal usando `.appendChild()`.

```javascript
const usuariosLocales = [
  { id: 1, nombre: 'Ana Gómez', email: 'ana@ies.es' },
  { id: 2, nombre: 'Luis Martínez', email: 'luis@ies.es' }
];

// Tu código aquí abajo:
```

---

### Ejercicio 5: Buscador Asíncrono de Usuarios (AJAX + DOM)
**Enunciado:** Diseña una función asíncrona llamada `buscarPostPorId(postId)` que realice una petición HTTP mediante `fetch` a la URL de pruebas `https://typicode.com` (sustituyendo *ID* por el parámetro recibido). 

El ejercicio debe cumplir obligatoriamente las siguientes fases:
1. Capturar los datos devueltos (un único objeto con las propiedades `title` y `body`).
2. Localizar un contenedor HTML con el id `#resultado-busqueda`.
3. Inyectar dentro del contenedor el título del post en mayúsculas y el cuerpo del mismo empleando plantillas literales (`innerHTML`).
4. Implementar un bloque `try/catch` para que, si el post no existe o la red falla, se pinte dentro del contenedor el mensaje de error: *"No se ha podido recuperar el post solicitado"*.

```javascript
// Tu código aquí abajo:
async function buscarPostPorId(postId) {
  // ...
}
```


## Pon a prueba tus conocimientos

A continuación tienes el cuestionario interactivo de repaso.

<script setup>
import Cuestionario from './components/Cuestionario_1.vue'

</script>

<Cuestionario />
