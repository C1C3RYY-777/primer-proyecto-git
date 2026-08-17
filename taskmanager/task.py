# Importamos datetime para guardar la fecha de creación.
from datetime import datetime

# Importamos SQLAlchemy para crear el modelo.
try:
    from flask_sqlalchemy import SQLAlchemy
except ImportError as e:
    raise ImportError("flask_sqlalchemy no está instalado. Ejecuta: pip install flask-sqlalchemy") from e

# Creamos la instancia de SQLAlchemy.
db = SQLAlchemy()

# Modelo principal de la aplicación.
class Task(db.Model):
    __tablename__ = "tasks"

    # ID de la tarea
    id = db.Column(db.Integer, primary_key=True)

    # Título obligatorio
    title = db.Column(db.String(200), nullable=False)

    # Descripción opcional
    description = db.Column(db.Text, default="")

    # Estado de la tarea
    is_completed = db.Column(db.Boolean, default=False, nullable=False)

    # Fecha de creación
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)

    # Representación útil para depurar
    def __repr__(self):
        return f"<Task {self.id}: {self.title} (Completada: {self.is_completed})>"