"use client";

import { Notification } from "@/context/types/NotificationTypes";
import { CheckCircle2, XCircle, Info, AlertTriangle, X, MessagesSquare } from "lucide-react";
import { JSX } from "react";

const styles: Record<Notification["type"], { bg: string; icon: JSX.Element }> =
  {
    success: {
      bg: "bg-black border-neutral-800 text-emerald-400",
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400" />,
    },
    error: {
      bg: "bg-black border-neutral-700 text-red-400",
      icon: <XCircle className="w-5 h-5 text-red-400" />,
    },
    info: {
      bg: "bg-black border-neutral-700 text-blue-400",
      icon: <Info className="w-5 h-5 text-blue-400" />,
    },
    warning: {
      bg: "bg-black border-neutral-700 text-amber-400",
      icon: <AlertTriangle className="w-5 h-5 text-amber-400" />,
    },
    chat: {
      bg: "bg-black border-neutral-700 text-amber-400",
      icon: <MessagesSquare className="w-5 h-5 text-neutral-600" />,
    },
  };

export function NotificationViewport({
  notifications,
  onDismiss,
}: {
  notifications: Notification[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="fixed top-4 md:right-4 z-9999 flex flex-col gap-2 w-80 md:mx-0 md:left-auto mx-auto right-0 left-0">
      {notifications.map((n) => (
        <div
          key={n.id}
          className={`flex items-start gap-3 rounded-2xl border backdrop-blur-md px-4 py-3 shadow-lg
                      animate-[slideIn_0.25s_ease-out] ${styles[n.type].bg}`}
        >
          {styles[n.type].icon}
          <p className="flex-1 text-sm text-white/90">{n.message}</p>
          <button
            onClick={() => onDismiss(n.id)}
            className="text-white/40 hover:text-white/80 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}

      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
