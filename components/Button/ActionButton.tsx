type ActionButtonProp = {
  label: string;
  disabled?: boolean;
  action?: () => void;
  className?: string;
};
function ActionButton({
  label,
  action,
  disabled = false,
  className,
}: ActionButtonProp) {
  return (
    <>
      <button
        type="button"
        className={`shrink-0 py-2 rounded-md hover:bg-white/10 transition-colors duration-200 cursor-pointer bg-black/20 lg:px-4 px-3 flex justify-center items-center ${className} ${disabled && "text-neutral-600 cursor-progress"}`}
        onClick={action}
        disabled={disabled}
      >
        <span className="text-xs font-semibold">{label}</span>
      </button>
    </>
  );
}

export default ActionButton;
