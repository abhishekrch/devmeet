"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogInIcon, LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

function AccountDropdown() {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"link"}
          className="flex items-center space-x-2 p-2 hover:bg-gray-200
           dark:hover:bg-gray-800 rounded-lg"
        >
          {session.data?.user?.image ? (
            <Image
              src={session.data?.user?.image as string}
              alt="avatar"
              width="36"
              height="36"
              className="rounded-full"
            />
          ) : (
            <div
              className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-700 flex 
             items-center justify-center"
            >
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {session.data?.user?.name?.charAt(0).toUpperCase() || "U"}
              </span>
            </div>
          )}
          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          <LogOutIcon className="mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();
  return (
    <header className="bg-gray-100 py-2 dark:bg-gray-900 z-10 relative">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" className="flex gap-2 items-center hover:underline">
            DevMeet
          </Link>
        </div>

        <nav>
          <Link className="hover:underline" href="/your-rooms">
            Your Rooms
          </Link>
        </nav>

        <div className="flex items-center space-x-6">
          {session.data && <AccountDropdown />}
          {!session.data && (
            <Button onClick={() => signIn()} variant="link">
              <LogInIcon className="mr-2" />
              Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
