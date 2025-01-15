import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing");
}

const queryClient = postgres(process.env.DATABASE_URL);

const db = drizzle(queryClient, { schema });

export const getDb = () => {
  if (process.env.NODE_ENV === "production") {
    return db;
  }

  if (!global.db) {
    global.db = db;
  }
  return global.db;
};

declare global {
  // eslint-disable-next-line no-var
  var db: ReturnType<typeof drizzle<typeof schema>> | undefined;
}
