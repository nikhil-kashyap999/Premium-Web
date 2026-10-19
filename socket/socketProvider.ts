import { useAuth } from "@/store/AuthStore";
import React, { useEffect } from "react";
import { socket } from "./socket";
import { registerSocketListners } from "./registerListener";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const isAuththenticated = useAuth((s) => s.isAuthenticated);
  useEffect(() => {
    if (!isAuththenticated) return;
    const cleanup = registerSocketListners(socket);
    socket.connect();

    return () => {
      cleanup();
      socket.disconnect();
    };
  }, [isAuththenticated]);
  return children;
}
