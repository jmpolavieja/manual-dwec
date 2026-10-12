# 📐 Proyecto Espejo - Fase 2: Refactorización a TypeScript Puro

**Módulo:** Diseño Web en Entorno Cliente (DWEC)  
**Peso en la nota:** 25% de la nota del bloque de transición.  
**Fecha de entrega:** Final de la Semana 4.

---

## 🎯 Objetivo de la Fase 2
El objetivo de esta fase es coger la aplicación funcional **DevTask** que desarrollasteis en la Fase 1 (JavaScript Vanilla) y **refactorizarla por completo a TypeScript estricto**, aplicando los conceptos de Programación Orientada a Objetos (POO), encapsulación y tipado estricto mediante Interfaces.

::: warning Restricción Crítica
En esta fase **sigue estando prohibido el uso de Angular**. Toda la interacción con la pantalla y la creación de elementos debe seguir haciéndose de forma nativa a través del DOM, pero estructurado dentro de clases de TypeScript y compilado con `tsc`.
:::

---

## 🛠️ Requisitos Técnicos Obligatorios

### 1. Modelado de Datos (Interfaces)
Debes crear un archivo llamado `src/interfaces/tarea.interface.ts`. Dentro, define el contrato estricto de los datos utilizando una `interface`:
*   `id`: `number` (único, generado por timestamp).
*   `titulo`: `string`.
*   `prioridad`: Solo valores literales `'Alta' | 'Media' | 'Baja'`.
*   `completada`: `boolean`.

### 2. Arquitectura de Clases (POO y Encapsulación)
Todo el esqueleto lógico que antes estaba suelto en funciones en tu archivo `app.js` debe encapsularse dentro de una clase lógica principal llamada `TaskManager` en `src/models/TaskManager.ts`.
*   **Propiedades privadas:** El array global de tareas (`private tareas: Tarea[]`) y el filtro actual (`private filtroActual: string`) deben ser privados. Ningún archivo externo puede modificarlos directamente.
*   **Constructor:** Debe inicializar el entorno y comprobar si hay datos previos.
*   **Métodos públicos:** Debe exponer los métodos estrictamente necesarios para los eventos del HTML, como `public agregarTarea()`, `public pintarTareas()` y `public cambiarEstado()`.

### 3. Configuración del Compilador
El proyecto debe compilarse utilizando el archivo `tsconfig.json` aprendido en clase. Es obligatorio que la propiedad `"strict": true` esté activada. **Queda completamente prohibido el uso del tipo `any`**.

---

## 📋 Entregables de la Fase 2
Debéis subir a la plataforma vuestra estructura de carpetas comprimida en un archivo `.zip` que contenga:
1.  `index.html` (Enlazando al script generado en `dist/app.js`).
2.  Carpeta `src/` con todos tus archivos `.ts` organizados por interfaces y clases.
3.  Archivo `tsconfig.json` con las reglas de compilación estrictas activadas.
