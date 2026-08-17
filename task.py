from datetime import datetime


class Task:
    """Modelo que representa una tarea dentro del sistema TaskManager."""
    
    def __init__(self, task_id: int, title: str, description: str = ""):
        self.id = task_id
        self.title = title
        self.description = description
        self.is_completed = False
        self.created_at = datetime.now()

    def __repr__(self):
        return f"<Task {self.id}: {self.title} (Completada: {self.is_completed})>"