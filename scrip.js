// 1. Seleccionamos los elementos de la pantalla usando sus ID
const formulario = document.getElementById('form-tarea');
const inputTitulo = document.getElementById('input-titulo');
const listaTareas = document.querySelector('.task-list');

// 2. Escuchamos el evento cuando el usuario envía el formulario
formulario.addEventListener('submit', function(event) {
    // Evitamos que la página se recargue automáticamente (comportamiento por defecto)
    event.preventDefault();

    // Guardamos el texto que escribió el usuario
    const textoTarea = inputTitulo.value;

    // Imprimimos el texto en la consola del navegador para verificar
    console.log("Nueva tarea capturada:", textoTarea);

    // Limpiamos la caja de texto para la siguiente tarea
    inputTitulo.value = '';
});