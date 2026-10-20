import { useNotification } from "@/context/NotificationContext";
import axiosInstance from "@/lib/axiosInterceptor/axios";
import { User } from "@/Types/UserType";
import axios from "axios";
import { create } from "zustand";

type userAuthType = {
  user: (User & { isActive?: boolean }) | null;
  isAuthenticated: boolean;
  clearAuth: () => void;
  setAuth: (user: User) => void;
  logout: () => void;
};

export const useAuth = create<userAuthType>((set) => ({
  user: null,
  isAuthenticated: false,
  setAuth: (user) => set({ user, isAuthenticated: true }),
  clearAuth: () => set({ user: null, isAuthenticated: false }),
  logout: async () => {
    try {
      await axiosInstance.post("/api/auth/logout");
      useNotification().success("Logout Successful");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { message: errMsg } = err.response?.data ?? "Error in logout";
        useNotification().error(errMsg);
      }
    } finally {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
