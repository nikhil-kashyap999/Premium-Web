import { useAuth } from "@/store/AuthStore";
import React, { useEffect } from "react";
import { socket } from "./socket";
import { registerSocketListners } from "./registerListener";
import axiosInstance from "@/lib/axiosInterceptor/axios";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const isAuththenticated = useAuth((s) => s.isAuthenticated);
  useEffect(() => {
    let cleanup: () => void;
    async () => {
      if (!isAuththenticated) return;
      const data = await axiosInstance.get('/api/auth/socket-token');
      socket.auth = { token:data.data.token };
      cleanup = registerSocketListners(socket);
      socket.connect();
    }


    return () => {
      cleanup();
      socket.disconnect();
    };
  }, [isAuththenticated]);
  return children;
}
