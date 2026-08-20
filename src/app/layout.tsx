import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "TaskManager", template: "%s | TaskManager" },
  description: "Organiza tu trabajo y mantén el foco.",
  icons: { icon: "/favicon.svg" },
};

const navigation = [
  ["Resumen", "/"],
  ["Tareas", "/tasks"],
  ["Proyectos", "/projects"],
  ["Notificaciones", "/notifications"],
  ["Perfil", "/profile"],
] as const;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <div className="min-h-screen lg:flex">
          <aside className="hidden w-64 shrink-0 border-r border-black/10 bg-black px-6 py-8 text-white lg:block">
            <Link href="/" className="mb-14 block">
              <span className="text-sm uppercase tracking-[0.3em] text-white/50">TaskManager</span>
              <h1 className="mt-3 text-2xl font-semibold tracking-tight">Work clearly.</h1>
            </Link>
            <nav className="space-y-2" aria-label="Menú principal">
              {navigation.map(([label, href]) => (
                <Link key={href} href={href} className="block rounded-full px-4 py-3 text-sm text-white/60 transition hover:bg-white hover:text-black">
                  {label}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="min-w-0 flex-1">
            <header className="flex items-center justify-between border-b border-black/10 px-6 py-6 md:px-12">
              <span className="text-xs uppercase tracking-[0.25em] text-black/40">TaskManager</span>
              <Link href="/profile" aria-label="Abrir perfil" className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-medium text-white">AD</Link>
            </header>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
