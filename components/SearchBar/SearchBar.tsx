"use client";
import color from "@/lib/color";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import ActionButton from "../Button/ActionButton";
import { contactType } from "../../Types/ContactsType";

type propType = {
  className?: string;
  contextList?: any;
  setList?: any;
  callApi?: (value: string) => void;
  externalSearchBar?: boolean;
};
function SearchBar({
  contextList,
  className,
  setList,
  callApi,
  externalSearchBar = false,
}: propType) {
  const [query, setQuery] = useState<string>("");
  const [onApiCall, setOnApiCall] = useState(false);

  const onTextChange = (name: string): void => {
    setQuery(name);
    if (contextList) {
      let usersObjList = contextList.filter((user: contactType) =>
        user.username.includes(name),
      );
      setList(usersObjList);
    }
  };
  const apiCall = async () => {
    if (callApi && query) {
      setOnApiCall(true);
      callApi(query);
      setOnApiCall(false);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      apiCall();
    }, 500);
  }, [query]);
  return (
    <div
      style={{ backgroundColor: color.searchBarColor }}
      className={`w-full h-10 rounded-lg overflow-hidden flex items-center px-3 gap-2 ${className}`}
    >
      {/* Search hint icon */}
      <Search className="w-5 h-5 text-neutral-400 shrink-0" />

      {/* Input */}
      <input
        value={query}
        type="text"
        className="flex-1 h-full bg-transparent text-white placeholder:text-neutral-400 focus:outline-none text-sm"
        placeholder="Search username..."
        onChange={(e) => onTextChange(e.target.value)}
      />

      {/* Submit button */}
      <div className="flex lg:gap-x-2 gap-x-0.5">
        {!externalSearchBar && (
          <SearchandXButton
            query={query}
            setList={setList}
            apiCall={apiCall}
            contextList={contextList}
            onTextChange={onTextChange}
          />
        )}

        <button
          type="button"
          className="shrink-0 p-1 rounded-md hover:bg-white/10 transition-colors duration-200 cursor-pointer"
        ></button>
        {callApi && (
          <ActionButton label="search" action={apiCall} disabled={onApiCall} />
        )}
      </div>
    </div>
  );
}
export default SearchBar;

function SearchandXButton({
  query,
  onTextChange,
  setList,
  apiCall,
  contextList,
}: {
  query: any;
  onTextChange: any;
  setList: any;
  apiCall: any;
  contextList?: any[];
}) {
  return (
    <>
      {query ? (
        <X
          className="w-6 h-6 text-neutral-400 bg-black/50 p-1 rounded-md"
          onClick={() => {
            onTextChange("");
            setList(contextList || []);
          }}
        />
      ) : (
        <Search className="w-5 h-5 text-green-600" onClick={apiCall} />
      )}
    </>
  );
}
