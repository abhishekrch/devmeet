import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from "./schema";

declare global {
  var db: ReturnType<typeof drizzle> | undefined;
}

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing');
}

const queryClient = postgres(process.env.DATABASE_URL);

export const db = drizzle(queryClient, {
  schema,
});

export const getDb = () => {
  if (process.env.NODE_ENV === 'production') {
    return db;
  }
  
  if (!global.db) {
    global.db = db;
  }
  return global.db;
}; 