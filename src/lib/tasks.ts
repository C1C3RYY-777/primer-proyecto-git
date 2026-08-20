import { prisma } from "@/lib/db";
import type { TaskInput, TaskUpdate } from "@/lib/validation";

type TaskRecord = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  createdAt: Date;
};

const memoryTasks: TaskRecord[] = [];
let nextMemoryId = 1;
const useMemoryStore = process.env.TASKMANAGER_TEST_MODE === "1";

export async function listTasks() {
  if (useMemoryStore) return [...memoryTasks].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return prisma.task.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createTask(input: TaskInput) {
  if (useMemoryStore) {
    const task = { id: nextMemoryId++, ...input, isCompleted: false, createdAt: new Date() };
    memoryTasks.push(task);
    return task;
  }
  return prisma.task.create({ data: input });
}

export async function updateTask(id: number, input: TaskUpdate) {
  if (useMemoryStore) {
    const task = memoryTasks.find((item) => item.id === id);
    if (!task) throw new Error("Tarea no encontrada");
    Object.assign(task, input);
    return task;
  }
  return prisma.task.update({ where: { id }, data: input });
}

export async function deleteTask(id: number) {
  if (useMemoryStore) {
    const index = memoryTasks.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Tarea no encontrada");
    memoryTasks.splice(index, 1);
    return;
  }
  return prisma.task.delete({ where: { id } });
}
