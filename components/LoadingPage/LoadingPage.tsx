import icon from "@/assets/images/logo.png";
import { APP_NAME } from "@/constants/App-constants";
import Image from "next/image";

function LoadingPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none fixed inset-0 flex justify-center items-center"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(60,150,80,0.08) 0%, transparent 60%)",
        }}
      />

      <div
        role="status"
        aria-live="polite"
        className="relative flex flex-col items-center gap-3"
      >
        <div className="w-32 h-32 rounded-2xl flex flex-col items-center justify-center gap-2 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
          <Image
            src={icon}
            alt="logo"
            width={64}
            height={64}
            priority
            className="opacity-90 w-16 h-auto"
          />
          <h1 className="text-neutral-400 text-sm font-medium tracking-wide">
            {APP_NAME}
          </h1>
        </div>

        <div className="w-44 bg-black/30 rounded-2xl flex items-center justify-center gap-2 py-2.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]">
          {/* spinner */}
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500/60 animate-ping" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
          </span>
          <p className="text-xs text-neutral-400">Authenticating…</p>
        </div>
      </div>
    </div>
  );
}

export default LoadingPage;
