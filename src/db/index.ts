import { getDb } from './config';
import * as schema from './schema';
import { drizzle } from 'drizzle-orm/postgres-js';

export const db = getDb() as ReturnType<typeof drizzle<typeof schema>>;

export { schema };

export type { Room } from './schema';