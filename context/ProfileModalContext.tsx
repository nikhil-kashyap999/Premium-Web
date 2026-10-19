import { createModalContext } from "./ModalContext";

export const {
  ModalProvider: ProfileModalProvider,
  useModal: useProfileModal,
} = createModalContext();
