"use client";

import { useChatStore } from "@/store/ChatStore";
import { useContacts } from "@/store/ContactsStore";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ArrowLeft } from "lucide-react";
import Dropdown from "../DropDown/DropDown";
import { useProfileModal } from "@/context/ProfileModalContext";
import { useAuth } from "@/store/AuthStore";
import { deleteMessage } from "@/lib/db/messageRepo";
import { useNotification } from "@/context/NotificationContext";

function Capsule({ setIsOpen }: any) {
  const onLogout = useAuth((s) => s.logout);
  const showProfileModal = useProfileModal().open;
  const contactid = useChatStore((s) => s.selectedContact);
  const clearContact = useChatStore((s) => s.removeSelectedContact);
  const contact = useContacts((s) => contactid && s.getContact(contactid._id));
  const { success: s, error: e } = useNotification();

  return (
    <div className="w-full flex items-center px-2 bg-black/40 mb-1 lg:rounded-none rounded-2xl">
      <div>
        <button
          type="button"
          onClick={clearContact}
          className="p-2 rounded-lg bg-black/50 backdrop-blur-md"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
      </div>
      <div className="flex-1 flex items-center justify-between">
        <div className="ml-1 block lg:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="lg:hidden p-2 rounded-lg bg-black/50 backdrop-blur-md"
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>
        <div
          className="overflow-hidden bg-black/50 lg:bg-transparent py-1 rounded-xl min-w-0 max-w-56
         flex flex-col items-stretch px-3 flex-1 mx-2 lg:max-w-max"
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={contact?.username ?? "username-placeholder"}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:text-lg text-xs font-semibold lg:text-left text-center w-full truncate"
            >
              {contact?.username ?? "Username"}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={contact?.isActive ? "online" : "offline"}
              initial={{ y: 12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className={`text-xs lg:text-left text-center w-full ${
                contact?.isActive ? "text-blue-400" : "text-neutral-500"
              }`}
            >
              {contact?.isActive ? "Online" : "Offline"}
            </motion.p>
          </AnimatePresence>
        </div>
        <Dropdown
          items={[
            { label: "Profile", onSelect: showProfileModal },
            {
              label: "Delete Chat",
              onSelect: async () => contactid && deleteMessage(contactid._id),
            },
            {
              label: "Logout",
              danger: true,
              onSelect: () => onLogout(s, e),
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Capsule;
