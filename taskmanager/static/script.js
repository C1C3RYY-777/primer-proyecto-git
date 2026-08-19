const navItems = document.querySelectorAll(".nav-item");
const views = document.querySelectorAll(".view");
const formulario = document.getElementById("form-tarea");
const inputTitulo = document.getElementById("input-titulo");
const inputDescripcion = document.getElementById("input-descripcion");
const listaTareas = document.getElementById("lista-tareas");
const btnNuevaTarea = document.getElementById("btn-nueva-tarea");

function cambiarVista(viewName) {
    navItems.forEach((item) => {
        item.classList.toggle("active", item.dataset.view === viewName);
    });

    views.forEach((view) => {
        const isActive = view.dataset.viewPanel === viewName;
        view.classList.toggle("active", isActive);
    });
}

navItems.forEach((button) => {
    button.addEventListener("click", () => {
        cambiarVista(button.dataset.view);
    });
});

function crearTarjeta(tarea) {
    const card = document.createElement("article");
    card.classList.add("task-card");

    if (tarea.is_completed) {
        card.classList.add("completada");
    }

    const titulo = document.createElement("h3");
    titulo.textContent = tarea.title;

    const descripcion = document.createElement("p");
    descripcion.textContent = tarea.description || "Sin descripción.";

    const estado = document.createElement("span");
    estado.classList.add("status");

    if (tarea.is_completed) {
        estado.classList.add("completada");
        estado.textContent = "Completada";
    } else {
        estado.classList.add("pendiente");
        estado.textContent = "Pendiente";
    }

    const acciones = document.createElement("div");
    acciones.classList.add("task-actions");

    const botonCompletar = document.createElement("button");
    botonCompletar.type = "button";
    botonCompletar.classList.add("task-button", "complete");
    botonCompletar.textContent = tarea.is_completed ? "Reabrir" : "Completar";

    const botonEliminar = document.createElement("button");
    botonEliminar.type = "button";
    botonEliminar.classList.add("task-button", "delete");
    botonEliminar.textContent = "Eliminar";

    botonCompletar.addEventListener("click", async () => {
        try {
            const response = await fetch(`/api/tasks/${tarea.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    is_completed: !tarea.is_completed
                })
            });

            if (!response.ok) {
                throw new Error("No se pudo cambiar el estado.");
            }

            await cargarTareas();
        } catch (error) {
            console.error(error.message);
        }
    });

    botonEliminar.addEventListener("click", async () => {
        try {
            const response = await fetch(`/api/tasks/${tarea.id}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                throw new Error("No se pudo eliminar la tarea.");
            }

            await cargarTareas();
        } catch (error) {
            console.error(error.message);
        }
    });

    acciones.appendChild(botonCompletar);
    acciones.appendChild(botonEliminar);

    card.appendChild(titulo);
    card.appendChild(descripcion);
    card.appendChild(estado);
    card.appendChild(acciones);

    return card;
}

async function cargarTareas() {
    try {
        const response = await fetch("/api/tasks");

        if (!response.ok) {
            throw new Error("No se pudieron cargar las tareas");
        }

        const tareas = await response.json();

        listaTareas.replaceChildren();

        tareas.forEach((tarea) => {
            listaTareas.appendChild(crearTarjeta(tarea));
        });

        actualizarEstadisticas(tareas);
    } catch (error) {
        console.error(error.message);
        listaTareas.innerHTML = "<p>No hay tareas por ahora.</p>";
    }
}

function actualizarEstadisticas(tareas) {
    const total = tareas.length;
    const completadas = tareas.filter((tarea) => tarea.is_completed).length;

    const totalNode = document.getElementById("stat-total");
    const completadasNode = document.getElementById("stat-completadas");
    const proyectosNode = document.getElementById("stat-proyectos");
    const notificacionesNode = document.getElementById("stat-notificaciones");

    if (totalNode) totalNode.textContent = total;
    if (completadasNode) completadasNode.textContent = completadas;
    if (proyectosNode) proyectosNode.textContent = Math.max(3, total);
    if (notificacionesNode) notificacionesNode.textContent = Math.max(2, total - completadas + 1);
}

formulario.addEventListener("submit", async (event) => {
    event.preventDefault();

    const titulo = inputTitulo.value.trim();
    const descripcion = inputDescripcion.value.trim();

    if (!titulo) {
        inputTitulo.focus();
        return;
    }

    try {
        const response = await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: titulo,
                description: descripcion
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "No se pudo crear la tarea.");
        }

        formulario.reset();
        inputTitulo.focus();
        await cargarTareas();
    } catch (error) {
        console.error(error.message);
    }
});

btnNuevaTarea.addEventListener("click", () => {
    cambiarVista("tasks");
    inputTitulo.focus();
});

cambiarVista("overview");
cargarTareas();
