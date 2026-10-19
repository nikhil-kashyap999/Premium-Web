import Image from "next/image";
import { contactType } from "../../Types/ContactsType";

function UserCellWithAction({
  user,
  children,
}: {
  user: contactType & { username: string; avatarUrl: string };
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="w-full h-16 bg-green-300/10 rounded-xl p-1 flex items-center hover:bg-green-950 cursor-pointer transition-colors duration-200">
        {/* Avatar */}
        <div className="w-12 h-12 shrink-0 rounded-full bg-green-950 mr-2 overflow-hidden border border-neutral-500">
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
          <p className="text-xs text-neutral-400 truncate">{user?.email}</p>
        </div>
        <div className="flex gap-x-2 lg:mr-4">{children}</div>
      </div>
    </>
  );
}

export default UserCellWithAction;
