import pytest

from taskmanager.app import Task, app, db


@pytest.fixture
def client():
	app.config.update(TESTING=True)
	with app.test_client() as client:
		yield client
	with app.app_context():
		db.session.query(Task).delete()
		db.session.commit()


def test_pagina_principal_responde(client):
	response = client.get("/")

	assert response.status_code < 500


def test_crud_de_tareas(client):
	assert client.post("/api/tasks", json={}).status_code == 400

	response = client.post(
		"/api/tasks",
		json={"title": "Tarea de prueba", "description": "Detalle"},
	)

	assert response.status_code == 201
	task = response.get_json()

	response = client.patch(
		f"/api/tasks/{task['id']}",
		json={"is_completed": True},
	)

	assert response.status_code == 200
	assert response.get_json()["is_completed"] is True
	assert client.delete(f"/api/tasks/{task['id']}").status_code == 200
