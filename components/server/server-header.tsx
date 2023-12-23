'use client'
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
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

  const adminCount = server.members.filter((member) => member.role === MemberRole.ADMIN).length;
  const moderatorCount = server.members.filter((member) => member.role === MemberRole.MODERATOR).length;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) {
    return null;
  }

  const renderServerActions = () => (
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
  );

  const renderServerMembers = () => (
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
  );

  const renderServerChannels = () => (
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
  );

  const renderServerRoles = () => (
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
  );

  const renderServerBans = () => (
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
  );

  const renderServerIntegrations = () => (
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
  );

  const renderServerEmojis = () => (
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
  );

  const renderServerStickers = () => (
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
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none" asChild>
        <button className="w-full text-md font-semibold px-3 flex items-center h-12 border-neutral-200 dark:border-neutral-800 border-b-2 hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition">
          {server.name}
          <ChevronDown className="ml-auto" size={24} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="">
        <ScrollArea className="h-72 w-48 rounded-md">
          <div className="flex items-center px-3 py-2 space-x-2">
            <div className="flex-shrink-0 w-8 h-8 rounded-full overflow-hidden border-2 ">
              <Image src={server.imageUrl} alt="Server Image" className="flex flex-col items-center" width={48} height={48} />
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-500 dark:text-neutral-300">{server.members.length} Members</span>
              <span className="text-neutral-500 dark:text-neutral-300">{adminCount} Admins</span>
              <span className="text-neutral-500 dark:text-neutral-300">{moderatorCount} Moderators</span>
            </div>
          </div>
          {renderServerActions()}
          {renderServerMembers()}
          {renderServerChannels()}
          {renderServerRoles()}
          {renderServerBans()}
          {renderServerIntegrations()}
          {renderServerEmojis()}
          {renderServerStickers()}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ServerHeader;