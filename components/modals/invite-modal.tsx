import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { db } from "@/lib/db";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { ModalStore } from "@/hooks/use-modal-store";
import Image from "next/image";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Separator } from "../ui/separator";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";




const InviteModal = () => {
  const { isOpen, onClose, type, data } = ModalStore();
  const isModalOpen = isOpen && type === "invite";
  const origin = useOrigin();

  const { server } = data

  const [isCopied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  const inviteLink = `${origin}/invite/${server?.inviteCode}`;

  const onCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  // TODO: Add invite link
  const onClick = () => {
    console.log("clicked");
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#313338] text-gray-200 p-0 overflow-hidden rounded-lg shadow-xl max-w-xl">
        <DialogHeader className="p-4">
          <DialogTitle className="text-2xl font-semibold py-2 flex pl-4">Invite friends to </DialogTitle>
          <div className="px-4 flex items-center text-gray-400">
            <span className="text-2xl">#&nbsp;</span> general
          </div>
        </DialogHeader>

        <div className="px-4">
          <Input className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-[#1e1f22]" placeholder="Search for friends" />
          <button onClick={onClick}>
            <Search className="absolute top-[154px] right-[30px] transform -translate-y-1/2 text-gray-400" size={20} />
          </button>
        </div>
        <Separator />
        <div className="flex flex-col px-4 gap-y-4">
          <div className="flex items-center justify-between">
            Friend Name
            <div>
              <button className="border-2 font-semibold border-green-500 px-4 py-2 text-sm rounded-sm hover:bg-green-500 hover:text-gray-800">
                Invite
              </button>
            </div>
          </div>
        </div>
        <Separator />
        <div className="pl-4 text-sm text-gray-300 font-semibold">
          OR, SEND A SERVER LINK INVITE
        </div>
        <div className="flex px-3 py-2">
          <div className="w-full bg-[#1e1f22] rounded-sm">
            <div className="p-1 flex items-center justify-between">
              <Input className="w-full border-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-[#1e1f22]" value={inviteLink} />
              <button
                onClick={onCopy}
                disabled={isCopied}
                className={`text-sm bg-indigo-500 py-2 rounded-sm ${isCopied ? 'bg-green-500 text-gray-900 px-[17.5px]' : 'px-6'} text-white `}
              >
                {isCopied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
        </div>
        <div className="relative flex ml-[12px] pb-3 text-xs">
          Your invite link expires in 7 days.&nbsp;<a className="text-blue-400 cursor-pointer">Edit invite link</a>
        </div>
      </DialogContent>
    </Dialog >
  );
}

export default InviteModal;