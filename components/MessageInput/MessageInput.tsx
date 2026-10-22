import { useState } from "react";
import { useAuth } from "@/store/AuthStore";
import { SendHorizontal } from "lucide-react";
import { sendMessage } from "@/socket/emitters";
import { useChatStore } from "@/store/ChatStore";
import { saveMessage } from "@/lib/db/messageRepo";
import { messageInterface, SendType } from "@/Types/ContactsType";

function MessageInput() {
  const selectedContact = useChatStore((state) => state.selectedContact);
  const pushMessage = useChatStore((state) => state.pushMessage);
  const currentUser = useAuth((state) => state.user);

  const [message, setMessage] = useState("");

  const generateId = () => {
    return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  };

  const handleSend = async () => {
    if (!message.trim() || !selectedContact) return;
    const id = generateId();

    const newMsg: messageInterface = {
      id,
      senderid: currentUser?._id,
      receiverid: selectedContact?._id,
      partnerid: selectedContact?._id,
      intent: SendType.SENT,
      message: message,
      status: "sending",
      createdAt: Date.now(),
    };
    sendMessage({
      receiverid: selectedContact._id,
      message,
      messageid: id,
      createdAt: newMsg.createdAt,
    });
    pushMessage(newMsg, currentUser?._id);
    await saveMessage(newMsg);
    setMessage("");
  };

  return (
    <>
      <div className="h-full relative flex flex-col items-center justify-center">
        <div className="w-full lg:w-[80%] lg:px-8 bg-black/60 rounded-2xl py-1 border border-neutral-800">
          <div className="w-full flex items-center gap-2 p-2 h-full">
            <div className="flex-1 flex items-center rounded-xl h-full">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Write a message..."
                className="flex-1 text-white placeholder:text-neutral-400 focus:outline-none text-sm h-full bg-transparent lg:px-0 px-2"
              />
            </div>
            <button
              type="button"
              onClick={handleSend}
              disabled={!message.trim()}
              className="shrink-0 w-10 h-10 flex items-center justify-center bg-black/80 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl transition-colors duration-200 cursor-pointer"
            >
              <SendHorizontal className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-center text-neutral-400 text-xs mt-1 font-light">
            PREMIUM: A Messging Platform
          </h1>
        </div>
      </div>
    </>
  );
}

export default MessageInput;
