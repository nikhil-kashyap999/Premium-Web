import { SendType } from "@/context/MessageBubbleContext";

function SelectBox({ setType, type }: { setType: any; type: SendType }) {
  const changeSendType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setType(e.target.value as SendType);
  };
  return (
    <select
      className="
      rounded-md
      border
      border-neutral-600
      bg-neutral-900
      px-3 py-2
      text-white
      max-w-3
      lg:max-w-max
      lg:w-auto
    "
      value={type}
      onChange={changeSendType}
    >
      {Object.values(SendType).map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
}

export default SelectBox;
