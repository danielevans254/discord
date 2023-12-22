'use client'

import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, Server } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";

interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles,
  role?: MemberRole,
}

const ServerHeader = ({
  server,
  role,
}: ServerHeaderProps) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  // const [isMounted, setIsMounted] = useState(false);

  // useEffect(() => {
  //   setIsMounted(true);
  // }, [])

  // if (!isMounted) {
  //   return null;
  // }

  // TODO: Add functionality
  // TODO: Fix scrollbar
  return (
    <DropdownMenu >
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className="ml-auto" size={24} />
        </button>

      </DropdownMenuTrigger>

      <DropdownMenuContent className="">
        <ScrollArea className="h-72 w-48 rounded-md border">

          <div className="flex items-center px-3 py-2 space-x-2">
            <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden border-2 ">
              <Image src={server.imageUrl} alt="Server Image" className="flex flex-col items-center" width={36} height={36} />
            </div>
            <div className="flex flex-col">
              {/* <span className="font-semibold"> Server Actions</span> */}
              <span className="text-neutral-500 dark:text-neutral-300">{server.members.length} Members</span>
            </div>
          </div>
          <div className="flex flex-col px-3 py-2 space-y-2">
            <span className="font-semibold">Server Actions</span>
            <button className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/30 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
              Server Settings
            </button>
            <button className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
              Invite People
            </button>
            <button className="w-full text-left hover:bg-red-700/90 dark:hover:bg-red-700/80 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
              Leave Server
            </button>
          </div>
          <div className="flex flex-col px-3 py-2 space-y-2">
            <span className="font-semibold">Server Members</span>
            <button className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
              View Members
            </button>
            {isModerator && (
              <button className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
                Manage Members
              </button>
            )}
          </div>
          <div className="flex flex-col px-3 py-2 space-y-2">
            <span className="font-semibold">Server Channels</span>
            <button className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
              View Channels
            </button>
            {isAdmin && (
              <button className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
                Manage Channels
              </button>
            )}
          </div>
          <div className="flex flex-col px-3 py-2 space-y-2">
            <span className="font-semibold">Server Roles</span>
            <button className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
              View Roles
            </button>
            {isAdmin && (
              <button className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
                Manage Roles
              </button>
            )}
          </div>
          <div className="flex flex-col px-3 py-2 space-y-2">
            <span className="font-semibold">Server Bans</span>
            <button className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
              View Bans
            </button>
            {isAdmin && (
              <button className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
                Manage Bans
              </button>
            )}
          </div>
          <div className="flex flex-col px-3 py-2 space-y-2">
            <span className="font-semibold">Server Integrations</span>
            <button className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
              View Integrations
            </button>
            {isAdmin && (
              <button className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
                Manage Integrations
              </button>
            )}
          </div>
          <div className="flex flex-col px-3 py-2 space-y-2">
            <span className="font-semibold">Server Emojis</span>
            <button className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
              View Emojis
            </button>
            {isModerator && (
              <button className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
                Manage Emojis
              </button>
            )}
          </div>
          <div className="flex flex-col px-3 py-2 space-y-2">
            <span className="font-semibold">Server Stickers</span>
            <button className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
              View Stickers
            </button>
            {isAdmin && (
              <button className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
                Manage Stickers
              </button>
            )}
          </div>
        </ScrollArea>
      </DropdownMenuContent>

    </DropdownMenu>

  );
}

export default ServerHeader;