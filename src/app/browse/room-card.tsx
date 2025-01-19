'use client'

import { Button } from "@/components/ui/button";
import { Room } from "@/db/schema";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";
import { TagsList } from "@/components/tags-list";
import { splitTags } from "@/lib/utils";

export function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TagsList tags={splitTags(room.tags)} />
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
      </CardContent>
      <CardFooter className="flex justify-end mt-auto">
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}