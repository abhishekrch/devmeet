import { getDb } from './config';
import * as schema from './schema';

export const db = getDb();
export { schema };