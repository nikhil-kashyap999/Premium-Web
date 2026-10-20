import { socket } from "./socket";
import { CLIENT_EVENTS } from "./event";
import {
  MessageStatusType,
  TransmittingMessageType,
} from "@/Types/BareMessageType";

export const sendMessage = (data: TransmittingMessageType) => {
  socket.emit(CLIENT_EVENTS.MESSAGE_SEND, data);
};

export const sendMessageStatus = (payload: MessageStatusType) => {
  socket.emit(CLIENT_EVENTS.MESSAGE_STATUS, payload);
};
