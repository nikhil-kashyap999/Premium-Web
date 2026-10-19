"use client";
import Modal from "./Modal";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { useRequestModal } from "@/context/RequestModalContext";
import { useLoading } from "@/store/LoadingStore";
import LoadingModule from "./LoadingModal";
import UserCellWithAction from "../UserCards/UserCellWithAction";
import ActionButton from "../Button/ActionButton";
import axiosInstance from "@/lib/axiosInterceptor/axios";
import { useNotification } from "@/context/NotificationContext";

export default function RequestModal() {
  const [list, setList] = useState<[]>([]);
  const { success, error } = useNotification();
  const { toggleModal, isOpen } = useRequestModal();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const acceptInvite = async (senderId: string) => {
    if (!senderId) return;
    try {
      const res = await axiosInstance.post("/api/user/accept-invite", {
        senderId,
      });
      const { message } = res.data ?? "Invite accepted";
      success(message);
    } catch (err) {
      alert("Invite accept faild");
    }
  };

  useEffect(() => {
    const fetchRequets = async () => {
      try {
        startLoading();
        const res = await axiosInstance.get("/api/user/requests");
        setList(res?.data?.res ?? []);
        stopLoading();
      } catch (err) {
        error("Failed to fecth requests");
      } finally {
        stopLoading();
      }
    };
    if (isOpen) fetchRequets();
  }, [isOpen]);
  if (isLoading) {
    return (
      <>
        <Modal toggleModal={toggleModal} isOpen={isOpen} label="Requests">
          <LoadingModule isOpen={isLoading} onClose={stopLoading} />
        </Modal>
      </>
    );
  }
  return (
    <>
      <Modal toggleModal={toggleModal} isOpen={isOpen} label="Requests">
        {/* Search */}
        {list.length == 0 ? (
          <span className="text-sm text-center text-neutral-400 py-3">
            Chat request section is empty
          </span>
        ) : (
          <>
            <div className="w-full px-3 py-1">
              <SearchBar contextList={list} setList={setList} />
            </div>
            {/* User list */}
            <div className="w-full flex-1 lg:max-h-[70%] overflow-y-scroll px-5 flex flex-col gap-y-3 py-2">
              {list.length > 0 &&
                list.map((user: any) => (
                  <UserCellWithAction user={user.sender} key={user.requestId}>
                    <ActionButton
                      label="accept"
                      action={() => acceptInvite(user.sender._id)}
                      className="text-blue-500"
                    />
                    <ActionButton
                      label="reject"
                      action={() => alert("rejected")}
                      className="text-red-500"
                    />
                  </UserCellWithAction>
                ))}
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
