import axios from "axios";
import Modal from "./Modal";
import { memo, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/store/AuthStore";
import SearchBar from "../SearchBar/SearchBar";
import ActionButton from "../Button/ActionButton";
import { contactType } from "../../Types/ContactsType";
import axiosInstance from "@/lib/axiosInterceptor/axios";
import { useInviteModal } from "@/context/InviteModalContext";
import UserCellWithAction from "../UserCards/UserCellWithAction";
import { useNotification } from "@/context/NotificationContext";

function InviteModal() {
  const authUser = useAuth(s=>s.user);
  const [error, setError] = useState<string>("");
  const { toggleModal, isOpen } = useInviteModal();
  const { success, error: errNotification } = useNotification();
  const [userList, setUserList] = useState<contactType[] | []>([]);

  const apiCall = async (username: string): Promise<void> => {
    try {
      const response = await axiosInstance.get(
        `/api/user/search?q=${username}`,
      );
      setUserList(response.data.res ?? []);
      setError("");
    } catch (error) {
      setUserList([]);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
      } else {
        setError("Unknoen Error");
      }
    }
  };
  const sendInvite = async (receiverId: string) => {
    try {
      const res = await axiosInstance.post("/api/user/invite-send", {
        receiverId,
      });
      const { message } = res.data ?? "Invite sent";
      success(message);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const { message: errMsg } =
          err.response?.data ?? "Error in sending Invite";
        errNotification(errMsg);
      }
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setUserList([]);
      setError("");
    }
  }, [isOpen]);

  return (
    <Modal toggleModal={toggleModal} isOpen={isOpen} label="Invite">
      {/* Search */}
      <div className="w-full px-3 py-1">
        <SearchBar
          setList={setUserList}
          callApi={apiCall}
          externalSearchBar={true}
        />
      </div>
      {/* User list */}
      <div className="w-full flex-1 lg:max-h-[70%] overflow-y-scroll px-5 flex flex-col gap-y-3 py-2">
        {userList.length > 0 &&
          userList.map((user: any) => (
            <UserCellWithAction user={user} key={user._id}>
              {authUser?._id !== user._id && (
                <ActionButton
                  label="invite"
                  action={() => sendInvite(user._id)}
                />
              )}
            </UserCellWithAction>
          ))}
        {error && (
          <span className="text-center text-sm text-neutral-500">{error}</span>
        )}
      </div>
    </Modal>
  );
}

export default memo(InviteModal);
