import { describe, expect, it } from "vitest";
import { taskInputSchema, taskUpdateSchema } from "@/lib/validation";

describe("validación de tareas", () => {
  it("acepta un título y normaliza espacios", () => {
    expect(taskInputSchema.parse({ title: "  Comprar leche  " })).toEqual({ title: "Comprar leche", description: "" });
  });
  it("rechaza títulos vacíos", () => {
    expect(taskInputSchema.safeParse({ title: "   " }).success).toBe(false);
  });
  it("rechaza actualizaciones vacías", () => {
    expect(taskUpdateSchema.safeParse({}).success).toBe(false);
  });
});
