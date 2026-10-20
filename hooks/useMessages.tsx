import { getMessagesForContact } from "@/lib/db/messageRepo";
import { useChatStore } from "@/store/ChatStore";
import { messageInterface } from "@/Types/ContactsType";
import { useEffect, useRef } from "react";
import { deleteMessage } from "../lib/db/messageRepo";
import { useAuth } from "@/store/AuthStore";

async function getCachedMsgs(id: string): Promise<messageInterface[]> {
  const messages = await getMessagesForContact(id);
  return messages;
}
const EMPTY_MESSAGES: messageInterface[] = []; // stable reference (infinite-loop se bachne ke liye)

export default function useMessages() {
  const { user: currentUser } = useAuth();
  const selectedContact = useChatStore((state) => state.selectedContact);
  const { deleteMsg, pushMessage } = useChatStore();

  // displayMessages — ab local state nahi, seedha store se derive
  const displayMessages = useChatStore((state) =>
    selectedContact
      ? state.messagesByContactId[selectedContact?._id ?? ""]
      : EMPTY_MESSAGES,
  );

  const loadedContactsRef = useRef(new Set<string>());

  useEffect(() => {
    if (!selectedContact) return;
    if (loadedContactsRef.current.has(selectedContact._id)) return; // is contact ke liye already load ho chuka

    let mounted = true;

    getCachedMsgs(selectedContact._id).then((msgs) => {
      if (!mounted) return;
      msgs.forEach((msg) => pushMessage(msg, currentUser?._id));
      loadedContactsRef.current.add(selectedContact._id); // mark as loaded
    });

    return () => {
      mounted = false;
    };
  }, [selectedContact]);

  const deleteUserMsg = (msgId: string) => {
    if (msgId && selectedContact?._id) deleteMsg(msgId, selectedContact._id);
    if (msgId) deleteMessage(msgId);
  };

  return { displayMessages, deleteUserMsg };
}
