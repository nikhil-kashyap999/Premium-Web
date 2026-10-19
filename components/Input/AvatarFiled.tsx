import Image from "next/image";
import { useAvatarModal } from "@/store/AvatarModelStore";

function AvatarFiled({
  selectedAvatarURL,
  placeholder,
  hasError,
  ...rest
}: {
  placeholder?: string;
  hasError: boolean;
  selectedAvatarURL: string | null;
}) {
  const { toggleAvatarModal } = useAvatarModal();
  return (
    <>
      <div
        className="w-full rounded-xl px-4 transition-all duration-150 bg-black/30 flex justify-between"
        style={{
          border: hasError ? "0.5px solid rgba(255,100,100,0.45)" : "",
        }}
        role="button"
        tabIndex={0}
        onClick={toggleAvatarModal}
        {...rest}
      >
        <div className="w-full text-sm outline-none placeholder:text-white/20 flex items-center">
          {selectedAvatarURL ? (
            <span className="text-blue-500/80">Selected</span>
          ) : (
            <span className="text-white/20 text-sm">{placeholder}</span>
          )}
        </div>
        <div className="w-10 h-10 rounded-lg overflow-hidden">
          {selectedAvatarURL && (
            <Image
              src={selectedAvatarURL}
              alt="selected avatar"
              className="w-full h-full border-none"
              width={20}
              height={20}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default AvatarFiled;
