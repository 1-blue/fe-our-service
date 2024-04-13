"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";
import { motion } from "framer-motion";
import { AcademicCapIcon } from "@heroicons/react/24/solid";

import { routes } from "#/constants/routes";
import useMe from "#/hooks/queries/useMe";
import { useMemo } from "react";

interface Props {
  /**
   * `tailwindcss`에 사용할 `calssName`
   * @default ""
   */
  className?: string;
}

/** 공용 레이아웃 네비게이션 컴포넌트 */
const PCNav: React.FC<Props> = ({ className }) => {
  const pathname = usePathname();
  const { me } = useMe();

  /** 로그인 여부에 따라서 네비게이션에 사용할 라우팅 필터링 */
  const filteredRoutes = useMemo(
    () =>
      routes.filter(({ type }) => {
        if (type === "ALL") return true;
        if (me && type === "LOGGED_IN") return true;
        if (!me && type === "LOGGED_OUT") return true;
      }),
    [me],
  );

  return (
    <nav
      className={twJoin(
        "flex w-[260px] flex-col border-b-2 border-r-2 border-contour bg-depth-2",
        className,
      )}
    >
      <Link href="/" className="flex space-x-2 px-12 py-6">
        {/* FIXME: 로고 추가하기 */}
        <AcademicCapIcon className="h-6 w-6 text-white" />
        <span>세상에 없는 서비스</span>
      </Link>
      {filteredRoutes.map(({ label, path, Icon }) => (
        <Link
          key={path}
          href={path}
          className="flex items-center space-x-2 px-12 py-4"
        >
          {pathname === path ? (
            <Icon.Active className="h-6 w-6 text-main-400" />
          ) : (
            <Icon.Normal className="h-6 w-6" />
          )}
          <span
            className={twJoin(pathname === path && "font-bold text-main-400")}
          >
            {label}
          </span>
          {pathname === path && (
            <motion.div
              layoutId="route-ball-to-pc"
              className="!ml-auto h-2 w-2 rounded-full bg-main-400"
            />
          )}
        </Link>
      ))}
    </nav>
  );
};

export default PCNav;
