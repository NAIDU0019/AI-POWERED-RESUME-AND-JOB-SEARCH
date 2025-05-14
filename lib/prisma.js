import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
export default db;
// globalThis.prisma: This global variable ensures that the Prisma client instance is
// reused across hot reloads during development. Without this, each time your application
// reloads, a new instance of the Prisma client would be created, potentially leading
// to connection issues.
// process.env.NODE_ENV !== "production": This condition checks if the application is
// running in a production environment. If it's not (i.e., during development), it assigns
// the Prisma client instance to the global variable. This is a common pattern in Next.js
// applications to prevent multiple instances of the Prisma client from being created
// during development, which can lead to performance issues and connection limits being
// exceeded.