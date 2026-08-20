"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error en tiempo de ejecución:", error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mx-auto max-w-md rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
        <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
          Servicio no disponible
        </span>
        <h2 className="mt-4 text-2xl font-semibold tracking-tight text-neutral-900">
          No se pudieron cargar los datos
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          Ocurrió un error al conectar con la base de datos. Por favor verifica la variable de entorno DATABASE_URL en Vercel o la conexión con PostgreSQL / Neon.
        </p>
        {error.digest && (
          <p className="mt-3 text-xs font-mono text-neutral-400">
            Error digest: {error.digest}
          </p>
        )}
        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={() => reset()}
            className="rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="rounded-xl border border-neutral-300 bg-white px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </section>
  );
}
