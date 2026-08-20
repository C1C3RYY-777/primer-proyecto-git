import { describe, expect, it } from "vitest";
import { GET, POST } from "@/app/api/tasks/route";
import { DELETE, PATCH } from "@/app/api/tasks/[id]/route";

describe("Route Handlers de tareas", () => {
  it("crea, actualiza, lista y elimina una tarea", async () => {
    const createdResponse = await POST(new Request("http://localhost/api/tasks", { method: "POST", body: JSON.stringify({ title: "Integración", description: "Prueba" }), headers: { "Content-Type": "application/json" } }));
    expect(createdResponse.status).toBe(201);
    const created = await createdResponse.json();

    const listResponse = await GET();
    expect((await listResponse.json()).some((task: { id: number }) => task.id === created.id)).toBe(true);

    const updatedResponse = await PATCH(new Request("http://localhost/api/tasks/1", { method: "PATCH", body: JSON.stringify({ isCompleted: true }), headers: { "Content-Type": "application/json" } }), { params: Promise.resolve({ id: String(created.id) }) });
    expect((await updatedResponse.json()).isCompleted).toBe(true);

    const deletedResponse = await DELETE(new Request("http://localhost/api/tasks/1", { method: "DELETE" }), { params: Promise.resolve({ id: String(created.id) }) });
    expect(deletedResponse.status).toBe(200);
  });
});