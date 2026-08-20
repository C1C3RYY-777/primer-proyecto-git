# Importamos Path para construir rutas compatibles con Windows y despliegue.
import os
from pathlib import Path

# Importamos Flask y las funciones necesarias.
from flask import Flask, jsonify, render_template, request

# Importamos la instancia de base de datos y el modelo Task.
from task import Task, db

# Obtenemos la carpeta donde está este archivo.
BASE_DIR = Path(__file__).resolve().parent

# Creamos la aplicación Flask.
app = Flask(__name__)

database_url = os.environ.get("DATABASE_URL")
if database_url and database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

if not database_url:
    database_path = Path(
        os.environ.get(
            "TASK_DB_PATH",
            "/tmp/tasks.db"
            if os.environ.get("VERCEL")
            else str(BASE_DIR / "instance" / "tasks.db"),
        )
    )
    database_path.parent.mkdir(parents=True, exist_ok=True)
    database_url = f"sqlite:///{database_path}"

app.config["SQLALCHEMY_DATABASE_URI"] = database_url
app.config["SECRET_KEY"] = os.environ.get("SECRET_KEY", "development-only-key")

# Desactivamos una función que no necesitamos y evita avisos innecesarios.
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Conectamos SQLAlchemy con Flask.
db.init_app(app)

# Creamos la carpeta y las tablas al iniciar la aplicación.
with app.app_context():
    db.create_all()


def serialize_task(task):
    return {
        "id": task.id,
        "title": task.title,
        "description": task.description or "",
        "is_completed": task.is_completed,
        "created_at": task.created_at.isoformat(),
    }


# Página principal.
@app.route("/")
def index():
    return render_template("index.html")


# Página de tareas.
@app.route("/tasks")
def tasks_page():
    return render_template("tasks.html")


@app.route("/api/tasks", methods=["GET"])
def list_tasks():
    tasks = Task.query.order_by(Task.created_at.desc()).all()
    return jsonify([serialize_task(task) for task in tasks])


@app.route("/api/tasks", methods=["POST"])
def create_task():
    payload = request.get_json(silent=True) or {}
    title = str(payload.get("title", "")).strip()

    if not title:
        return jsonify({"error": "El título es obligatorio."}), 400

    task = Task(title=title, description=str(payload.get("description", "")).strip())
    db.session.add(task)
    db.session.commit()
    return jsonify(serialize_task(task)), 201


@app.route("/api/tasks/<int:task_id>", methods=["PATCH", "DELETE"])
def update_or_delete_task(task_id):
    task = db.session.get(Task, task_id)
    if task is None:
        return jsonify({"error": "Tarea no encontrada."}), 404

    if request.method == "DELETE":
        db.session.delete(task)
        db.session.commit()
        return "", 204

    payload = request.get_json(silent=True) or {}
    if "is_completed" not in payload or not isinstance(payload["is_completed"], bool):
        return jsonify({"error": "is_completed debe ser booleano."}), 400

    task.is_completed = payload["is_completed"]
    db.session.commit()
    return jsonify(serialize_task(task))


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


# Iniciamos el servidor cuando ejecutamos: python app.py
if __name__ == "__main__":
    app.run(debug=True)