import { db } from "@/db";
import { eq, like } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { room } from "@/db/schema";

export async function getRooms(search: string | undefined) {
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  // unstable_noStore();
  const rooms = await db.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  unstable_noStore();
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  })
}