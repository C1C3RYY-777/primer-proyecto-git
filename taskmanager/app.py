# Importamos Path para construir rutas compatibles con Windows y despliegue.
from pathlib import Path

# Importamos Flask y las funciones necesarias.
from flask import Flask, render_template

# Importamos la instancia de base de datos y el modelo Task.
from task import db


# Obtenemos la carpeta donde está este archivo.
BASE_DIR = Path(__file__).resolve().parent

# Creamos la aplicación Flask.
app = Flask(__name__)

# Configuramos SQLite dentro de la carpeta instance.
app.config["SQLALCHEMY_DATABASE_URI"] = (
    f"sqlite:///{BASE_DIR / 'instance' / 'tasks.db'}"
)

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
def index():
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


# Iniciamos el servidor cuando ejecutamos: python app.py
if __name__ == "__main__":
    app.run(debug=True)