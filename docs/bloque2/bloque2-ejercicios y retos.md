# 🏋️ Banco de Retos Prácticos: TypeScript

::: info Consolidación de Competencias
Estos retos están diseñados para aplicar el tipado estricto y la Programación Orientada a Objetos (POO) en problemas del mundo real. Resolverlos con éxito os dará la base necesaria para superar la **Fase 2 del Proyecto Espejo**.
:::

---

## Reto 1: El Contrato de la API (Modelado con Interfaces)

::: tip Contexto Angular
Cuando consumimos datos de una API en Angular mediante servicios, lo primero que hacemos es crear una interfaz para tipar la respuesta. Si la API cambia o nos equivocamos en una propiedad, TypeScript debe avisarnos.
:::

**Enunciado:** Crea una interfaz llamada `UsuarioAPI`. Debe modelar un objeto con las siguientes características:
*   `id`: Un número único.
*   `username`: Un texto.
*   `email`: Un texto.
*   `rol`: Solo puede admitir tres valores string específicos: `'admin'`, `'editor'` o `'alumno'`.
*   `token`: Un texto opcional (puede no venir de la API).

Crea un objeto de prueba llamado `usuarioValido` que cumpla la interfaz y otro objeto que fuerce un error de compilación en VS Code al intentar meter un rol no permitido (por ejemplo, `'invitado'`).

---

## Reto 2: Inmutabilidad Tipada con Arrays de Objetos

::: tip Contexto Angular
Modificar el estado de un componente de forma inmutable es obligatorio. En este reto combinamos los métodos funcionales de JavaScript con el tipado estricto de TypeScript.
:::

**Enunciado:** Partiendo de la interfaz `Tarea` que definimos en la teoría:
1.  Declara un array llamado `misTareas` que sea estrictamente de tipo `Tarea[]` con 3 objetos iniciales.
2.  Crea una función llamada `completarTarea(lista: Tarea[], idBuscar: number): Tarea[]`.
3.  La función debe buscar la tarea por su `id`, modificar su propiedad `completada` a `true` y devolver un **array totalmente nuevo e inmutable** sin haber modificado la lista original.

---

## Reto 3: La Clase Componente y la Encapsulación

::: tip Contexto Angular
Un componente de Angular protege sus datos internos (servicios, cálculos) usando `private` y expone a la vista (el HTML) solo lo que es `public`.
:::

**Enunciado:** Crea una clase llamada `ProductComponent`. Debe cumplir los siguientes requisitos:
*   Una propiedad privada llamada `precioBase` (número).
*   Una propiedad privada llamada `iva` (número fijo, por ejemplo `0.21`).
*   Una propiedad pública llamada `nombreProducto` (texto) inicializada desde el constructor.
*   El constructor debe recibir el `nombreProducto` y el `precioBase` usando el **atajo de parámetros de TypeScript** (declaración e inicialización en una sola línea).
*   Un método público llamado `obtenerPrecioFinal(): number` que devuelva el precio base con el IVA aplicado.

Instancia la clase y comprueba desde la consola que no puedes modificar el `precioBase` directamente desde fuera, pero sí puedes obtener el precio final a través del método público.

---

## Reto 4: Control de Errores con Tipado Restringido (Generics Básicos)

::: tip Contexto Angular
Las respuestas de los servidores a veces tienen éxito y a veces devuelven errores. Estructurar objetos capaces de manejar ambos estados de forma tipada es fundamental.
:::

**Enunciado:** Crea un tipo personalizado o interfaz llamada `RespuestaServidor`. Debe contener:
*   `status`: Un texto que solo admita `'success'` o `'error'`.
*   `data`: Un array de textos (`string[]`) que puede ser opcional (solo viene si hay éxito).
*   `mensajeError`: Un texto opcional (solo viene si el estatus es `'error'`).

Escribe una función llamada `procesarRespuesta(res: RespuestaServidor): void` que verifique el estatus. Si es exitoso, recorre el array `data` con un `.forEach()`. Si es un error, imprime el `mensajeError`. El tipado debe garantizar que no intentes recorrer `data` si no existe en el objeto.

---

## Reto 5: Clases Heredadas y el uso de `super()`

::: tip Contexto Angular
Aunque Angular prefiere la composición sobre la herencia, entender cómo una clase extiende a otra es vital para comprender la arquitectura interna del framework y la herencia de servicios base.
:::

**Enunciado:**
1.  Crea una clase base llamada `ServicioDatos` cuyo constructor inicialice una propiedad pública `endpoint: string`. Añade un método llamado `conectar(): void` que imprima por consola `"Conectando a " + this.endpoint`.
2.  Crea una clase hija llamada `ServicioUsuarios` que extienda (`extends`) de `ServicioDatos`. Su constructor debe recibir el endpoint y pasárselo a la clase padre mediante `super(endpoint)`, además de inicializar una propiedad propia llamada `entidad` fijada en `'usuarios'`.
