import { create } from "zustand";
import { contactType } from "@/Types/ContactsType";

type selectedContactType = {
  contacts: contactType[] | [];

  clearContacts: () => void;
  setContacts: (contactsList: contactType[]) => void;
  getContact: (contactId: string) => contactType | undefined;
  updateContactStatus: (contact: { userid: string; isActive: boolean }) => void;
};

export const useContacts = create<selectedContactType>((set, get) => ({
  contacts: [],
  clearContacts: () => set({ contacts: [] }),
  setContacts: (contactsList: contactType[]) => set({ contacts: contactsList }),
  getContact: (contactId: string) =>
    get().contacts.find((contact) => contact._id === contactId),
  updateContactStatus: (contact) =>
    set((state) => ({
      contacts: state.contacts.map((c) =>
        c._id === contact.userid ? { ...c, isActive: contact.isActive } : c,
      ),
    })),
}));
