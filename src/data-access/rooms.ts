import { db } from "@/db";
import { eq, like } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { room } from "@/db/schema";
import { getSession } from "@/lib/auth";

export async function getRooms(search: string | undefined) {
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  // unstable_noStore();
  const rooms = await db.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getUserRooms() {
  unstable_noStore();
  const session = await getSession()
  if (!session) {
    throw new Error("User not authenticated")
  }
  const rooms = await db.query.room.findMany({
    where: eq(room.userId, session.user.id)
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  unstable_noStore();
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  })
}