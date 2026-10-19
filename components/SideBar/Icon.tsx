import Link from "next/link";
import React from "react";

type propType = {
  label: string;
  to?: string;
  children: React.ReactNode;
  actionMethod?: () => void;
};

function Icon({ label, to = "/", actionMethod, children }: propType) {
  return (
    <Link href={to} onClick={actionMethod}>
      <div className="w-full hover:bg-black duration-150 cursor-pointer p-1 flex flex-col justify-center items-center rounded-lg lg:p-3">
        {children}
        <div>
          <p className="text-xs text-center mt-2">{label}</p>
        </div>
      </div>
    </Link>
  );
}

export default Icon;
