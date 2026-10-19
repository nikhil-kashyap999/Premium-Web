export type NotificationType = "success" | "error" | "info" | "warning" | "chat";

export interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}
