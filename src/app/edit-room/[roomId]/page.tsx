import { getRoom } from "@/data-access/rooms";
import { EditRoomForm } from "./edit-room-form";
import { unstable_noStore } from "next/cache";

export default async function EditRoomPage({
    params,
  }: {
    params: { roomId: string };
  }) {
    unstable_noStore();
    const room = await getRoom(params.roomId);

    if (!room) {
        return <div>Room not found</div>;
      }
    
    return (
        <div className="container mx-auto flex flex-col gap-8 pt-12 pb-12">
            <div className="text-4xl font-bold">
                Edit Room
                <EditRoomForm room={room}/>
            </div>
        </div>
    )
}