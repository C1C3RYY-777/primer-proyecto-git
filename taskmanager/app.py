# Importamos Path para construir rutas compatibles con Windows y despliegue.
import os
from pathlib import Path

# Importamos Flask y las funciones necesarias.
from flask import Flask, jsonify, render_template, request

try:
    from .task import Task, db
except ImportError:
    from task import Task, db


# Obtenemos la carpeta donde está este archivo.
BASE_DIR = Path(__file__).resolve().parent
INSTANCE_DIR = BASE_DIR / "instance"
INSTANCE_DIR.mkdir(exist_ok=True)

# Creamos la aplicación Flask.
app = Flask(__name__)

# Configuramos SQLite dentro de la carpeta instance.
database_path = Path(
    os.environ.get("TASKS_DB_PATH", INSTANCE_DIR / "tasks.db")
)
if os.environ.get("VERCEL"):
    database_path = Path("/tmp/tasks.db")

app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{database_path}"

# Desactivamos una función que no necesitamos y evita avisos innecesarios.
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Conectamos SQLAlchemy con Flask.
db.init_app(app)

# Creamos la carpeta y las tablas al iniciar la aplicación.
with app.app_context():
    (BASE_DIR / "instance").mkdir(exist_ok=True)
    db.create_all()


# Página principal.
@app.route("/")
@app.route("/dashboard")
def dashboard():
    return render_template("index.html")


# Página de tareas.
@app.route("/tasks")
def tasks_page():
    return render_template("tasks.html")


# Rutas provisionales para el menú.
@app.route("/projects")
def projects_page():
    return render_template("index.html")


@app.route("/notifications")
def notifications_page():
    return render_template("index.html")


@app.route("/profile")
def profile_page():
    return render_template("index.html")


@app.get("/api/tasks")
def get_tasks():
    tasks = Task.query.order_by(Task.created_at.desc()).all()
    return jsonify([task.to_dict() for task in tasks])


@app.post("/api/tasks")
def create_task():
    data = request.get_json(silent=True) or {}
    title = str(data.get("title", "")).strip()

    if not title:
        return jsonify({"error": "El título es obligatorio"}), 400

    task = Task(
        title=title,
        description=str(data.get("description", "")).strip(),
    )
    db.session.add(task)
    db.session.commit()
    return jsonify(task.to_dict()), 201


@app.patch("/api/tasks/<int:task_id>")
def update_task(task_id):
    task = db.session.get(Task, task_id)
    if task is None:
        return jsonify({"error": "Tarea no encontrada"}), 404

    data = request.get_json(silent=True) or {}
    if "title" in data:
        title = str(data["title"]).strip()
        if not title:
            return jsonify({"error": "El título es obligatorio"}), 400
        task.title = title
    if "description" in data:
        task.description = str(data["description"]).strip()
    if "is_completed" in data:
        task.is_completed = bool(data["is_completed"])

    db.session.commit()
    return jsonify(task.to_dict())


@app.delete("/api/tasks/<int:task_id>")
def delete_task(task_id):
    task = db.session.get(Task, task_id)
    if task is None:
        return jsonify({"error": "Tarea no encontrada"}), 404

    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Tarea eliminada"})


# Iniciamos el servidor cuando ejecutamos: python app.py
if __name__ == "__main__":
    app.run(debug=True)