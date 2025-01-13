import { db } from "@/db";
import { users } from "@/db/schema";


export default async function Home() {
  const items = await db.select().from(users);

  return (
    <>
    {items.map((item) => {
      return <div key={item.id}>{item.name}</div>
    })}
    </>
  );
}
