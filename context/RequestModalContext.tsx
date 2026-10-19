import { createModalContext } from "./ModalContext";

export const { ModalProvider: RequestModalProvider, useModal: useRequestModal } =
  createModalContext();
