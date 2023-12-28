'use client'

import { useEffect, useState } from "react";
import CreateServerModal from "@/components/modals/create-server-modal"
import InviteModal from "./modals/invite-modal";
import ServerSettingsModal from "./modals/server-settings-modal";
import ManageMembersModal from "./modals/manage-members-modal";
import CreateChannelModal from "./modals/create-channel-modal";
import CreateEventModal from "./modals/create-event-modal";
import AppDirectoryModal from "./modals/create-app-directory-modal";
import NotificationSettingsModal from "./modals/notification-settings-modal";
import EditServerProfileModal from "./modals/edit-server-profile";
import PrivacySettingsModal from "./modals/privacy-settings-modal";
import { Delete } from "lucide-react";
import DeleteServerModal from "./modals/leave/delete-server-modal";
import LeaveServerModal from "./modals/leave/leave-server-modal";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <ServerSettingsModal />
      <ManageMembersModal />
      <CreateChannelModal />
      <CreateEventModal />
      <AppDirectoryModal />
      <NotificationSettingsModal />
      <PrivacySettingsModal />
      <EditServerProfileModal />
      <DeleteServerModal />
      <LeaveServerModal />

    </>
  );
}

export default ModalProvider;
