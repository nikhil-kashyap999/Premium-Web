import { createContext, ReactNode, useContext, useState } from "react";

interface ModalContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggleModal: () => void;
}

export function createModalContext() {
  const ModalContext = createContext<ModalContextType | null>(null);

  function ModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);
    const toggleModal = () => setIsOpen((prev) => !prev);

    return (
      <ModalContext.Provider value={{ isOpen, open, close, toggleModal }}>
        {children}
      </ModalContext.Provider>
    );
  }

  function useModal() {
    const ctx = useContext(ModalContext);
    if (!ctx) throw new Error("useModal must be used within its ModalProvider");
    return ctx;
  }

  return { ModalProvider, useModal };
}
