import { createModalContext } from "./ModalContext";

export const { useModal: useInviteModal, ModalProvider: InviteModalProvider } =
  createModalContext();
