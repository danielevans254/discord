'use client';
import { Plus } from "lucide-react";
import ActionTooltip from "../action-tooltip";
import { ModalStore } from "@/hooks/use-modal-store";

const NavigationAction = () => {
  const { onOpen } = ModalStore();

  return (
    <div>
      <ActionTooltip
        label="Create a Server"
        side="right"
        align="end">
        <button className="group flex items-center" onClick={() => onOpen("createServer")}>
          <div className="flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <Plus className="group-hover:text-white transition text-emerald-500" size={24} />
          </div>
        </button>
      </ActionTooltip>
    </div>
  );
}

export default NavigationAction;