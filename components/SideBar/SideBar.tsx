"use client";

import React from "react";
import {
  CircleUserRound,
  LogOut,
  UserCheck2,
  UserSearch,
  UsersRound,
} from "lucide-react";

import Image from "next/image";
import { useAuth } from "@/store/AuthStore";
import { useRequestModal } from "@/context/RequestModalContext";
import { useProfileModal } from "@/context/ProfileModalContext";
import { useInviteModal } from "@/context/InviteModalContext";
import { useLogoutModal } from "@/context/LogoutModalContext";
import logo from "@/assets/images/logo.png";

function SideBar() {
  const { user } = useAuth();
  const { toggleModal: toggleLogoutModal } = useLogoutModal();
  const { toggleModal: toggleRequestModal } = useRequestModal();
  const { toggleModal: toggleProfileModal } = useProfileModal();
  const { toggleModal: toggleInviteModal } = useInviteModal();

  return (
    <aside
      className="
        hidden lg:flex
        h-screen w-20
        flex-col justify-between
        border-r border-neutral-800
        bg-neutral-950
        backdrop-blur-xl
        px-3 py-4
      "
    >
      {/* TOP */}
      <div className="flex flex-col items-center gap-8">
        {/* LOGO */}
        <div
          className="
            flex h-14 w-14 items-center justify-center
            rounded-2xl
            bg-black border border-neutral-800
            shadow-lg
          "
        >
          <Image
            src={logo}
            alt="logo"
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
          />
        </div>

        {/* NAVIGATION */}
        <nav className="flex flex-col items-center gap-3">
          <SidebarIcon label="Contacts" active>
            <UsersRound size={20} />
          </SidebarIcon>

          <SidebarIcon label="Search" onClick={toggleInviteModal}>
            <UserSearch size={20} />
          </SidebarIcon>

          <SidebarIcon label="Requests" onClick={toggleRequestModal}>
            <UserCheck2 size={20} />
          </SidebarIcon>

          <SidebarIcon label="Profile" onClick={toggleProfileModal}>
            <CircleUserRound size={20} />
          </SidebarIcon>
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col items-center gap-4">
        {/* USER AVATAR */}
        <div className="h-11 w-11 rounded-full overflow-hidden border border-neutral-600 p-1.5">
          {!user ? (
            <div
              className=" h-full w-full
            border-2 border-green-500
            bg-linear-to-br from-green-500 to-emerald-700
            shadow-md"
            />
          ) : (
            <Image
              src={user?.avatarUrl}
              alt="avatar"
              width={80}
              height={80}
            />
          )}
        </div>

        {/* LOGOUT */}
        <SidebarIcon danger onClick={toggleLogoutModal}>
          <LogOut size={20} />
        </SidebarIcon>
      </div>
    </aside>
  );
}

export default SideBar;

interface SidebarIconProps {
  children: React.ReactNode;
  label?: string;
  active?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

function SidebarIcon({
  children,
  label,
  active,
  danger,
  onClick,
}: SidebarIconProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`
        group relative
        flex h-14 w-14 flex-col items-center justify-center
        rounded-2xl
        border transition-all duration-200
        hover:scale-105 active:scale-95

        ${
          active
            ? "border-green-500 bg-green-500/10 text-green-400 shadow-lg shadow-green-500/10"
            : danger
              ? "border-red-900/40 text-red-500 hover:bg-red-500/10"
              : "border-neutral-800 bg-neutral-900 text-neutral-400 hover:border-neutral-600 hover:bg-neutral-800 hover:text-white"
        }
      `}
    >
      {children}

      {/* TOOLTIP */}
      {label && (
        <span
          className="
            pointer-events-none absolute left-16
            whitespace-nowrap rounded-md
            bg-black px-2 py-1
            text-xs text-white
            opacity-0 shadow-lg
            transition-all duration-200
            group-hover:opacity-100
          "
        >
          {label}
        </span>
      )}
    </button>
  );
}
