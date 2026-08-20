import { z } from "zod";

export const taskInputSchema = z.object({
  title: z.string().trim().min(1, "El título es obligatorio").max(200),
  description: z.string().trim().max(5000).default(""),
});

export const taskUpdateSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    description: z.string().trim().max(5000).optional(),
    isCompleted: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, "No hay cambios que guardar");

export type TaskInput = z.infer<typeof taskInputSchema>;
export type TaskUpdate = z.infer<typeof taskUpdateSchema>;
