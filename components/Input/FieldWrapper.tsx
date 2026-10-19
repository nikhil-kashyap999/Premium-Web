import React from "react";

// ── Field wrapper ──────────────────────────────────────────────────────────────
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        className="text-[.6rem] font-medium tracking-widest uppercase"
        style={{ color: "rgba(160,210,170,0.5)", letterSpacing: "0.08em" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs" style={{ color: "rgba(255,120,120,0.75)" }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default Field;
