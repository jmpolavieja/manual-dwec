<template>
  <div class="cuestionario-wrapper">
    
    <!-- PREGUNTA 1 -->
    <div class="test-card">
      <p class="test-pregunta">1. ¿Qué almacena la variable <code>resultado</code> tras ejecutar el siguiente código?</p>
      <pre class="test-codigo"><code class="language-javascript">const tareas = ['Diseño', 'Maquetación'];
const resultado = tareas.push('Programación');</code></pre>
      
      <div class="test-opciones">
        <button @click="seleccionar('p1', 'A')" :class="['btn-opcion', { 'btn-incorrecto': respuestas.p1 === 'A' }]">
          <span v-if="respuestas.p1 === 'A'">❌ </span>A) <code>['Diseño', 'Maquetación', 'Programación']</code>
        </button>
        <button @click="seleccionar('p1', 'B')" :class="['btn-opcion', { 'btn-incorrecto': respuestas.p1 === 'B' }]">
          <span v-if="respuestas.p1 === 'B'">❌ </span>B) <code>undefined</code>
        </button>
        <button @click="seleccionar('p1', 'C')" :class="['btn-opcion', { 'btn-correcto': respuestas.p1 === 'C' }]">
          <span v-if="respuestas.p1 === 'C'">✅ </span>C) <code>3</code>
        </button>
      </div>
      <div v-if="respuestas.p1" class="test-explicacion">
        <strong>Explicación:</strong> El método tradicional <code>.push()</code> muta el array original pero <strong>retorna un número entero</strong> con la nueva longitud del array. En frameworks esto es un error común, ya que rompe el principio de inmutabilidad.
      </div>
    </div>

    <!-- PREGUNTA 2 -->
    <div class="test-card">
      <p class="test-pregunta">2. Si ejecutamos una función asíncrona que contiene la línea <code>const datos = await fetch(URL);</code>, ¿qué hace exactamente la palabra clave <code>await</code>?</p>
      
      <div class="test-opciones">
        <button @click="seleccionar('p2', 'A')" :class="['btn-opcion', { 'btn-incorrecto': respuestas.p2 === 'A' }]">
          <span v-if="respuestas.p2 === 'A'">❌ </span>A) Bloquea el navegador por completo impidiendo la interacción del usuario.
        </button>
        <button @click="seleccionar('p2', 'B')" :class="['btn-opcion', { 'btn-correcto': respuestas.p2 === 'B' }]">
          <span v-if="respuestas.p2 === 'B'">✅ </span>B) Pausa la ejecución de esa función de manera no bloqueante hasta que la Promesa de internet se resuelva.
        </button>
        <button @click="seleccionar('p2', 'C')" :class="['btn-opcion', { 'btn-incorrecto': respuestas.p2 === 'C' }]">
          <span v-if="respuestas.p2 === 'C'">❌ </span>C) Cancela la petición si el servidor tarda más de 100 milisegundos en responder.
        </button>
      </div>
      <div v-if="respuestas.p2" class="test-explicacion">
        <strong>Explicación:</strong> <code>await</code> permite escribir código asíncrono que se lee como síncrono, esperando la respuesta de la red sin congelar el hilo de ejecución principal del navegador.
      </div>
    </div>

    <!-- PREGUNTA 3 -->
    <div class="test-card">
      <p class="test-pregunta">3. Tienes un objeto <code>const config = { tema: 'oscuro', version: 1 };</code>. Quieres cambiar el tema a 'claro' de forma inmutable. ¿Cuál es la sintaxis correcta?</p>
      
      <div class="test-opciones">
        <button @click="seleccionar('p3', 'A')" :class="['btn-opcion', { 'btn-incorrecto': respuestas.p3 === 'A' }]">
          <span v-if="respuestas.p3 === 'A'">❌ </span>A) <code>config.tema = 'claro';</code>
        </button>
        <button @click="seleccionar('p3', 'B')" :class="['btn-opcion', { 'btn-incorrecto': respuestas.p3 === 'B' }]">
          <span v-if="respuestas.p3 === 'B'">❌ </span>B) <code>const nuevaConfig = config + { tema: 'claro' };</code>
        </button>
        <button @click="seleccionar('p3', 'C')" :class="['btn-opcion', { 'btn-correcto': respuestas.p3 === 'C' }]">
          <span v-if="respuestas.p3 === 'C'">✅ </span>C) <code>const nuevaConfig = { ...config, tema: 'claro' };</code>
        </button>
      </div>
      <div v-if="respuestas.p3" class="test-explicacion">
        <strong>Explicación:</strong> El operador Spread (<code>...</code>) vuelca las propiedades del objeto antiguo en un objeto totalmente nuevo en memoria, sobrescribiendo la propiedad deseada de forma segura sin mutar el original.
      </div>
    </div>

    <!-- PREGUNTA 4 -->
    <div class="test-card">
      <p class="test-pregunta">4. Si ejecutamos <code>Promise.all([p1, p2, p3])</code>, donde las dos primeras se resuelven correctamente pero la tercera es rechazada (rejected), ¿qué comportamiento observamos?</p>
      
      <div class="test-opciones">
        <button @click="seleccionar('p4', 'A')" :class="['btn-opcion', { 'btn-incorrecto': respuestas.p4 === 'A' }]">
          <span v-if="respuestas.p4 === 'A'">❌ </span>A) Espera y devuelve un array con los resultados de las dos promesas exitosas ignorando el fallo.
        </button>
        <button @click="seleccionar('p4', 'B')" :class="['btn-opcion', { 'btn-correcto': respuestas.p4 === 'B' }]">
          <span v-if="respuestas.p4 === 'B'">✅ </span>B) La promesa resultante se rechaza inmediatamente en cuanto p3 falla, sin esperar a las demás.
        </button>
        <button @click="seleccionar('p4', 'C')" :class="['btn-opcion', { 'btn-incorrecto': respuestas.p4 === 'C' }]">
          <span v-if="respuestas.p4 === 'C'">❌ </span>C) Bloquea el hilo de ejecución principal de la aplicación de manera indefinida.
        </button>
      </div>
      <div v-if="respuestas.p4" class="test-explicacion">
        <strong>Explicación:</strong> <code>Promise.all</code> adopta una política de fallo rápido (fail-fast). Si una sola promesa falla, todo el conjunto se rechaza al instante.
      </div>
    </div>

    <!-- PREGUNTA 5 -->
    <div class="test-card">
      <p class="test-pregunta">5. ¿Qué expresión computa de forma inmutable la suma de las edades de los usuarios activos usando encadenamiento funcional?</p>
      <pre class="test-codigo"><code class="language-javascript">const users = [{edad: 20, active: true}, {edad: 30, active: false}];</code></pre>
      
      <div class="test-opciones">
        <button @click="seleccionar('p5', 'A')" :class="['btn-opcion', { 'btn-correcto': respuestas.p5 === 'A' }]">
          <span v-if="respuestas.p5 === 'A'">✅ </span>A) <code>users.filter(u => u.active).map(u => u.edad).reduce((a, b) => a + b, 0);</code>
        </button>
        <button @click="seleccionar('p5', 'B')" :class="['btn-opcion', { 'btn-incorrecto': respuestas.p5 === 'B' }]">
          <span v-if="respuestas.p5 === 'B'">❌ </span>B) <code>users.forEach(u => { if(u.active) total += u.edad });</code>
        </button>
        <button @click="seleccionar('p5', 'C')" :class="['btn-opcion', { 'btn-incorrecto': respuestas.p5 === 'C' }]">
          <span v-if="respuestas.p5 === 'C'">❌ </span>C) <code>users.map(u => u.edad).filter(u => u.active);</code>
        </button>
      </div>
      <div v-if="respuestas.p5" class="test-explicacion">
        <strong>Explicación:</strong> El encadenamiento de <code>.filter().map().reduce()</code> es el patrón limpio e inmutable por excelencia en desarrollo moderno para procesar colecciones de datos antes de renderizarlas.
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const respuestas = ref({
  p1: null,
  p2: null,
  p3: null,
  p4: null,
  p5: null
})

