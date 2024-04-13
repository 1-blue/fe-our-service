"use client";

import { useRef, useState } from "react";
import {
  MagnifyingGlassIcon,
  BellIcon,
  UserIcon,
  LockOpenIcon,
} from "@heroicons/react/24/outline";
import { twJoin } from "tailwind-merge";
import Link from "next/link";

import useMe from "#/hooks/queries";

const Header: React.FC = () => {
  const { me } = useMe();
  const searchRef = useRef<HTMLInputElement>(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <header className="px-12 py-8 flex flex-col bg-depth-2 border-b-2 border-contour">
      <section className="flex justify-between">
        <form
          className={twJoin(
            "group flex items-center p-2 border border-line-default hover:border-main-500 rounded-lg transition-colors",
            isFocus && "border-main-600"
          )}
        >
          <button type="submit" className="pl-2 pr-1.5">
            <MagnifyingGlassIcon
              className={twJoin(
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
        <div className="flex items-center space-x-5">
          <button type="button">
            <BellIcon
              role="button"
              className="w-6 h-6 text-text-default hover:text-main-600 transition-colors"
            />
          </button>
          <Link href={me ? "/me" : "/login"}>
            {me ? (
              <UserIcon
                role="link"
                className="w-6 h-6 text-text-default hover:text-main-600 transition-colors"
              />
            ) : (
              <LockOpenIcon
                role="link"
                className="w-6 h-6 text-text-default hover:text-main-600 transition-colors"
              />
            )}
          </Link>
        </div>
      </section>
    </header>
  );
};

export default Header;
