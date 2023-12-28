import { Server } from "@prisma/client";
import { create } from "zustand"

export type ModalType = "createServer" | "invite" | "serverSettings" | "manageMember" | "createChannel" | "createCategory" | "createEvent" | "appDirectory" | "notificationSettings" | "privacySettings" | "editServerProfile" | "deleteServer" | "leaveServer";

interface ModalData {
  server?: Server
}
interface ModalStore {
  type: ModalType | null
  data: ModalData
  isOpen: boolean
  onOpen: (type: ModalType, data?: ModalData) => void
  onClose: () => void
}

export const ModalStore = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type, data = {}) => set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false }),
}))
