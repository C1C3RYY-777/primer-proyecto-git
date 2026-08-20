import { test, expect } from "@playwright/test";

test("navega al listado de tareas y muestra el formulario", async ({ page }) => {
  await page.goto("/tasks");
  await expect(page.getByRole("heading", { name: "Haz espacio para lo importante." })).toBeVisible();
  await expect(page.getByPlaceholder("Título de la tarea")).toBeVisible();
  await page.getByPlaceholder("Título de la tarea").fill("Tarea E2E");
  await page.getByRole("button", { name: "Añadir" }).click();
  await expect(page.getByRole("heading", { name: "Tarea E2E" })).toBeVisible();
  await page.getByRole("button", { name: "Completar" }).click();
  await expect(page.getByText("Completada")).toBeVisible();
});
