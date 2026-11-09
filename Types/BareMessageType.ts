export type IncomingMessageType = {
  senderid: string;
  receiverid: string;
  message: string;
  messageid: string;
  createdAt: number | string;
  status: Status
};
export type TransmittingMessageType = Pick<
  IncomingMessageType,
  "receiverid" | "message" | "messageid" | "createdAt"
>;
// export type Status = "sending" | "sent" | "delivered" | "read";
export type Status = "Pending" | "Delivered" | "Seen" | "Sent" | "Error";
export type MessageStatusType = {
  messageid: string;
  receiverid: string;
  status: Status;
};
