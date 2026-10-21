import { Status } from "./BareMessageType";

export enum SendType {
  SENT = "sent",
  RECEIVED = "received",
}

export interface messageInterface {
  id: string;
  senderid?: string;
  receiverid?: string;
  partnerid?: string;
  message: string;
  intent: SendType;
  status: Status;
  createdAt: string | number;
}

export type contactType = {
  _id: string;
  username: string;
  email: string;
  avatarUrl: string;
  isActive: boolean;
  lastMessage?: string;
  messages?: messageInterface[] | null;
};
