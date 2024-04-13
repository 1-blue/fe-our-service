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
    <header className="flex flex-col border-b-2 border-contour bg-depth-2 px-12 py-8">
      <section className="flex justify-between">
        <form
          className={twJoin(
            "group flex items-center rounded-lg border border-line-default p-2 transition-colors hover:border-main-500",
            isFocus && "border-main-600",
          )}
        >
          <button type="submit" className="pl-2 pr-1.5">
            <MagnifyingGlassIcon
              className={twJoin(
                "h-5 w-5 text-text-default transition-colors group-hover:text-main-500",
                isFocus && "text-main-600",
              )}
            />
          </button>
          <input
            ref={searchRef}
            type="search"
            placeholder="검색"
            className="h-6 border-none bg-transparent placeholder:text-sm focus:outline-none"
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
        </form>
        <div className="flex items-center space-x-5">
          <button type="button">
            <BellIcon
              role="button"
              className="h-6 w-6 text-text-default transition-colors hover:text-main-600"
            />
          </button>
          <Link href={me ? "/me" : "/login"}>
            {me ? (
              <UserIcon
                role="link"
                className="h-6 w-6 text-text-default transition-colors hover:text-main-600"
              />
            ) : (
              <LockOpenIcon
                role="link"
                className="h-6 w-6 text-text-default transition-colors hover:text-main-600"
              />
            )}
          </Link>
        </div>
      </section>
    </header>
  );
};

export default Header;
