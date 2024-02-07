"use client";

import { useRef, useState } from "react";
import {
  MagnifyingGlassIcon,
  BellIcon,
  UserIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";
import { twMerge } from "tailwind-merge";

const Header: React.FC = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <header className="px-12 py-8 flex flex-col bg-bg-depth-2 border-b-2 border-contour">
      <section className="flex justify-between">
        <form
          className={twMerge(
            "group flex items-center p-2 border border-line-default hover:border-main-500 rounded-lg transition-colors",
            isFocus && "border-main-600"
          )}
        >
          <button type="submit" className="pl-2 pr-1.5">
            <MagnifyingGlassIcon
              className={twMerge(
                "w-5 h-5 text-text-default group-hover:text-main-500 transition-colors",
                isFocus && "text-main-600"
              )}
            />
          </button>
          <input
            ref={searchRef}
            type="search"
            placeholder="검색"
            className="h-6 border-none bg-transparent focus:outline-none placeholder:text-sm"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        </form>
        <div className="flex space-x-5">
          <UserIcon
            role="button"
            className="w-6 h-6 text-text-default hover:text-main-600 transition-colors"
          />
          <BellIcon
            role="button"
            className="w-6 h-6 text-text-default hover:text-main-600 transition-colors"
          />
          <Cog6ToothIcon
            role="button"
            className="w-6 h-6 text-text-default hover:text-main-600 transition-colors"
          />
        </div>
      </section>
    </header>
  );
};

export default Header;
