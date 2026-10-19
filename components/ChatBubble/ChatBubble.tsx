import useMessages from "@/hooks/useMessages";
import { SendType } from "@/Types/ContactsType";
import { useState, useEffect } from "react";

function OptionDialogue({
  visible,
  onClose,
  isSent,
  msgid,
}: {
  visible: boolean;
  onClose: () => void;
  isSent: boolean;
  msgid?: string;
}) {
  const { deleteUserMsg: deleteMsg } = useMessages();
  useEffect(() => {
    if (!visible) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-option-dialogue]")) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [visible, onClose]);

  const senderOption = [
    {
      name: "Copy",
      action: () => {
        alert("copy");
      },
    },
    {
      name: "Delete",
      action: () => {
        if (msgid) deleteMsg(msgid);
      },
    },
  ];
  const receiverOptions = [
    {
      name: "Copy",
      action: () => {
        alert("copy");
      },
    },
    {
      name: "Reply",
      action: () => {
        alert("Reply");
      },
    },
  ];
  const options = isSent ? senderOption : receiverOptions;

  return (
    <div
      data-option-dialogue
      className={`
        max-w-min h-min flex gap-1 p-1.5 rounded-xl
        bg-zinc-900/90 backdrop-blur-md border border-white/10
        shadow-[0_8px_10px_rgba(0,0,0,0.8)]
        transition-all duration-200 ease-out origin-top
        ${isSent ? "right-0" : "left-0"}
        top-full
        ${
          visible
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-1 pointer-events-none"
        }
      `}
    >
      {options.map((option) => (
        <button
          key={option.name}
          onClick={option.action}
          className="
            px-3 py-1.5 rounded-lg text-xs font-medium
            text-zinc-300 hover:text-white
            hover:bg-white/10 active:bg-white/20
            transition-colors duration-100
            whitespace-nowrap
          "
        >
          {option.name}
        </button>
      ))}
    </div>
  );
}

function ChatBubble({
  id,
  sended,
  message,
}: {
  id?: string;
  sended?: SendType;
  message?: string;
}) {
  const [openDialogue, setOpenDialogue] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isSent = sended === SendType.SENT;

  // Entrance animation on mount
  useEffect(() => {
    const t = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(t);
  }, []);

  return (
    <div
      className={`
        w-full flex mb-2 relative
        transition-all duration-300 ease-out
        ${isSent ? "justify-end right-1" : "justify-start"}
        ${
          mounted
            ? "opacity-100 translate-y-0"
            : `opacity-0 ${isSent ? "translate-x-4" : "-translate-x-4"} translate-y-2`
        }
      `}
    >
      <div className="max-w-[80%]">
        {/* Bubble */}
        <div
          onDoubleClick={() => setOpenDialogue((v) => !v)}
          className={`
             px-4 py-2.5 rounded-2xl text-sm leading-relaxed cursor-default
            select-none transition-transform duration-100
            active:scale-[0.97]
            ${
              isSent
                ? "bg-black/60 text-white rounded-br-sm"
                : "bg-zinc-800/80 text-zinc-100 rounded-bl-sm"
            }
            backdrop-blur-sm
          `}
        >
          {message}
        </div>
      </div>
      {/* Option Dialogue */}
      {openDialogue && (
        <OptionDialogue
          msgid={id}
          isSent={isSent}
          visible={openDialogue}
          onClose={() => setOpenDialogue(false)}
        />
      )}
    </div>
  );
}

export default ChatBubble;
