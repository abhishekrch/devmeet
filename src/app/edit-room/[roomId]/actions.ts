'use server'

import { editRoom, getRoom } from "@/data-access/rooms";
import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function editRoomAction(roomData: Omit<Room, "userId">) {
    const session = await getSession();

    if(!session) {
        throw new Error("You must be logged in to create this room")
    }

    const room = await getRoom(roomData.id);

    if (room?. userId !== session.user.id) {
        throw new Error("User not authorized");
    }
    
    const updatedRoom = await editRoom({ ...roomData, userId: room.userId });
    
    revalidatePath("/your-rooms");
    revalidatePath(`/edit-room/${roomData.id}`);
    return updatedRoom;
}
