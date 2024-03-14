"use client";

import { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";
import { motion } from "framer-motion";

import { routes } from "#/constants/routes";

interface Props {
  /**
   * `tailwindcss`에 사용할 `calssName`
   * @default ""
   */
  className?: string;
}

const MobileNav: React.FC<Props> = ({ className = "" }) => {
  const pathname = usePathname();
  // TODO:
  const me = true;

  /** 로그인 여부에 따라서 네비게이션에 사용할 라우팅 필터링 */
  const filteredRoutes = useMemo(
    () =>
      routes.filter(({ type }) => {
        if (type === "ALL") return true;
        if (me && type === "LOGGED_IN") return true;
        if (!me && type === "LOGGED_OUT") return true;
      }),
    [me]
  );

  return (
    <nav
      className={twJoin(
        "fixed bottom-0 inset-x-0 flex bg-depth-2 border-t border-line-dark",
        className
      )}
    >
      {filteredRoutes.map(({ label, path, Icon }) => (
        <Link
          key={path}
          href={path}
          className="flex flex-col justify-center items-center flex-1 pt-5 pb-2"
        >
          {pathname === path && (
            <motion.div
              layoutId="route-ball-to-mobile"
              className="absolute top-2 w-2 h-2 rounded-full bg-main-400"
            />
          )}
          {pathname === path ? (
            <Icon.Active className="z-10 w-6 h-6 text-main-400" />
          ) : (
            <Icon.Normal className="z-10 w-6 h-6" />
          )}
          <span
            className={twJoin(
              "z-10",
              pathname === path && "text-main-400 font-bold"
            )}
          >
            {label}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default MobileNav;
