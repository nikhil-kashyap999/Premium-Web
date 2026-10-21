import { SERVER_EVENTS } from "./event";
import { Socket } from "socket.io-client";
import { useAuth } from "@/store/AuthStore";
import { useChatStore } from "@/store/ChatStore";
import { saveMessage, updateMessageStatusInDB } from "@/lib/db/messageRepo";
import { useContacts } from "@/store/ContactsStore";
import { IncomingMessageType, Status } from "@/Types/BareMessageType";
import { messageInterface, SendType } from "@/Types/ContactsType";
import { useNotificationStore } from "@/store/NotificationStore";
import { sendMessageStatus } from "./emitters";

export function registerSocketListners(socket: Socket) {
  const onConnect = () => {
    socket.connect();
    socket.emit("ping", "Hello from web client");
  };
  const onDisconnect = (reason: string) => {
    console.log("❌ Socket disconnected:", reason);
  };
  const onPresence = (data: any) => {
    useContacts.getState().updateContactStatus(data);
  };
  const onNewMessage = async (data: IncomingMessageType) => {
    const id = data.messageid ?? generateId();
    const messageStatus = data.senderid === useChatStore.getState().selectedContact?._id ? "read" : "delivered";
    const partnerid =
      data.senderid === useAuth.getState().user?._id
        ? data.receiverid
        : data.senderid;
    const enrichedMsg: messageInterface = {
      ...data,
      id,
      partnerid,
      intent: SendType.RECEIVED,
      status: messageStatus,
    };
    if (data.senderid !== useChatStore.getState().selectedContact?._id) {
      const contact = useContacts.getState().getContact(data.senderid);
      useNotificationStore.getState().showModal(
        {
          username: contact?.username ?? "username",
          avatarUrl: contact?.avatarUrl ?? null,
        },
        "new message",
      );
      await saveMessage(enrichedMsg);
    }
    useChatStore
      .getState()
      .pushMessage(enrichedMsg, useAuth.getState().user?._id);
    await saveMessage(enrichedMsg);
    sendMessageStatus({
      messageid: id,
      receiverid: data.senderid,
      status: messageStatus,
    });
  };
  const onInviteNotification = (data: {
    username: string;
    avatarUrl: string;
  }) => {
    if (!data.avatarUrl || !data.username) return;
    useNotificationStore
      .getState()
      .showModal(
        { username: data.username, avatarUrl: data.avatarUrl },
        "invite notification",
      );
  };
  const onMessageAck = async (payload: {
    messageid: string;
    receiverid: string;
    status: Status
  }) => {
    useChatStore
      .getState()
      .updateMessageStatus(payload.messageid, payload.receiverid, "sent");
    updateMessageStatusInDB(payload.messageid, "read");
  };
  const onMessageStatus = async (payload: {
    messageid: string;
    senderid: string;
    receiverid: string;
    status: Status;
  }) => {
    useChatStore
      .getState()
      .updateMessageStatus(payload.messageid, payload.senderid, payload.status);
    updateMessageStatusInDB(payload.messageid, payload.status);
  };

  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);
  socket.on(SERVER_EVENTS.MESSAGE_NEW, onNewMessage);
  socket.on(SERVER_EVENTS.PRESENCE_UPDATE, onPresence);
  socket.on(SERVER_EVENTS.INVITE_NOTIFICATION, onInviteNotification);
  socket.on(SERVER_EVENTS.MESSAGE_ACK, onMessageAck);
  socket.on(SERVER_EVENTS.MESSAGE_STATUS, onMessageStatus);

  socket.on("pong", () => console.log("pong event"));
  socket.on("connect_error", async (e) => {
    console.error(e);
  });

  return () => {
    socket.off("connect", onConnect);
    socket.off("disconnect", onDisconnect);
    socket.off(SERVER_EVENTS.MESSAGE_NEW, onNewMessage);
    socket.off(SERVER_EVENTS.PRESENCE_UPDATE, onPresence);
    socket.off(SERVER_EVENTS.INVITE_NOTIFICATION, onInviteNotification);
    socket.off(SERVER_EVENTS.MESSAGE_ACK, onMessageAck);
    socket.off(SERVER_EVENTS.MESSAGE_STATUS, onMessageStatus);

    socket.off("pong", () => console.log("pong event"));
    socket.off("connect_error", async (err) => {
      console.log(err);
    });
  };
}

const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};
