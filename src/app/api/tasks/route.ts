import { NextResponse } from "next/server";
import { createTask, listTasks } from "@/lib/tasks";
import { taskInputSchema } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  const tasks = await listTasks();
  return NextResponse.json(tasks);
}

export async function POST(request: Request) {
  const parsed = taskInputSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Datos inválidos" }, { status: 400 });
  const task = await createTask(parsed.data);
  return NextResponse.json(task, { status: 201 });
}
