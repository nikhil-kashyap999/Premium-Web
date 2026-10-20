"use client";

import { useChatStore } from "@/store/ChatStore";
import { useContacts } from "@/store/ContactsStore";
import { AnimatePresence, motion } from "framer-motion";
import { EllipsisVerticalIcon, Menu } from "lucide-react";
import Dropdown from "../DropDown/DropDown";
import { useProfileModal } from "@/context/ProfileModalContext";
import { useAuth } from "@/store/AuthStore";

function Capsule({ setIsOpen }: any) {
  const onLogout = useAuth((s) => s.logout);
  const showProfileModal = useProfileModal().open;
  const contactid = useChatStore((s) => s.selectedContact);
  const contact = useContacts((s) => contactid && s.getContact(contactid._id));

  return (
    <div className="w-full flex items-center px-2 justify-between bg-black/40 mb-1 lg:rounded-none rounded-3xl">
      <div className="ml-1 block lg:hidden">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-2 rounded-lg bg-black/50 backdrop-blur-md"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
      </div>
      <div className="overflow-hidden bg-black/50 lg:bg-transparent px-8 py-1 rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.h1
            key={contact?.username ?? "username-placeholder"}
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="text-sm lg:text-lg font-semibold"
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
            className={`text-xs ${
              contact?.isActive ? "text-blue-400" : "text-neutral-500"
            }`}
          >
            {contact?.isActive ? "Online" : "Offline"}
          </motion.p>
        </AnimatePresence>
      </div>
      <Dropdown
        label="Account"
        items={[
          { label: "Profile", onSelect: showProfileModal },
          {
            label: "Logout",
            danger: true,
            onSelect: onLogout,
          },
        ]}
      />
    </div>
  );
}

export default Capsule;
