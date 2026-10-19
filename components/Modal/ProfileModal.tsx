import Modal from "./Modal";
import { useProfileModal } from "@/context/ProfileModalContext";
import { useAuth } from "@/store/AuthStore";
import Image from "next/image";

function ProfileModal() {
  const { user } = useAuth();
  const { toggleModal, isOpen } = useProfileModal();
  const extractTImeandDate = () => {
    const accountCreationDate = user?.createdAt?.split("T");
    return {
      date: accountCreationDate?.[0],
      time: accountCreationDate?.[1].slice(0, 5),
    };
  };
  const { date, time } = extractTImeandDate();
  if (user != null) {
    return (
      <>
        <Modal toggleModal={toggleModal} label="Profile" isOpen={isOpen}>
          <div className="w-full lg:px-3 px-1 flex items-center">
            <div className="lg:w-36 w-28 h-full flex justify-center items-center py-2 px-2 lg:px-0">
              <div className="bg-black/60 border border-neutral-800 lg:p-3 p-1 rounded-2xl">
                <Image
                  src={user?.avatarUrl}
                  alt="avatar"
                  width={100}
                  height={100}
                />
              </div>
            </div>

            <div className="flex-1 h-full">
              <h1 className="text-md font-normal text-neutral-200 tracking-wider">
                {user.username}
              </h1>
              <h1 className="text-xs font-normal text-neutral-400">
                {user.email}
              </h1>
              <h1 className="text-xs font-normal text-neutral-400">
                <span>Account createdAt : </span>
                {date}
                <span> | {time}</span>
              </h1>
              <div className="bg-black/60 rounded-lg min-w-1.5 h-6 mt-3 border border-neutral-700 max-w-fit px-3 flex justify-center items-center">
                {user?.isActive ? (
                  <span className="text-xs text-blue-600">Active</span>
                ) : (
                  <span className="text-xs text-neutral-500">Inactive</span>
                )}
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default ProfileModal;
