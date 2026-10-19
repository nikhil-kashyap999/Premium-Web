import { create } from "zustand";

type Status = "connecting" | "connected" | "disconnected";
type DefaultProp = { status: Status; setStaus: (s: Status) => void };
export const useSocket = create<DefaultProp>((set) => ({
  status: "disconnected",
  setStaus: (s) => {
    set({ status: s });
  },
}));
