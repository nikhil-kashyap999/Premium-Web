import { Status } from "./BareMessageType";

export type IntentType = "sent" | "received";

// export enum IntentType {
//   SENT = "sent",
//   RECEIVED = "received",
// }

export interface messageInterface {
  id: string;
  status: Status;
  message: string;
  senderid?: string;
  intent: IntentType;
  partnerid?: string;
  receiverid?: string;
  createdAt: string | number;
}

export type contactType = {
  _id: string;
  email: string;
  username: string;
  avatarUrl: string;
  isActive: boolean;
  lastMessage?: string;
  messages?: messageInterface[] | null;
};
