"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  NotificationLabelType,
  useNotificationStore,
} from "@/store/NotificationStore"; // apna path

const LABEL_CONFIG: Record<
  NotificationLabelType,
  { title: string; icon: string; accent: string }
> = {
  "invite notification": {
    title: "sent you an invite",
    icon: "👋",
    accent: "bg-blue-500",
  },
  "new message": {
    title: "sent you a message",
    icon: "💬",
    accent: "bg-green-500",
  },
};

const HIDE_MS = 250;

export default function NotificationCard() {
  const duration = useNotificationStore((s) => s.duration);
  const onPress = useNotificationStore((s) => s.onPress);
  const userInfo = useNotificationStore((s) => s.userInfo);
  const hideNoti = useNotificationStore((s) => s.hideModal);
  const label = useNotificationStore((s) => s.NotificationLabel);
  const isVisible = useNotificationStore((s) => s.isNotificationVisible);

  // `shown` sirf animation drive karta hai (slide in / slide out)
  const [shown, setShown] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const config = LABEL_CONFIG[label];

  const hide = useCallback(() => {
    setShown(false); // slide out
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => hideNoti(), HIDE_MS);
  }, [hideNoti]);

  useEffect(() => {
    if (!isVisible) return;

    // ek frame baad true karte hain taaki initial (off-screen) state se transition chale
    const raf = requestAnimationFrame(() => setShown(true));
    const autoHide = setTimeout(hide, duration);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(autoHide);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [isVisible, duration, hide]);

  if (!isVisible) return null;

  return (
    <div
      className={[
        "fixed z-50 pointer-events-none",
        // mobile: upper centre
        "top-4 inset-x-0 px-3",
        // desktop (md+): bottom left
        "md:inset-x-auto md:top-auto md:bottom-4 md:left-4 md:px-0 md:w-96",
      ].join(" ")}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          onPress?.();
          hide();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onPress?.();
            hide();
          }
        }}
        className={[
          "pointer-events-auto flex flex-row items-center bg-neutral-800 rounded-2xl p-3",
          "cursor-pointer select-none active:opacity-90",
          "transition-transform",
          // slide in: spring jaisa overshoot, slide out: simple ease
          shown
            ? "translate-y-0 duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            : "translate-y-[150%] md:translate-y-[150%] duration-250 ease-in",
        ].join(" ")}
      >
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={userInfo?.avatarUrl || "/images/default-avatar.png"}
            alt={userInfo?.username ?? "avatar"}
            className="w-11 h-11 rounded-full bg-neutral-600 object-cover"
          />
          <div
            className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${config.accent}`}
          >
            <span className="text-[10px] leading-none">{config.icon}</span>
          </div>
        </div>

        <div className="flex-1 ml-3 min-w-0">
          <p className="text-white font-semibold truncate">
            {userInfo?.username}
          </p>
          <p className="text-neutral-300 text-xs truncate">{config.title}</p>
        </div>

        <button
          type="button"
          aria-label="Close notification"
          onClick={(e) => {
            e.stopPropagation(); // card ka onPress trigger na ho
            hide();
          }}
          className="p-2 -m-2 text-neutral-400 text-lg hover:text-neutral-200"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
