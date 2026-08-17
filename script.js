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

    // Creamos una nueva tarea
    const nuevatarea=document.createElement('div')
    nuevatarea.classList.add('task-card')

    const titulo=document.createElement('h3')
    titulo.textContent=textoTarea;

    const descripcion=document.createElement('span');
    const estado=document.createElement('span');
    estado.textContent ='pendiente';
    descripcion.classList.add('status', 'pendiente')

    const eliminar=document.createElement('button');
    eliminar.textContent='Eliminar';
    eliminar.classList.add('delete-button');
    

    nuevatarea.appendChild(eliminar)
    nuevatarea.appendChild(titulo);
    nuevatarea.appendChild(descripcion);
    nuevatarea.appendChild(estado);
    listaTareas.appendChild(nuevatarea);

    // Imprimimos el texto en la consola del navegador para verificar
    console.log("Nueva tarea capturada:", textoTarea);

    // Limpiamos la caja de texto para la siguiente tarea
    inputTitulo.value = '';
});
 //escuchar el click para eliminar la tarea especifica
eliminarTarea.addEventListener('click',function(){
    nuevatarea.remove();
}) 
 //escuchar el click para modificar la tarea
estado.addEventListener('click',function(){
    estado.textContent='completado'
    estado.classList.remove('pendiente')
    estado.classList.add('complentada')
})
