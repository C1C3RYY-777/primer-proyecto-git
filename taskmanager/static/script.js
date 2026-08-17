const formulario = document.getElementById('form-tarea');
const inputTitulo = document.getElementById('input-titulo');
const listaTareas = document.querySelector('.task-list');
const btnNuevaTarea = document.getElementById('btn-nueva-tarea');

const colores = [
    '#8b5cf6',
    '#a78bfa',
    '#c084fc',
    '#7c3aed',
    '#9d6bff',
    '#b794f4'
];

function crearTarjeta(titulo) {
    const card = document.createElement('article');
    card.classList.add('task-card');

    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    card.style.setProperty('--card-accent', colorAleatorio);

    const header = document.createElement('div');
    header.classList.add('task-card-header');

    const tituloElement = document.createElement('h3');
    tituloElement.textContent = titulo;

    const estado = document.createElement('span');
    estado.classList.add('status', 'pendiente');
    estado.textContent = 'Pendiente';

    const descripcion = document.createElement('p');
    descripcion.textContent = 'Sin descripción adicional';

    const footer = document.createElement('div');
    footer.classList.add('task-card-footer');

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('delete-button');

    header.appendChild(tituloElement);
    header.appendChild(estado);

    footer.appendChild(deleteButton);

    card.appendChild(header);
    card.appendChild(descripcion);
    card.appendChild(footer);

    estado.addEventListener('click', () => {
        const completada = card.classList.toggle('completada');

        estado.classList.toggle('completada', completada);
        estado.classList.toggle('pendiente', !completada);
        estado.textContent = completada ? 'Completada' : 'Pendiente';
    });

    deleteButton.addEventListener('click', () => {
        card.remove();
    });

    return card;
}

formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    const textoTarea = inputTitulo.value.trim();

    if (!textoTarea) {
        inputTitulo.focus();
        return;
    }

    const nuevaTarea = crearTarjeta(textoTarea);
    listaTareas.appendChild(nuevaTarea);

    formulario.reset();
    inputTitulo.focus();
});

btnNuevaTarea.addEventListener('click', () => {
    inputTitulo.focus();
});
