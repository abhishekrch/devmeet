import { getRoom } from "@/app/data-access/rooms";
import { Github } from "lucide-react";
import Link from "next/link";
import { TagsList } from "@/components/tags-list";
import { DevMeet } from "./video-player";
import { splitTags } from "@/lib/utils";

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
          <DevMeet room={room} />
        </div>
      </div>

      <div className="col-span-1 p-4 pl-2">
        <div
          className="rounded-lg border bg-card text-card-foreground 
                shadow-sm p-4 flex flex-col gap-4"
        >
          <h1 className="text-base">{room?.name}</h1>
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
          <p className="text-base text-gray-600">{room?.description}</p>
          <TagsList tags={splitTags(room.tags) } />
        </div>
      </div>
    </div>
  );
}
