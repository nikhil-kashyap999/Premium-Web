import { createModalContext } from "./ModalContext";

export const { ModalProvider: LogoutModalProvider, useModal: useLogoutModal } =
  createModalContext();
