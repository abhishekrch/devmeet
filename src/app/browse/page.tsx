import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getRooms } from "../../data-access/rooms";
import { SearchBar } from "./search-bar";
import { RoomCard } from "./room-card";
import { unstable_noStore } from "next/cache";
import Image from "next/image";

type SearchParams = Promise<{ search: string }>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  unstable_noStore();
  const params = await searchParams;
  const rooms = await getRooms(params.search);

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl"> Find Dev Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>
      <div className="mb-12">
        <SearchBar />
      </div>
      <div className="grid md:grid-cols-3 sm:grid-col-span-1 gap-4">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
      {rooms.length === 0 && (
        <div className="flex flex-col gap-4 justify-center items-center mt-24">
          <Image
            src="/no-data-found.svg"
            width="200"
            height="200"
            alt="no data image"
          />
          <h2 className="text-2xl">
            No Rooms Yet, but you can create one
          </h2>
        </div>
      )}
    </main>
  );
}
