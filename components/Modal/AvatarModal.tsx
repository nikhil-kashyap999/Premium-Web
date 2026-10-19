import React, { useState } from "react";
import Modal from "./Modal";
import Image from "next/image";
import avatars, { avatarType } from "@/lib/avatarurl";

function AvatarModal({
  isOpen,
  toggle,
  onAvatarSelect,
}: {
  isOpen: boolean;
  toggle: () => void;
  onAvatarSelect: (url: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (url: string) => {
    setSelected(url);
  };

  const handleConfirm = () => {
    if (!selected) return;
    onAvatarSelect(selected);
    toggle();
  };

  return (
    <Modal isOpen={isOpen} toggleModal={toggle} label="Avatar">
        <div className="grid lg:grid-cols-4 grid-cols-3  gap-2 overflow-y-auto place-self-center p-2 w-full">
          {avatars.map((avatar: avatarType) => (
            <button
              key={avatar.id}
              onClick={() => handleSelect(avatar.avatarSrc)}
              className={`lg:w-32 lg:h-32 w-28 h-28 rounded-3xl border-2 flex items-center justify-center transition-colors ${
                selected === avatar.avatarSrc
                  ? "border-green-500 bg-green-500/10"
                  : "border-neutral-600 hover:border-neutral-400"
              }`}
            >
              <Image
                src={avatar.avatarSrc}
                alt="avatar"
                width={100}
                height={100}
              />
            </button>
          ))}
        </div>

        {/* Confirm button */}
       <div className="w-full px-4">
         <button
          onClick={handleConfirm}
          disabled={!selected}
          className="w-full py-2 rounded-xl bg-green-700 text-white font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
        >
          Select Avatar
        </button>
       </div>
    </Modal>
  );
}

export default AvatarModal;
