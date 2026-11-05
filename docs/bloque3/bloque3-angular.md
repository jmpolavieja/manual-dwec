# Bloque 3: Inmersión en Angular Standalone

::: info ¿Por qué llegamos por fin a Angular?
En las fases anteriores aprendiste a manejar datos de forma inmutable y a estructurarlos dentro de clases limpias con TypeScript. Sin embargo, tuviste que seguir escribiendo código imperativo y pesado para manipular el DOM (`document.createElement`, `appendChild`, `querySelector`).

**Angular** es un framework declarativo. A partir de ahora, te centrarás exclusivamente en gestionar los datos y la lógica en tus clases de TypeScript, y Angular se encargará por detrás de sincronizar y pintar el HTML de forma automática y ultrarrápida.
:::

---

## 🎯 Mapa de Aprendizaje del Bloque 3

El Bloque 3 está estructurado en tres grandes hitos de aprendizaje orientados a la construcción progresiva de aplicaciones web modernas con arquitectura **Standalone** (sin necesidad de módulos ni contenedores intermedios):

1. **[Semana 5: Entorno Angular CLI y Componentes Standalone](./semana5-componentes.md)**  
   Instalación de las herramientas oficiales (`@angular/cli`), generación de proyectos SPA, estructura de carpetas y anatomía completa de un Componente Standalone (lógica TS + vista HTML + estilos CSS).

2. **[Semana 6: Data Binding y Directivas Estructurales Modernas](./semana6-databinding.md)**  
   Flujos de enlazado de datos entre la clase TypeScript y el HTML (interpolación, binding de eventos y propiedades) y control del flujo de la vista mediante la sintaxis nativa moderna (`@if` y `@for`).

3. **[Semana 7: Comunicación entre Componentes y Servicios Centralizados](./semana7-servicios.md)**  
   Arquitectura de componentes padre/hijo (`@Input()` y `@Output()`), aislamiento de la lógica de negocio mediante servicios (`ng generate service`) e inyección de dependencias en el constructor.

4. **[🏁 Proyecto Espejo - Fase 3: Migración Final a Angular Standalone](./practica-espejo-fase3.md)**  
   Cierre y refactorización completa de la aplicación **DevTask** utilizando la arquitectura completa de componentes y servicios en Angular.
