import { create } from "zustand";

type LoadingStoreType = {
  isLoading: boolean;
  toggleISLoading: () => void;
  startLoading: () => void;
  stopLoading: () => void;
};

export const useLoading = create<LoadingStoreType>((set) => ({
  isLoading: true,
  toggleISLoading: () => set((state) => ({ isLoading: !state.isLoading })),
  startLoading: () => set({ isLoading: true }),
  stopLoading: () => set({ isLoading: false }),
}));
