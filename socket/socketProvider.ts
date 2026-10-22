import { useAuth } from "@/store/AuthStore";
import React, { useEffect } from "react";
import { socket } from "./socket";
import { registerSocketListners } from "./registerListener";
import axiosInstance from "@/lib/axiosInterceptor/axios";
import axios from "axios";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const isAuththenticated = useAuth((s) => s.isAuthenticated);
  useEffect(() => {
    if (!isAuththenticated) return;
    let cancelled: boolean = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      try {
        const { data } = await axiosInstance.get('/api/auth/socket-token');
        if (cancelled) return;

        console.log("data : ", data);
        socket.auth = { token: data.token };
        cleanup = registerSocketListners(socket);
        socket.connect();

      } catch (e) {
        if (axios.isAxiosError(e)) {
          console.log("Socket token fetch failed : ", e.response?.data);
        }
      }
    })();


    return () => {
      cancelled = true;
      cleanup?.();
      socket.disconnect();
    };
  }, [isAuththenticated]);
  return children;
}
