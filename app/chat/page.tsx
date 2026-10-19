"use client";
import { useEffect, useState } from "react";
import color from "@/lib/color";
import SideBar from "@/components/SideBar/SideBar";
import RequestModal from "@/components/Modal/RequestModal";
import MobileSidebar from "@/components/SideBar/MobileSidebar";
import { RequestModalProvider } from "@/context/RequestModalContext";
import ChatLayout from "@/components/ChatLayout/ChatLayout";
import { ProfileModalProvider } from "@/context/ProfileModalContext";
import ProfileModal from "@/components/Modal/ProfileModal";
import { InviteModalProvider } from "@/context/InviteModalContext";
import InviteModal from "@/components/Modal/InviteModal";
import { useAuth } from "@/store/AuthStore";
import { useRouter } from "next/navigation";
import LogoutModal from "@/components/Modal/LogoutModal";
import { LogoutModalProvider } from "@/context/LogoutModalContext";
import { useDeviceType } from "@/hooks/useDeviceType";
import { SocketProvider } from "@/socket/socketProvider";

export default function Chat() {
  const router = useRouter();
  const isAuthenticated = useAuth((s) => s.isAuthenticated);
  const [isOpen, setIsOpen] = useState(false);
  const { isMobile } = useDeviceType();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated]);
  if (isAuthenticated) {
    return (
      <SocketProvider>
        <ProfileModalProvider>
          <InviteModalProvider>
            <RequestModalProvider>
              <LogoutModalProvider>
                <div
                  style={{ backgroundColor: color.backgroundColor }}
                  className="flex lg:flex-row max-h-screen flex-col flex-1 items-center justify-center font-sans overflow-hidden relative"
                >
                  {isMobile && (
                    <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
                  )}
                  <SideBar />
                  <ChatLayout setIsOpen={setIsOpen} />
                  <RequestModal />
                  <ProfileModal />
                  <InviteModal />
                  <LogoutModal />
                </div>
              </LogoutModalProvider>
            </RequestModalProvider>
          </InviteModalProvider>
        </ProfileModalProvider>
      </SocketProvider>
    );
  }
}
