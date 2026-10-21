"use client";

import { useEffect, useState, useRef, memo } from "react";

interface ModalProps {
  isOpen: boolean;
  toggleModal: () => void;
  label: string;
  children?: React.ReactNode;
}

function Modal({ isOpen, toggleModal, label, children }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    } else {
      setAnimate(false);
      const t = setTimeout(() => setMounted(false), 280);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  // Close on backdrop click (not modal click)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) toggleModal();
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) toggleModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, toggleModal]);

  if (!mounted) return null;

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      aria-hidden="true"
      className={`absolute inset-0 z-50 flex items-center justify-center px-3 lg:px-0
        transition-opacity duration-250
        ${animate ? "opacity-100" : "opacity-0"}`}
      style={{
        background: "rgba(4, 10, 6, 0.80)",
        backdropFilter: "blur(6px)",
      }}
    >
      {/* Modal card */}
      <div
        className={`relative w-full lg:max-w-xl flex flex-col rounded-2xl overflow-hidden
          transition-all duration-260 ease-[cubic-bezier(0.22,1,0.36,1)] max-h-max
          ${animate ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-[0.96] translate-y-3"}`}
        style={{
          maxHeight: "62vh",
          background: "rgba(18, 30, 20, 0.82)",
          border: "0.5px solid rgba(120,180,130,0.14)",
          boxShadow: "0 32px 20px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(0,0,0,0.3)",
        }}
      >
        {/* Ambient top glow */}
        <div
          className="absolute inset-x-0 top-0 h-20 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% -20%, rgba(80,190,110,0.09) 0%, transparent 70%)",
          }}
        />

        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 shrink-0"
          style={{ borderBottom: "0.5px solid rgba(255,255,255,0.06)" }}
        >
          <span
            className="text-xs font-medium tracking-widest uppercase"
            style={{ color: "rgba(160,210,170,0.45)", letterSpacing: "0.1em" }}
          >
            {label}
          </span>

          {/* Close X button */}
          <button
            type="button"
            onClick={toggleModal}
            className="w-6 h-6 flex items-center justify-center rounded-md transition-colors duration-150"
            style={{ color: "rgba(160,210,170,0.4)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "rgba(200,235,210,0.8)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(160,210,170,0.4)")
            }
            aria-label="Close modal"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M1 1l10 10M11 1L1 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}

        {children}

        {/* Footer */}
        <div
          className="flex gap-2 px-4 py-3 shrink-0"
          style={{ borderTop: "0.5px solid rgba(255,255,255,0.06)" }}
        >
          <button
            type="button"
            onClick={toggleModal}
            className="flex-1 py-2 rounded-xl text-sm font-medium transition-all duration-150 active:scale-[0.98]"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "0.5px solid rgba(255,255,255,0.08)",
              color: "rgba(160,210,170,0.6)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              e.currentTarget.style.color = "rgba(200,235,210,0.85)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.04)";
              e.currentTarget.style.color = "rgba(160,210,170,0.6)";
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
export default memo(Modal);
