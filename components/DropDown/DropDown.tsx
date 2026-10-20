"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Dropdown.module.css";
import { EllipsisVerticalIcon } from "lucide-react";

export type DropdownItem = {
  label: string;
  onSelect?: () => void;
  danger?: boolean;
};

type DropdownProps = {
  label: string;
  items: DropdownItem[];
};

export default function Dropdown({ label, items }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) triggerRef.current?.focus();
  }, []);

  // Open hote hi pehle item pe focus + Escape se close
  useEffect(() => {
    if (!open) return;

    const first =
      menuRef.current?.querySelector<HTMLButtonElement>('[role="menuitem"]');
    first?.focus({ preventScroll: true });

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  // Arrow keys se items ke beech navigate
  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const nodes = Array.from(
      menuRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="menuitem"]',
      ) ?? [],
    );
    const index = nodes.indexOf(document.activeElement as HTMLButtonElement);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      nodes[(index + 1) % nodes.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      nodes[(index - 1 + nodes.length) % nodes.length]?.focus();
    }
  };

  return (
    <div className={styles.root}>
      {/* Blurred backdrop: click karne pe menu close */}
      <div
        className={styles.backdrop}
        data-open={open}
        onClick={() => close(false)}
        aria-hidden="true"
      />

      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="p-2 rounded-lg bg-black/50 backdrop-blur-md cursor-pointer"
      >
        <EllipsisVerticalIcon className="w-5 h-5 text-white" />
      </button>

      <div
        ref={menuRef}
        role="menu"
        className={styles.menu}
        data-open={open}
        onKeyDown={onMenuKeyDown}
      >
        {items.map((item, i) => (
          <button
            key={item.label}
            role="menuitem"
            type="button"
            tabIndex={open ? 0 : -1}
            className={`${styles.item} ${item.danger ? styles.danger : ""}`}
            style={{ "--i": i } as React.CSSProperties}
            onClick={() => {
              item.onSelect?.();
              close();
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
