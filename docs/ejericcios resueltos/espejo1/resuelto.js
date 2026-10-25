// Lógica de inicialización asíncrona (Simulación de red)
async function inicializarApp() {
  await new Promise(resolve => setTimeout(resolve, 1500));
  document.querySelector('#loading-state').style.display = 'none';
  pintarTareas();
}

// Renderizado dinámico e inmutable aplicando filtros
function pintarTareas() {
  const lista = document.querySelector('#lista-tareas');
  lista.innerHTML = '';
  
  const filtradas = tareas.filter(t => 
    filtroActual === 'Todas' ? true : (filtroActual === 'Completadas' ? t.completada : !t.completada)
  );

  filtradas.forEach(t => {
    const li = document.createElement('li');
    li.className = `item-tarea ${t.prioridad} ${t.completada ? 'completada' : ''}`;
    li.innerHTML = `<span>${t.titulo}</span><button>${t.completada ? 'Deshacer' : 'Completar'}</button>`;
    
    li.querySelector('button').addEventListener('click', () => {
      tareas = tareas.map(item => item.id === t.id ? { ...item, completada: !item.completada } : item);
      pintarTareas();
    });
    lista.appendChild(li);
  });
}
