"use client";

import { useEffect, useRef } from "react";
import ChatBubble from "../ChatBubble/ChatBubble";
import useMessages from "@/hooks/useMessages";
import { messageInterface } from "@/Types/ContactsType";

function MessagesContainer() {
  const { displayMessages } = useMessages();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [displayMessages.length]);

  if (displayMessages.length === 0 || !displayMessages) return;
  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-auto flex-1 lg:px-4">
      {displayMessages.map((message: messageInterface) => (
        <ChatBubble
          id={message.id}
          sended={message.intent}
          message={message.message}
          status={message.status}
          key={message.id}
        />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}

export default MessagesContainer;
