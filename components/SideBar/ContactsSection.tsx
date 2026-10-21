import UserCell from "../UserCards/UserCell";
import { contactType } from "@/Types/ContactsType";

export default function ContactsSection({
  userContacts,
  onContactClick,
}: {
  userContacts: contactType[];
  onContactClick: (user: contactType) => void;
}) {
  return (
    <div className="flex-1 overflow-y-auto px-2 pb-2 scrollbar-thin scrollbar-thumb-white/10 flex flex-col gap-y-2">
      {userContacts.length > 0 &&
        userContacts.map((user: contactType) => (
          <UserCell
            user={user}
            key={user._id}
            onClick={() => onContactClick(user)}
          />
        ))}
    </div>
  );
}
