import { listTasks } from "@/lib/tasks";
import { TaskManager } from "@/components/task-manager";
import type { Task } from "@/types/task";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const tasks = await listTasks();
  return <TaskManager initialTasks={tasks.map((task: Omit<Task, "createdAt"> & { createdAt: Date }) => ({ ...task, createdAt: task.createdAt.toISOString() }))} />;
}
