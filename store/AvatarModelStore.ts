import { create } from "zustand";

type avatarModalType = {
  visible: boolean;
  toggleAvatarModal: () => void;
  closeAvatarModal: () => void;
  showAvatarModal: () => void;
};

export const useAvatarModal = create<avatarModalType>((set) => ({
  visible: false,
  toggleAvatarModal: () => set((state) => ({ visible: !state.visible })),
  closeAvatarModal: () => set({ visible: false }),
  showAvatarModal: () => set({ visible: true }),
}));
