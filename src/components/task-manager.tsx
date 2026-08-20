"use client";

import { useState, useTransition } from "react";
import type { Task } from "@/types/task";

export function TaskManager({ initialTasks }: { initialTasks: Task[] }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  function refreshTasks() {
    startTransition(async () => {
      const response = await fetch("/api/tasks", { cache: "no-store" });
      if (response.ok) setTasks(await response.json());
    });
  }

  async function createTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/tasks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, description }) });
    const data = await response.json();
    if (!response.ok) { setError(data.error ?? "No se pudo crear la tarea."); return; }
    setTitle(""); setDescription("");
    refreshTasks();
  }

  function toggleTask(task: Task) {
    startTransition(async () => {
      await fetch(`/api/tasks/${task.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ isCompleted: !task.isCompleted }) });
      refreshTasks();
    });
  }

  function removeTask(id: number) {
    startTransition(async () => {
      await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      refreshTasks();
    });
  }

  return (
    <section className="px-6 py-12 md:px-12 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 max-w-3xl"><p className="mb-5 text-xs uppercase tracking-[0.3em] text-black/40">Organización personal</p><h1 className="text-5xl font-semibold leading-none tracking-tight md:text-7xl">Haz espacio para lo importante.</h1><p className="mt-8 max-w-xl text-lg leading-relaxed text-black/55">Administra tus tareas desde un solo lugar.</p></div>
        <div className="mb-8"><h2 className="text-2xl font-semibold tracking-tight">Mis tareas</h2><p className="mt-2 text-sm text-black/45">Organiza tu trabajo diario.</p></div>
        <form onSubmit={createTask} className="mb-10 grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          <label className="sr-only" htmlFor="task-title">Título</label><input id="task-title" required maxLength={200} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Título de la tarea" className="rounded-xl border border-black/15 bg-white px-4 py-3" />
          <label className="sr-only" htmlFor="task-description">Descripción</label><input id="task-description" value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Descripción (opcional)" className="rounded-xl border border-black/15 bg-white px-4 py-3" />
          <button disabled={isPending} type="submit" className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white disabled:opacity-50">{isPending ? "Guardando..." : "Añadir"}</button>
        </form>
        {error && <p role="alert" className="mb-6 text-sm text-red-700">{error}</p>}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {tasks.length === 0 && <p className="text-black/50">No hay tareas por ahora.</p>}
          {tasks.map((task) => <article key={task.id} className={`rounded-2xl border border-black/10 bg-white p-5 ${task.isCompleted ? "opacity-60" : ""}`}><h3 className={`text-lg font-semibold ${task.isCompleted ? "line-through" : ""}`}>{task.title}</h3><p className="mt-3 min-h-6 text-sm text-black/55">{task.description || "Sin descripción."}</p><span className="mt-5 inline-block text-xs uppercase tracking-wider text-black/45">{task.isCompleted ? "Completada" : "Pendiente"}</span><div className="mt-5 flex gap-3"><button type="button" onClick={() => toggleTask(task)} disabled={isPending} className="rounded-lg bg-black px-3 py-2 text-xs text-white disabled:opacity-50">{task.isCompleted ? "Reabrir" : "Completar"}</button><button type="button" onClick={() => removeTask(task.id)} disabled={isPending} className="rounded-lg border border-black/15 px-3 py-2 text-xs disabled:opacity-50">Eliminar</button></div></article>)}
        </div>
      </div>
    </section>
  );
}
