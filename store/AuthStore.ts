import axios from "axios";
import { create } from "zustand";
import { User } from "@/Types/UserType";
import { useChatStore } from "./ChatStore";
import { useContacts } from "./ContactsStore";
import { cleanDB } from "@/lib/db/messageRepo";
import axiosInstance from "@/lib/axiosInterceptor/axios";

type userAuthType = {
  user: (User & { isActive?: boolean }) | null;
  isAuthenticated: boolean;
  clearAuth: () => void;
  setAuth: (user: User) => void;
  logout: (s: any, e: any) => void;
};

export const useAuth = create<userAuthType>((set) => ({
  user: null,
  isAuthenticated: false,
  setAuth: (user) => set({ user, isAuthenticated: true }),
  clearAuth: () => set({ user: null, isAuthenticated: false }),
  logout: async (onSuccess: any, onError: any) => {
    try {
      await axiosInstance.post("/api/auth/logout");
      await cleanDB();
      useChatStore.getState().removeSelectedContact();
      useContacts.getState().clearContacts();
      set({ user: null });
      onSuccess?.("Logged out");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { message: errMsg } = err.response?.data ?? "Error in logout";
        onError(errMsg);
      }
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
