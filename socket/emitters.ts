import { socket } from "./socket";
import { CLIENT_EVENTS } from "./event";
import { TransmittingMessageType } from "@/Types/BareMessageType";

export const sendMessage = (data: TransmittingMessageType) => {
  socket.emit(CLIENT_EVENTS.MESSAGE_SEND, data);
};
