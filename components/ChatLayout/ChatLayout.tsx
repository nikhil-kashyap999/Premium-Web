import { useEffect, useState } from "react";

import color from "@/lib/color";

import Capsule from "../Capsule/Capsule";
import MessageInput from "../MessageInput/MessageInput";
import SearchBar from "../SearchBar/SearchBar";
import UserCell from "../UserCards/UserCell";
import MessagesContainer from "./MessagesContainer";
import { RefreshCcw } from "lucide-react";
import useFetchContacts from "@/hooks/useFetchContacts";
import { contactType } from "../../Types/ContactsType";
import ChatBanner from "./ChatBanner";
import { useChatStore } from "@/store/ChatStore";
import { useContacts } from "@/store/ContactsStore";
import NotificationCard from "../Notification/NotificationCard";

type ChatContainerProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function ChatLayout({ setIsOpen }: ChatContainerProps) {
  const { fetchContacts, isLoading: isFetchingContacts } = useFetchContacts();
  const returnedContacts = useContacts((s) => s.contacts);
  const { selectContact, selectedContact: contact } = useChatStore();
  const [contacts, setContacts] = useState<contactType[]>(
    returnedContacts || [],
  );
  useEffect(() => {
    setContacts(returnedContacts || []);
  }, [returnedContacts]);

  const onContactClick = (contactObj: contactType) => {
    if (contact?._id != contactObj._id) {
      selectContact(contactObj);
    }
  };

  return (
    <div
      style={{ backgroundColor: color.backgroundColor }}
      className=" w-[95vw] h-[90vh] lg:w-screen lg:h-screen rounded-2xl lg:grid lg:grid-cols-[400px_1fr]"
    >

      <NotificationCard />
      {/* Sidebar */}
      <aside className="hidden lg:flex flex-col h-full min-h-0 px-3 border-r border-neutral-500/50">
        <SectionTitle title="Messages" />

        <div className="w-full py-2 border-b border-neutral-500/50">
          <SearchBar contextList={returnedContacts} setList={setContacts} />
        </div>

        {/* Recents Section */}
        <div className="flex flex-col flex-1 min-h-0 pt-2 mb-3 w-full h-full">
          <div className="w-full flex justify-between items-center">
            <SectionTitle title="Recents" />
            <RefreshButton
              fetchUsers={fetchContacts}
              fetchingUsers={isFetchingContacts}
            />
          </div>
          {isFetchingContacts ? (
            <Loading />
          ) : (
            <div className="flex-1 min-h-0 mt-2 px-1 flex flex-col gap-2 overflow-y-auto pr-2">
              {contacts.length > 0 &&
                contacts.map((user: contactType) => (
                  <UserCell
                    key={user?._id}
                    user={user}
                    onClick={() => onContactClick(user)}
                  />
                ))}
            </div>
          )}
        </div>
      </aside>

      {/* Chat Area */}
      {contact ? (
        <main className="lg:h-screen h-[90vh] grid grid-rows-[10%_80%_10%] lg:grid-rows-[10%_75%_15%]">
          <Capsule setIsOpen={setIsOpen} />
          <MessagesContainer />
          <MessageInput />
        </main>
      ) : (
        <ChatBanner setIsOpen={setIsOpen} />
      )}
    </div>
  );
}

type SectionTitleProps = {
  title: string;
};

function SectionTitle({ title }: SectionTitleProps) {
  return (
    <p className="px-1 pt-3 pb-1.5 text-[10px] font-medium tracking-widest uppercase text-white/25 shrink-0">
      {title}
    </p>
  );
}

function RefreshButton({
  fetchUsers,
  fetchingUsers,
}: {
  fetchUsers: any;
  fetchingUsers?: boolean;
}) {
  return (
    <RefreshCcw
      className={`w-4 h-4 text-neutral-400 cursor-pointer ${fetchingUsers && "animate-spin"}`}
      onClick={fetchUsers}
    />
  );
}
function Loading() {
  return (
    <>
      <div className="w-full bg-black border border-neutral-700 rounded-xl text-center py-2 text-sm">
        Fetching contacts, Loading...
      </div>
    </>
  );
}
export default ChatLayout;
