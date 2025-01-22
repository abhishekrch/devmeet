import { getRoom } from "@/data-access/rooms";
import { EditRoomForm } from "./edit-room-form";
import { unstable_noStore } from "next/cache";

type Params = Promise<{ roomId: string }>;

export default async function EditRoomPage({
    params,
  }: {
    params: Params;
  }) {
    unstable_noStore();
    const resolvedParams = await params;
    const room = await getRoom(resolvedParams.roomId);

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