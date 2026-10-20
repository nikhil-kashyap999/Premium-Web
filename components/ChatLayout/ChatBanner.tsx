import { Menu } from "lucide-react";

export default function ChatBanner({ setIsOpen }: any) {
  return (
    <div className="relative flex h-full w-full flex-col items-center overflow-hidden">
      <div className="w-full flex justify-end lg:hidden py-3 ">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="lg:hidden p-2 rounded-lg bg-black/50 backdrop-blur-md"
        >
          <Menu className="w-5 h-5 text-white" />
        </button>
      </div>
      <div className="flex flex-col items-center justify-center gap-6 overflow-hidden px-8 text-center flex-1">
        {/* ambient glow */}
        <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-[#3d5c3f] opacity-25 blur-[100px]" />

        {/* signature: paper plane mid-send, with a dotted trail — literal nod to "sendme" */}
        <div className="relative z-10">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            className="drop-shadow-[0_0_18px_rgba(201,162,39,0.15)]"
            style={{ animation: "sendme-float 4.5s ease-in-out infinite" }}
          >
            {/* dotted trail */}
            <circle cx="18" cy="88" r="2.2" fill="#c9a227" opacity="0.35" />
            <circle cx="30" cy="80" r="2.6" fill="#c9a227" opacity="0.5" />
            <circle cx="43" cy="71" r="3" fill="#c9a227" opacity="0.7" />

            {/* paper plane */}
            <g transform="rotate(-18 60 60)">
              <path d="M85 35 L38 58 L58 66 L85 35Z" fill="#e8ddc4" />
              <path d="M85 35 L58 66 L64 84 L85 35Z" fill="#f4ede0" />
              <path
                d="M85 35 L58 66 L38 58 L85 35Z"
                stroke="#c9a227"
                strokeWidth="1.2"
                strokeOpacity="0.4"
                fill="none"
              />
            </g>
          </svg>
        </div>

        <div className="relative z-10 space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-[#f4ede0]">
            Nothing selected yet
          </h2>
          <p className="max-w-70 text-sm leading-relaxed text-[#a9b8a6]">
            Pick a contact from the list to open the conversation.
          </p>
        </div>

        <style>{`
        @keyframes sendme-float {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-14px) rotate(2deg); }
        }
      `}</style>
      </div>
    </div>
  );
}
