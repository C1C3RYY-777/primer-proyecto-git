# TaskManager

TaskManager es una aplicación de gestión de tareas migrada de Flask a Next.js. Mantiene el flujo existente de crear, listar, completar y eliminar tareas, con React y TypeScript en el frontend, Route Handlers en el backend y Prisma sobre MySQL.

## Stack

- Next.js 16 con App Router
- React 19 y TypeScript estricto
- Tailwind CSS 4 compilado mediante PostCSS
- Prisma 6 y MySQL
- Zod para validación server-side
- Vitest para unit e integration tests
- Playwright para E2E
- ESLint y GitHub Actions

## Desarrollo local

Requisitos: Node.js 20 o superior y una instancia MySQL accesible.

```bash
npm install
cp .env.example .env.local
npm run db:push
npm run dev
```

En Windows PowerShell, copia `.env.example` a `.env.local` manualmente y configura `DATABASE_URL`.

## Variables de entorno

`DATABASE_URL` es privada y debe contener la URL de conexión MySQL. No se expone al navegador ni debe subirse a Git. `.env.example` contiene solo el formato esperado.

Para Vercel se configura la misma variable en los entornos Preview y Production. `PLAYWRIGHT_BASE_URL` solo se usa para ejecutar E2E contra una URL concreta.

## Calidad y build

```bash
npm run lint
npm run typecheck
npm test
npm run test:e2e
npm run build
npm run start
```

`npm run test:e2e` inicia un servidor Next temporal y usa un almacén en memoria únicamente cuando Playwright establece `TASKMANAGER_TEST_MODE=1`. La producción siempre usa Prisma/MySQL.

## Prisma y MySQL

El esquema está en `prisma/schema.prisma` y reproduce el modelo original `Task`: título, descripción, estado y fecha de creación. Para una base nueva local se puede usar `npm run db:push`. Para un flujo de migraciones versionadas, genera una migración con una base MySQL disponible y despliega con `npm run db:migrate`.

No se ha conectado ninguna base MySQL real ni se han ejecutado migraciones destructivas. La base SQLite del proyecto Flask se conserva fuera del runtime Next como respaldo local.

## Vercel

1. Importa el repositorio de GitHub en Vercel.
2. Usa la raíz del repositorio como **Root Directory**.
3. Selecciona Next.js; no hace falta `vercel.json`.
4. Añade `DATABASE_URL` en Preview y Production con las credenciales del proveedor MySQL.
5. Ejecuta `npm run db:push` una sola vez contra la base nueva, o configura migraciones Prisma versionadas antes del primer deployment con datos.
6. Despliega y comprueba `/`, `/tasks` y el CRUD desde la URL Preview antes de promover a Production.

La persistencia requiere MySQL real: el proyecto no usa SQLite en la aplicación Next y no incluye credenciales.

## Estructura

```text
src/app/              páginas App Router y Route Handlers
src/components/       componentes React
src/lib/              Prisma, servicios y validaciones
prisma/schema.prisma  modelo MySQL
e2e/                  pruebas Playwright
.github/workflows/    CI de lint, tipos, tests, E2E y build
taskmanager/          código Flask legado conservado como respaldo local
```