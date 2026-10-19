import Image from "next/image";
import { contactType } from "../../Types/ContactsType";
import { useChatStore } from "@/store/ChatStore";
import { useEffect } from "react";
import { useNotification } from "@/context/NotificationContext";

function UserCell({ user, onClick }: { user: contactType; onClick?: any }) {
  const { chat } = useNotification();
  const { getLastMessageForContact, selectedContact } = useChatStore();
  const lastMessage = getLastMessageForContact(user._id);

  // useEffect(() => {
  //   if (!selectedContact || selectedContact._id != user._id)
  //     chat(`New Message from ${user.username}`);
  // }, [lastMessage]);

  return (
    <div
      className="w-full h-16 lg:bg-black/10 bg-neutral-900 rounded-xl p-1 px-2 flex items-center hover:bg-green-950 cursor-pointer transition-colors duration-200"
      onClick={onClick}
    >
      {/* Avatar */}
      <div className="w-10 h-10 shrink-0 rounded-full bg-green-950 mr-2">
        {user.avatarUrl && (
          <Image
            src={user?.avatarUrl}
            alt="avatar"
            className="w-full h-full"
            width={20}
            height={10}
          />
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold truncate">{user.username}</h1>
        <p className="text-xs text-neutral-400 truncate font-light italic">
          {lastMessage?.message ?? "Recent Messages will appear here"}
        </p>
      </div>

      {/* Online indicator */}
      <div className="shrink-0 flex items-start self-start p-1 mt-1 ml-1">
        <div
          className={`w-2 h-2 rounded-full ${user.isActive ? "bg-green-600" : "bg-transparent"}`}
        />
      </div>
    </div>
  );
}

export default UserCell;
