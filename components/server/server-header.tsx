'use client'
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Bell, CalendarDays, ChevronDown, FolderPlus, LogOut, Pencil, PlusCircle, Settings, ShieldAlert, Sticker, Trash2, Tv, UserPlus, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { ModalStore } from "@/hooks/use-modal-store";
interface ServerHeaderProps {
  server: ServerWithMembersWithProfiles,
  role?: MemberRole,
}

const ServerHeader = ({
  server,
  role,
}: ServerHeaderProps) => {
  const { onOpen } = ModalStore();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;

  // TODO: Add functionality for the show channel and mute channel buttons, check and uncheck based on current state

  // TODO: Also obviously add the backend functionality to fetch all channels and muted channels
  const showChannel = () => {
    console.log("show channel clicked");
  }

  const muteChannel = () => {
    console.log("mute channel clicked");
  }

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  if (!isMounted) {
    return null;
  }

  // TODO: Add functionality

  const renderActions = () => (
    <div className="flex flex-col px-3 py-2 space-y-2">
      <DropdownMenuContent className="w-56 text-xs font-medium text-black space-y-[2px]">
        <DropdownMenuItem onClick={() => { onOpen("invite", { server }) }} className="hover:border-indigo-600 text-indigo-600 dark:text-indigo-400 px-3 py-2 text-sm cursor-pointer">
          Invite People
          <UserPlus className="ml-auto" size={16} />
        </DropdownMenuItem>
        {isAdmin && (
          <DropdownMenuItem onClick={() => { onOpen("serverSettings", { server }) }}
            className="text-gray-300 px-3 py-2 text-sm cursor-pointer">
            Server Settings
            <Settings className="ml-auto" size={16} />
          </DropdownMenuItem>
        )}

        {isAdmin && (
          <DropdownMenuItem onClick={() => { onOpen("manageMember", { server }) }} className="text-gray-300 px-3 py-2 text-sm cursor-pointer">
            Manage Members
            <Users className="ml-auto" size={16} />
          </DropdownMenuItem>
        )}

        {isModerator && (
          <DropdownMenuItem onClick={() => { onOpen("createChannel", { server }) }} className="text-gray-300 px-3 py-2 text-sm cursor-pointer">
            Create Channel
            <PlusCircle className="ml-auto" size={16} />
          </DropdownMenuItem>
        )}

        {isModerator && (
          <DropdownMenuItem onClick={() => { onOpen("createCategory", { server }) }} className="text-gray-300 px-3 py-2 text-sm cursor-pointer">
            Create Category
            <FolderPlus className="ml-auto" size={16} />
          </DropdownMenuItem>
        )}

        {isModerator && (
          <DropdownMenuItem onClick={() => { onOpen("createEvent", { server }) }} className="text-gray-300 px-3 py-2 text-sm cursor-pointer">
            Create Event
            <CalendarDays className="ml-auto" size={16} />
          </DropdownMenuItem>
        )}

        <DropdownMenuItem onClick={() => { onOpen("appDirectory", { server }) }} className="text-gray-300 px-3 py-2 text-sm cursor-pointer">
          App Directory
          <Sticker className="ml-auto" size={16} />
        </DropdownMenuItem>
        <Separator />

        <DropdownMenuItem onClick={showChannel} className="text-gray-300 px-3 py-2 text-sm cursor-pointer">
          Show All Channels
          <MdCheckBoxOutlineBlank className="ml-auto" size={16} />
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => { onOpen("notificationSettings", { server }) }} className="text-gray-300 px-3 py-2 text-sm cursor-pointer">
          Notification Settings
          <Bell className="ml-auto" size={16} />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => { onOpen("privacySettings", { server }) }} className="text-gray-300 px-3 py-2 text-sm cursor-pointer">
          Privacy Settings
          <ShieldAlert className="ml-auto" size={16} />
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem onClick={() => { onOpen("editServerProfile", { server }) }} className="text-gray-300 px-3 py-2 text-sm cursor-pointer">
          Edit Server Profile
          <Pencil className="ml-auto" size={16} />
        </DropdownMenuItem>

        <DropdownMenuItem onClick={muteChannel} className="text-gray-300 px-3 py-2 text-sm cursor-pointer">
          Hide Muted Channels
          <MdCheckBoxOutlineBlank className="ml-auto" size={16} />
        </DropdownMenuItem>

        <Separator />
        {isAdmin && (
          <DropdownMenuItem onClick={() => { onOpen("deleteServer", { server }) }} className="text-red-600 dark:text-red-500 px-3 py-2 text-sm cursor-pointer">
            Delete Server
            <Trash2 className="ml-auto" size={16} />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem onClick={() => { onOpen("leaveServer", { server }) }} className="text-red-600 dark:text-red-500 px-3 py-2 text-sm cursor-pointer">
            Leave Server
            <LogOut className="ml-auto" size={16} />
          </DropdownMenuItem>
        )}

      </DropdownMenuContent>
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
      {renderActions()}
    </DropdownMenu>
  );
}

export default ServerHeader;