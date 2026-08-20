import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mx-auto max-w-md rounded-3xl border border-black/10 bg-white p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-black/40">404</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-neutral-900">
          Página no encontrada
        </h2>
        <p className="mt-2 text-sm text-neutral-600">
          La página solicitada no existe o fue movida.
        </p>
        <Link
          href="/"
          className="mt-6 inline-block rounded-xl bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
        >
          Volver al inicio
        </Link>
      </div>
    </section>
  );
}
