import { create } from "zustand";
import { Status } from "@/Types/BareMessageType";
import { contactType, messageInterface } from "@/Types/ContactsType";

interface chatStoreInterface {
  selectedContact: contactType | null;
  messagesByContactId: Record<string, messageInterface[]>;

  selectContact: (contactObj: contactType) => void;
  removeSelectedContact: () => void;
  pushMessage: (
    msgObj: messageInterface,
    currentUserId: string | undefined,
  ) => void;
  deleteMsg: (partnerId: string, messageId: string) => void;
  getMessagesForContact: (contactId: string) => messageInterface[];
  getLastMessageForContact: (
    contactId: string,
  ) => messageInterface | null | void;
  getAllMessages: () => any;
  updateMessageStatus: (
    msgid: string,
    contactid: string,
    status: Status,
  ) => void;
}

export const useChatStore = create<chatStoreInterface>((set, get) => ({
  selectedContact: null,
  messagesByContactId: {},

  selectContact: (contactObj) =>
    set((state) => ({
      selectedContact: contactObj,
      messagesByContactId: state.messagesByContactId[contactObj._id]
        ? state.messagesByContactId
        : { ...state.messagesByContactId, [contactObj._id]: [] },
    })),

  removeSelectedContact: () => set({ selectedContact: null }),

  pushMessage: (msgObj, currentUserId) =>
    set((state) => {
      const partnerId =
        (msgObj.senderid === currentUserId
          ? msgObj.receiverid
          : msgObj.senderid) ?? "";

      if (!partnerId) return {} as Partial<typeof state>;

      const existing = state.messagesByContactId[partnerId] ?? [];

      // Duplicate check — agar same id already hai, kuch mat karo
      const alreadyExists = existing.some((msg) => msg.id === msgObj.id);
      if (alreadyExists) return {} as Partial<typeof state>;

      return {
        messagesByContactId: {
          ...state.messagesByContactId,
          [partnerId]: [...existing, msgObj],
        },
      };
    }),

  deleteMsg: (messageId: string, partnerId: string) =>
    set((state) => {
      const contactMessages = state.messagesByContactId[partnerId];
      if (!contactMessages) return state;

      const updatedMessages = contactMessages.filter(
        (msg) => msg.id !== messageId,
      );

      return {
        messagesByContactId: {
          ...state.messagesByContactId,
          [partnerId]: updatedMessages,
        },
      };
    }),

  getMessagesForContact: (contactId) =>
    get().messagesByContactId[contactId] ?? [],

  getLastMessageForContact: (contactid: string) => {
    if (get().messagesByContactId[contactid]) {
      const res = get().messagesByContactId[contactid].slice(-1)[0];
      return res;
    }
  },
  getAllMessages: () => get().messagesByContactId,

  updateMessageStatus: (msgid, contactid, status) => {
    set((s) => {
      const messages = get().messagesByContactId[contactid];
      if (!messages) return s;
      return {
        messagesByContactId: {
          ...s.messagesByContactId,
          [contactid]: messages.map((m) =>
            m.id === msgid ? { ...m, status } : m,
          ),
        },
      };
    });
  },
}));
