import app as app_module
import pytest


def test_task_lifecycle(client):
    response = client.post(
        "/api/tasks",
        json={"title": "Preparar despliegue", "description": "Comprobar Vercel"},
    )

    assert response.status_code == 201
    task_id = response.get_json()["id"]

    response = client.patch(f"/api/tasks/{task_id}", json={"is_completed": True})
    assert response.status_code == 200
    assert response.get_json()["is_completed"] is True

    response = client.delete(f"/api/tasks/{task_id}")
    assert response.status_code == 204


def test_task_validation(client):
    assert client.post("/api/tasks", json={"title": " "}).status_code == 400
    assert client.patch("/api/tasks/999999", json={"is_completed": True}).status_code == 404


@pytest.fixture
def client():
    app_module.app.config.update(TESTING=True)
    with app_module.app.test_client() as test_client:
        yield test_client