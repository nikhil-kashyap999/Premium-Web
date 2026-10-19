import { User } from "@/Types/UserType";
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
  logout: () => set({ user: null, isAuthenticated: false }),
}));
