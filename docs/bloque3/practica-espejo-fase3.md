# 📐 Proyecto Espejo - Fase 3: Migración Final a Angular Standalone

**Módulo:** Diseño Web en Entorno Cliente (DWEC)  
**Peso en la nota:** 25% de la nota final del trimestre  
**Fecha límite:** Final de la Semana 8  

---

## 🎯 Objetivo de la Fase 3

El objetivo de esta fase final es culminar la transición tecnológica de la aplicación **DevTask**, refactorizando el proyecto desarrollado previamente en JavaScript Vanilla (Fase 1) y TypeScript estricto (Fase 2) hacia la arquitectura moderna de **Componentes Standalone y Servicios en Angular**.

---

## 🛠️ Requisitos Técnicos Obligatorios

### 1. Servicio Centralizado (`TaskManagerService`)
Crea un servicio llamado `TaskManagerService` (`src/app/services/task-manager.service.ts`) que aísle completamente el estado y la lógica de datos:
* **Estado privado:** `private tareas: Tarea[]` y `private filtroActual: TipoFiltro`.
* **Métodos públicos:** `getTareas()`, `agregarTarea()`, `cambiarEstado()` y `cambiarFiltro()`.

### 2. Arquitectura de Componentes Standalone
Divide la interfaz en componentes especializados y modulares:
* **`AppComponent`:** Componente raíz que orquesta la disposición principal de la aplicación.
* **`TaskFormComponent`:** Componente encargado del formulario de alta con `(submit)`.
* **`TaskFilterComponent`:** Componente con los botones de filtrado que notifica cambios.
* **`TaskItemComponent`:** Componente reutilizable para cada fila de tarea que hace uso de `@Input()` y `@Output()`.

### 3. Plantillas Declarativas y Control del Flujo
Queda totalmente prohibido cualquier tipo de manipulación manual del DOM (`document.querySelector`, `appendChild`, etc.). Todas las plantillas deben construirse mediante:
* Interpolación `{{ }}` y Property Binding `[class.completada]`.
* Directivas estructurales modernas: `@if` para estados de carga/mensajes vacíos y `@for` con `track` obligatorio.

---

## 📋 Entregables de la Fase 3

Debéis subir a la plataforma la estructura del proyecto comprimida en un archivo `.zip` que contenga:
1. Carpeta `src/app/` con las interfaces, servicios y componentes standalone.
2. Archivo `angular.json` y `tsconfig.json` del proyecto.
3. Documento breve explicativo del paso de datos entre componentes.
