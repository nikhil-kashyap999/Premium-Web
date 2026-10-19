import {
  User,
  UsersRound,
  LogOut,
  X,
  Send,
  UserCheck,
  UserSearch,
} from "lucide-react";
import useLogout from "@/hooks/useLogout";
import UserCell from "../UserCards/UserCell";
import SearchBar from "../SearchBar/SearchBar";
import { memo, useEffect, useState } from "react";
import { contactType } from "../../Types/ContactsType";
import useFetchContacts from "@/hooks/useFetchContacts";
import { useInviteModal } from "@/context/InviteModalContext";
import { useProfileModal } from "@/context/ProfileModalContext";
import { useRequestModal } from "../../context/RequestModalContext";
import { useChatStore } from "@/store/ChatStore";
import { useLogoutModal } from "@/context/LogoutModalContext";
import { useContacts } from "@/store/ContactsStore";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import { APP_NAME } from "@/constants/App-constants";

interface PropType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

function MobileSidebar({ isOpen, setIsOpen }: PropType) {
  useFetchContacts();
  const { toggleModal: toggleLogoutModal } = useLogoutModal();
  const { toggleModal: toggleInviteModal } = useInviteModal();
  const { toggleModal: toggleRequestModal } = useRequestModal();
  const { toggleModal: toggleProfileModal } = useProfileModal();
  const selectContact = useChatStore((s) => s.selectContact);
  const returnedContacts = useContacts((s) => s.contacts);
  const [userContacts, setUserContacts] = useState<contactType[] | []>(
    returnedContacts || [],
  );
  const onBtnClick = (toggleModalRef?: () => void): void => {
    setIsOpen(false);
    if (toggleModalRef) setTimeout(() => toggleModalRef(), 150);
  };

  useEffect(() => {
    setUserContacts(returnedContacts || []);
  }, [returnedContacts]);

  const onContactClick = (contactObj: contactType) => {
    selectContact(contactObj);
    onBtnClick();
  };
  return (
    <>
      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 bg-black/50 z-40 duration-300 ease-in-out
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sidebar */}
      <div
        className={`
          w-full h-full fixed left-0 top-0 z-50
          flex flex-col lg:hidden
          bg-black
          border-r border-white/6
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header */}
        <div className="shrink-0 px-4 pt-5 pb-3 border-b border-white/6">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/8 border border-white/10 flex items-center justify-center">
                <Image src={logo} alt="logo" width={40} height={40} />
              </div>
              <span className="text-[13px] font-medium text-white/90 tracking-wide">
                {APP_NAME}
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4 text-white/50" />
            </button>
          </div>

          {/* Search */}
          <SearchBar contextList={userContacts} setList={setUserContacts} />
        </div>

        {/* Section label */}
        <p className="px-4 pt-3 pb-1.5 text-[10px] font-medium tracking-widest uppercase text-white/25 shrink-0">
          Recent
        </p>

        {/* User list */}
        <div className="flex-1 overflow-y-auto px-2 pb-2 scrollbar-thin scrollbar-thumb-white/10 flex flex-col gap-y-2">
          {userContacts.length > 0 &&
            userContacts.map((user: contactType) => (
              <UserCell
                user={user}
                key={user._id}
                onClick={() => onContactClick(user)}
              />
            ))}
        </div>

        {/* Footer nav */}
        <div className="shrink-0 px-3 pb-5 pt-2 border-t border-white/6">
          <div className="bg-neutral-950 border border-white/[0.07] rounded-2xl p-1.5 grid grid-cols-5 gap-1">
            <NavButton label="Contacts" active>
              <UsersRound className="w-4.5 h-4.5" />
            </NavButton>
            <NavButton
              label="Requests"
              onClick={() => onBtnClick(toggleRequestModal)}
            >
              <UserCheck className="w-4.5 h-4.5" />
            </NavButton>
            <NavButton
              label="Search"
              onClick={() => onBtnClick(toggleInviteModal)}
            >
              <UserSearch className="w-4.5 h-4.5" />
            </NavButton>
            <NavButton label="Profile">
              <User
                className="w-4.5 h-4.5"
                onClick={() => onBtnClick(toggleProfileModal)}
              />
            </NavButton>
            <NavButton label="Log out" danger onClick={toggleLogoutModal}>
              <LogOut className="w-4.5 h-4.5" />
            </NavButton>
          </div>
        </div>
      </div>
    </>
  );
}

interface NavButtonProps {
  label: string;
  children: React.ReactNode;
  active?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

function NavButton({
  label,
  children,
  active,
  danger,
  onClick,
}: NavButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex flex-col items-center gap-1 py-2 px-1 rounded-xl
        transition-colors cursor-pointer border-none bg-transparent
        ${active ? "bg-white/9" : "hover:bg-white/6"}
        ${danger ? "text-red-400" : active ? "text-blue-400" : "text-white/45"}
      `}
    >
      {children}
      <span className="text-[9px] tracking-wide">{label}</span>
    </button>
  );
}

export default memo(MobileSidebar);
