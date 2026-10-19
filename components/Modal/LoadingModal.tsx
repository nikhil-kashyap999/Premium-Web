"use client";

import { useEffect, useState } from "react";

interface LoadingInvitesModalProps {
  isOpen: boolean;
  onClose?: () => void;
  label?: string;
  subLabel?: string;
}

const SkeletonRow = ({ delay }: { delay: string }) => (
  <div
    className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/5"
    style={{
      background: "rgba(255,255,255,0.03)",
      animationDelay: delay,
    }}
  >
    <div
      className="w-8 h-8 rounded-full shrink-0 animate-pulse"
      style={{ background: "rgba(120, 200, 140, 0.12)" }}
    />
    <div className="flex flex-col gap-1.5 flex-1">
      <div
        className="h-2 rounded-full animate-pulse"
        style={{
          width: "65%",
          background: "rgba(255,255,255,0.1)",
        }}
      />
      <div
        className="h-2 rounded-full animate-pulse"
        style={{
          width: "40%",
          background: "rgba(255,255,255,0.06)",
          animationDelay: "0.15s",
        }}
      />
    </div>
    <div
      className="w-14 h-6 rounded-lg animate-pulse shrink-0"
      style={{ background: "rgba(120,200,140,0.08)" }}
    />
  </div>
);

const SpinnerArc = () => (
  <svg
    viewBox="0 0 56 56"
    width="56"
    height="56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="animate-spin"
    style={{ animationDuration: "1.1s", animationTimingFunction: "linear" }}
  >
    <circle
      cx="28"
      cy="28"
      r="23"
      stroke="rgba(100,180,120,0.1)"
      strokeWidth="2.5"
    />
    <path
      d="M28 5 A23 23 0 0 1 51 28"
      stroke="rgba(130,220,150,0.9)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M51 28 A23 23 0 0 1 40 47"
      stroke="rgba(130,220,150,0.35)"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const PulseDots = () => (
  <div className="flex items-center gap-1.5">
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="w-1.5 h-1.5 rounded-full"
        style={{
          background: "rgba(130,210,150,0.5)",
          animation: "dotPulse 1.2s ease-in-out infinite",
          animationDelay: `${i * 0.2}s`,
        }}
      />
    ))}
  </div>
);

export default function LoadingModule({
  isOpen,
  onClose,
  label,
  subLabel,
}: LoadingInvitesModalProps) {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setVisible(true));
      });
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      <style>{`
        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.4); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-card-enter {
          animation: fadeInUp 0.28s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
        .modal-card-exit {
          animation: fadeInUp 0.2s cubic-bezier(0.22, 1, 0.36, 1) reverse forwards;
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        className="transition-opacity duration-300 absolute w-full h-full"
        style={{
          backdropFilter: "blur(4px)",
          opacity: visible ? 1 : 0,
        }}
      />

      {/* Modal */}
      <div className="flex items-center justify-center pointer-events-none ">
        <div
          className={`pointer-events-auto w-full max-w-sm mx-4 rounded-2xl flex flex-col items-center gap-5 relative overflow-hidden ${
            visible ? "modal-card-enter" : "modal-card-exit"
          }`}
        >
          {/* Top glow */}
          <div
            className="absolute inset-x-0 top-0 h-24 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% -10%, rgba(80,190,110,0.1) 0%, transparent 70%)",
            }}
          />

          {/* Spinner */}
          <SpinnerArc />

          {/* Text */}
          <div className="text-center">
            <p
              className="text-sm font-medium"
              style={{ color: "rgba(200,235,210,0.9)" }}
            >
              Loading {label}
            </p>
            <p
              className="text-xs mt-1"
              style={{ color: "rgba(160,210,170,0.45)" }}
            >
              {subLabel ? subLabel : "Fetching your pending requests"}
            </p>
          </div>

          {/* Pulse dots */}
          <PulseDots />

          {/* Skeleton rows */}
          <div className="w-full flex flex-col gap-2">
            <SkeletonRow delay="0s" />
            <SkeletonRow delay="0.12s" />
            <SkeletonRow delay="0.24s" />
          </div>

          {/* Cancel */}
          {onClose && (
            <button
              onClick={onClose}
              className="text-xs rounded-lg px-3 py-1.5 transition-colors duration-150 border border-neutral-600"
              style={{
                color: "rgba(160,210,170,0.4)",
                background: "transparent",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "rgba(160,210,170,0.75)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(160,210,170,0.4)")
              }
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </>
  );
}
