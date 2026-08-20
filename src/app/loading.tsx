export default function Loading() {
  return (
    <section className="px-6 py-8 lg:px-16 lg:py-12 animate-pulse">
      <div className="mx-auto max-w-6xl">
        <div className="h-8 w-48 rounded-lg bg-neutral-200" />
        <div className="mt-12 h-16 w-3/4 rounded-lg bg-neutral-200" />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="h-36 rounded-3xl bg-neutral-200" />
          <div className="h-36 rounded-3xl bg-neutral-200" />
          <div className="h-36 rounded-3xl bg-neutral-200" />
          <div className="h-36 rounded-3xl bg-neutral-200" />
        </div>
      </div>
    </section>
  );
}
