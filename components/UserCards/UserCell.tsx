import Image from "next/image";
import { contactType } from "../../Types/ContactsType";
import { useChatStore } from "@/store/ChatStore";
import { EllipsisVerticalIcon } from "lucide-react";

function UserCell({ user, onClick }: { user: contactType; onClick?: any }) {
  const { getLastMessageForContact } = useChatStore();
  const lastMessage = getLastMessageForContact(user._id);

  return (
    <div
      className="w-full h-16 lg:bg-black/10 bg-neutral-900 rounded-xl p-1 px-2 flex items-center hover:bg-green-950 cursor-pointer transition-colors duration-200"
      onClick={onClick}
    >
      {/* Avatar */}
      <div className="w-10 h-10 shrink-0 rounded-full mr-2 bg-green-950 relative">
        <Image
          src={user?.avatarUrl ?? "/images/default-avatar.png"}
          alt="avatar"
          className="w-full h-full"
          width={20}
          height={10}
        />
        <div
          className={`w-2 h-2 ${user?.isActive ? "bg-sky-600" : "bg-neutral-500"} absolute rounded-full bottom-1 -right-0.5`}
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <h1 className="text-sm font-semibold truncate">{user.username}</h1>
        <p className="text-xs text-neutral-400 truncate font-light italic">
          {lastMessage?.message ?? "Recent Messages will appear here"}
        </p>
      </div>
      <button className="h-full p-2" onClick={() => alert("msg")}>
        <EllipsisVerticalIcon size={20} color="white" />
      </button>
    </div>
  );
}

export default UserCell;
