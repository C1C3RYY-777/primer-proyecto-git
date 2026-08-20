import Link from "next/link";
import { listTasks } from "@/lib/tasks";
import type { Task } from "@/types/task";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const tasks = await listTasks();
  const completed = tasks.filter((task: Pick<Task, "isCompleted">) => task.isCompleted).length;

  return (
    <section className="px-6 py-8 lg:px-16 lg:py-12">
      <header className="mx-auto flex max-w-6xl items-center justify-between">
        <div><p className="mb-3 text-xs uppercase tracking-[0.3em] text-black/40">Workspace</p><h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Dashboard<span className="text-black/30">.</span></h1></div>
        <Link href="/tasks" className="rounded-full bg-black px-5 py-3 text-sm text-white transition hover:bg-black/75">Nueva tarea</Link>
      </header>
      <div className="mx-auto mt-24 max-w-6xl">
        <p className="mb-6 text-sm text-black/45">Organiza tu trabajo. Mantén el foco.</p>
        <h2 className="max-w-3xl text-5xl font-semibold leading-[0.95] tracking-tight sm:text-8xl">Haz menos.<br /><span className="text-black/35">Consigue más.</span></h2>
        <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Total" value={tasks.length} detail="Tareas" dark />
          <Stat label="Completadas" value={completed} detail="Tareas" />
          <Stat label="Proyectos" value={Math.max(3, tasks.length)} detail="Activos" />
          <Stat label="Avisos" value={Math.max(2, tasks.length - completed + 1)} detail="Nuevos" />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, detail, dark = false }: { label: string; value: number; detail: string; dark?: boolean }) {
  return <article className={`rounded-3xl border border-black/10 p-6 transition hover:-translate-y-1 ${dark ? "bg-black text-white" : "bg-white"}`}><span className={dark ? "text-white/55" : "text-black/45"}>{label}</span><strong className="mt-8 block text-5xl font-semibold">{value}</strong><small className={dark ? "mt-2 block text-white/50" : "mt-2 block text-black/45"}>{detail}</small></article>;
}
