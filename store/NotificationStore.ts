import { create } from "zustand";

export type NotificationLabelType = "invite notification" | "new message";
export type UserType = { username: string; avatarUrl?: string|null };
type DefualtProp = {
  userInfo: UserType | null;
  isNotificationVisible: boolean;
  showModal: (user: UserType, NFtype: NotificationLabelType) => void;
  hideModal: () => void;
  onPress?: () => void;
  duration: number;
  NotificationLabel: NotificationLabelType;
};
export const useNotificationStore = create<DefualtProp>((set) => ({
  userInfo: null,
  duration: 4000,
  isNotificationVisible: false,
  NotificationLabel: "invite notification",
  showModal: (userInfo, NotificationLabel) => {
    set({ isNotificationVisible: true, userInfo, NotificationLabel });
  },
  hideModal: () => {
    set({ isNotificationVisible: false, userInfo: null });
  },
}));
