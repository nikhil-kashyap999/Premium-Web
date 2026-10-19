import { useNotification } from "@/context/NotificationContext";
import { useChatStore } from "@/store/ChatStore";
import { messageInterface } from "@/Types/ContactsType";

export default function useNotify() {
  const { chat: chatNotify } = useNotification();
  const { selectedContact, getAllMessages } = useChatStore();

  const allMessages = getAllMessages();

  // if (allMessages) {
  //   const selectedContactID = selectedContact?._id;
  //   console.log(allMessages[`${selectedContactID}`].slice(-1)[0]);
  // }

  const notify = (msgObj: messageInterface) => {
    if (!selectedContact || selectedContact._id != msgObj.senderid) {
      chatNotify("New Message");
    }
  };
  return { notify };
}
