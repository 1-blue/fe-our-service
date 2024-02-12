"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twJoin } from "tailwind-merge";
import { motion } from "framer-motion";
import { AcademicCapIcon } from "@heroicons/react/24/solid";

import { routes } from "#/constants/routes";

/** 공용 레이아웃 네비게이션 컴포넌트 */
const Nav: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="w-[300px] flex flex-col bg-depth-2 border-r-2 border-b-2 border-contour">
      <Link href="/" className="flex space-x-2 px-12 py-6">
        {/* FIXME: 로고 추가하기 */}
        <AcademicCapIcon className="h-6 w-6 text-white" />
        <span>세상에 없는 서비스</span>
      </Link>
      {routes.map(({ label, path, Icon }) => (
        <Link
          key={path}
          href={path}
          className="px-12 py-4 flex items-center space-x-2"
        >
          {pathname === path ? (
            <Icon.Active className="w-6 h-6 text-main-400" />
          ) : (
            <Icon.Normal className="w-6 h-6" />
          )}
          <span
            className={twJoin(pathname === path && "text-main-400 font-bold")}
          >
            {label}
          </span>
          {pathname === path && (
            <motion.div
              layoutId="route-ball"
              className="!ml-auto w-2 h-2 rounded-full bg-main-400"
            />
          )}
        </Link>
      ))}
    </nav>
  );
};

export default Nav;