const seleccionar = (pregunta, opcion) => {
  respuestas.value[pregunta] = opcion
}
</script>

<style scoped>
.test-card {
  background-color: var(--vp-c-bg-soft);
  padding: 1.5rem;
  border-radius: 8px;
  margin: 1.5rem 0;
  border: 1px solid var(--vp-c-border);
}
.test-pregunta {
  font-weight: bold;
  margin-top: 0;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}
.test-codigo {
  margin: 1rem 0;
  background: var(--vp-c-bg-alt);
  padding: 1rem;
  border-radius: 4px;
}
.test-opciones {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  margin-top: 1rem;
}
.btn-opcion {
  padding: 0.8rem 1rem;
  text-align: left; /* Eliminado textAlignment inline problemático */
  border: 1px solid var(--vp-c-border);
  border-radius: 6px;
  cursor: pointer;
  background-color: var(--vp-c-bg);
  transition: all 0.2s ease;
  color: var(--vp-c-text-1);
}
.btn-opcion:hover {
  border-color: var(--vp-c-brand);
}
.btn-incorrecto {
  background-color: var(--vp-c-danger-soft) !important;
  color: var(--vp-c-danger-1) !important;
  border-color: var(--vp-c-danger-2) !important;
}
.btn-correcto {
  background-color: var(--vp-c-success-soft) !important;
  color: var(--vp-c-success-1) !important;
  border-color: var(--vp-c-success-2) !important;
  font-weight: bold;
}
.test-explicacion {
  background-color: var(--vp-c-brand-soft);
  padding: 1rem;
  border-left: 4px solid var(--vp-c-brand);
  border-radius: 4px;
  margin-top: 1rem;
  font-size: 0.95rem;
  color: var(--vp-c-text-1);
}
</style>
