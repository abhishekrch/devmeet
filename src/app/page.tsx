import { db } from "@/db";
import { Room } from "@/db/schema";

export default async function Home() {
  const rooms = await db.query.room.findMany();

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {rooms.map((item: Room) => {
        return <div key={item.name}>{item.name}</div>;
      })}    
    </div>
  );
}