'use client'
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown, LogOut, Settings, Trash2, Tv, User, UserCog, UserPlus, Users } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "../ui/scroll-area";
import { useEffect, useState } from "react";
import { MdOutlineManageHistory, MdOutlineManageSearch } from "react-icons/md";
import { MdPreview } from "react-icons/md";
import { TbBan } from "react-icons/tb";
import { PiFileMagnifyingGlassFill } from "react-icons/pi";
import { BsEmojiSmile } from "react-icons/bs";

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
      <DropdownMenuItem className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/30 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
        Server Settings
        <Settings className="ml-auto" size={16} />
      </DropdownMenuItem>
      <DropdownMenuItem className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
        Invite People
        <UserPlus className="ml-auto" size={16} />
      </DropdownMenuItem>
      <DropdownMenuItem className="w-full text-left hover:bg-red-700/90 dark:hover:bg-red-700/80 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
        Leave Server
        <LogOut className="ml-auto" size={16} />
      </DropdownMenuItem>
      <DropdownMenuItem className="w-full text-left hover:bg-red-700/90 dark:hover:bg-red-700/80 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
        Delete Server
        <Trash2 className="ml-auto" size={16} />
      </DropdownMenuItem>
    </div>
  );

  const renderServerMembers = () => (
    <div className="flex flex-col px-3 py-2 space-y-2">
      <span className="font-semibold">Server Members</span>
      <DropdownMenuItem className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
        View Members
        <Users className="ml-auto" size={16} />
      </DropdownMenuItem>
      {isModerator && (
        <DropdownMenuItem className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
          Manage Members
          <UserCog className="ml-auto" size={16} />
        </DropdownMenuItem>
      )}
    </div>
  );

  const renderServerChannels = () => (
    <div className="flex flex-col px-3 py-2 space-y-2">
      <span className="font-semibold">Server Channels</span>
      <DropdownMenuItem className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
        View Channels
        <Tv className="ml-auto" size={16} />
      </DropdownMenuItem>
      {isAdmin && (
        <DropdownMenuItem className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
          Manage Channels
          <MdOutlineManageHistory className="ml-auto" size={18} />
        </DropdownMenuItem>
      )}
    </div>
  );

  const renderServerRoles = () => (
    <div className="flex flex-col px-3 py-2 space-y-2">
      <span className="font-semibold">Server Roles</span>
      <DropdownMenuItem className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
        View Roles
        <MdPreview className="ml-auto" size={18} />
      </DropdownMenuItem>
      {isAdmin && (
        <DropdownMenuItem className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
          Manage Roles
          <MdOutlineManageSearch className="ml-auto" size={18} />
        </DropdownMenuItem>
      )}
    </div>
  );

  const renderServerBans = () => (
    <div className="flex flex-col px-3 py-2 space-y-2">
      <span className="font-semibold">Server Bans</span>
      <DropdownMenuItem className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
        View Bans
        <PiFileMagnifyingGlassFill className="ml-auto" size={18} />
      </DropdownMenuItem>
      {isAdmin && (
        <DropdownMenuItem className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
          Manage Bans
          <TbBan className="ml-auto" size={18} />
        </DropdownMenuItem>
      )}
    </div>
  );

  const renderServerIntegrations = () => (
    <div className="flex flex-col px-3 py-2 space-y-2">
      <span className="font-semibold">Server Integrations</span>
      <DropdownMenuItem className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
        View Integrations
      </DropdownMenuItem>
      {isAdmin && (
        <DropdownMenuItem className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
          Manage Integrations
        </DropdownMenuItem>
      )}
    </div>
  );

  const renderServerEmojis = () => (
    <div className="flex flex-col px-3 py-2 space-y-2">
      <span className="font-semibold">Server Emojis</span>
      <DropdownMenuItem className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
        View Emojis
        <BsEmojiSmile className="ml-auto" size={18} />

      </DropdownMenuItem>
      {isModerator && (
        <DropdownMenuItem className="w-full text-left hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition rounded-md px-2 py-1 text-neutral-500 dark:text-neutral-300">
          Manage Emojis
          <MdOutlineManageHistory className="ml-auto" size={18} />
        </DropdownMenuItem>
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
            <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden border-2 ">
              <Image src={server.imageUrl} alt="Server Image" className="flex flex-col items-center" width={48} height={48} />
            </div>
            <div className="flex flex-col justify-end">
              <span className="text-sm text-neutral-500 dark:text-neutral-300">{server.members.length} Members</span>
              <span className="text-sm text-neutral-500 dark:text-neutral-300">{adminCount} Admins</span>
              <span className="text-sm text-neutral-500 dark:text-neutral-300">{moderatorCount} Moderators</span>
            </div>
          </div>
          {renderServerActions()}
          {renderServerMembers()}
          {renderServerChannels()}
          {renderServerRoles()}
          {renderServerBans()}
          {/* {renderServerIntegrations()} */}
          {renderServerEmojis()}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ServerHeader;