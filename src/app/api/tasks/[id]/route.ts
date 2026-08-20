import { NextResponse } from "next/server";
import { deleteTask, updateTask } from "@/lib/tasks";
import { taskUpdateSchema } from "@/lib/validation";

function parseId(value: string) { const id = Number(value); return Number.isInteger(id) && id > 0 ? id : null; }

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = parseId((await params).id);
  if (!id) return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  const parsed = taskUpdateSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Datos inválidos" }, { status: 400 });
  try { return NextResponse.json(await updateTask(id, parsed.data)); } catch { return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 }); }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const id = parseId((await params).id);
  if (!id) return NextResponse.json({ error: "ID inválido" }, { status: 400 });
  try { await deleteTask(id); return NextResponse.json({ message: "Tarea eliminada" }); } catch { return NextResponse.json({ error: "Tarea no encontrada" }, { status: 404 }); }
}
