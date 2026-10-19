import { X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLogoutModal } from "@/context/LogoutModalContext";
import useLogout from "@/hooks/useLogout";

export default function LogoutModal() {
  const  logout  = useLogout();
  const { isOpen: isVisible, toggleModal: toggleLogoutModal } =
    useLogoutModal();
  const [mounted, setMounted] = useState(false);
  const [animate, setAnimate] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible) {
      setMounted(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    } else {
      setAnimate(false);
      const t = setTimeout(() => setMounted(false), 280);
      return () => clearTimeout(t);
    }
  }, [isVisible]);

  // Close on backdrop click (not modal click)
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) toggleLogoutModal();
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isVisible) toggleLogoutModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isVisible, toggleLogoutModal]);

  if (!mounted) return null;
  if (!isVisible) return null;

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      role="presentation"
      className={`absolute inset-0 z-50 flex items-center justify-center px-3 lg:px-0
        transition-opacity duration-250
        ${animate ? "opacity-100" : "opacity-0"}`}
      style={{
        background: "rgba(4, 10, 6, 0.80)",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-modal-title"
        className={`bg-neutral-800 rounded-2xl w-xs lg:w-80 px-2 pb-1
          transition-all duration-250
          ${animate ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <div className="p-2 flex justify-between items-center border-b-neutral-600 border-b">
          <h2 id="logout-modal-title" className="text-sm text-neutral-400">
            Logout confirmation
          </h2>
          <button
            type="button"
            aria-label="Close"
            className="hover:bg-black bg-neutral-900 rounded-lg p-1"
            onClick={toggleLogoutModal}
          >
            <X className="text-neutral-400" size={20} />
          </button>
        </div>

        <div className="w-full p-2">
          <p className="text-sm text-neutral-300 text-center">
            Are you sure you want to logout?
          </p>
          <div className="w-full mt-4 flex justify-around px-2 gap-x-2">
            <button
              type="button"
              className="px-4 text-red-500 hover:text-red-600 duration-200 py-2 rounded-lg text-xs cursor-pointer bg-neutral-950 flex-1"
              onClick={logout}
            >
              Logout
            </button>
            <button
              type="button"
              // ref={cancelBtnRef}
              className="px-4 text-white hover:text-gray-500 duration-200 py-2 rounded-lg text-xs cursor-pointer bg-neutral-950 flex-1"
              onClick={toggleLogoutModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
