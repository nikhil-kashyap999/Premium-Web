"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Notification, NotificationType } from "./types/NotificationTypes";
import { NotificationViewport } from "@/components/Notification/NotificationViewport";

interface NotificationContextValue {
  notify: (message: string, type?: NotificationType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  chat: (message: string, duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null,
);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotification] = useState<Notification[]>([]);

  const remove = useCallback((id: string) => {
    setNotification((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const notify = useCallback(
    (message: string, type: NotificationType = "info", duration = 3500) => {
      // const id = crypto.randomUUID();
      const id = generateId();
      setNotification((prev) => [...prev, { id, message, type }]);
      setTimeout(() => remove(id), duration);
    },
    [remove],
  );

  const success = useCallback(
    (message: string, d = 3500) => notify(message, "success", d),
    [notify],
  );
  const error = useCallback(
    (message: string, d = 3500) => notify(message, "error", d),
    [notify],
  );
  const info = useCallback(
    (message: string, d = 3500) => notify(message, "info", d),
    [notify],
  );
  const warning = useCallback(
    (message: string, d = 3500) => notify(message, "warning", d),
    [notify],
  );
  const chat = useCallback(
    (message: string, d = 3500) => notify(message, "chat", d),
    [notify],
  );

  const value: NotificationContextValue = useMemo(
    () => ({
      notifications,
      notify,
      success,
      error,
      info,
      warning,
      chat,
      remove,
    }),
    [notifications, notify, error, success, info, warning, chat, remove],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationViewport notifications={notifications} onDismiss={remove} />
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error("useNotification must be used within NotificationProvider");
  }
  return ctx;
}

function generateId(): string {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for non-secure contexts (e.g., dev on mobile via local IP)
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}
