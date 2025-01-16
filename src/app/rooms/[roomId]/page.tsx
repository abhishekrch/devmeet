import { getRoom } from "@/app/data-access/rooms";
import { Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default async function RoomPage({
params,
}: {
  params: { roomId: string };
}) {
  const roomId = params.roomId;
  const room = await getRoom(roomId);

  if (!room) {
    return <div>No Room Found</div>;
  }

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div
          className="rounded-lg border bg-card text-card-foreground 
                shadow-sm p-12"
        >
          Video Player
        </div>
      </div>

      <div className="col-span-1 p-4 pl-2">
        <div
          className="rounded-lg border bg-card text-card-foreground 
                shadow-sm p-4 flex flex-col gap-4"
        >
          <h1 className="text-base">{room?.name}</h1>
          <p className="text-base text-gray-600">{room?.description}</p>
          <Badge className="w-fit">{room.language}</Badge>
          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex items-center gap-2"
              target="_blank"
              rel="noopender noreferrer"
            >
              <Github />
              Github Project
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
