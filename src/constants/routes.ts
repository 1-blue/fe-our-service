import { CustomRoute } from "#/types";
import {
  HomeIcon as NormalHomeIcon,
  BookOpenIcon as NormalBookOpenIcon,
  CubeIcon as NormalCubeIcon,
  CodeBracketSquareIcon as NormalCodeBracketSquareIcon,
  LockOpenIcon as NormalLockOpenIcon,
  UserIcon as NormalUserIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as ActiveHomeIcon,
  BookOpenIcon as ActiveBookOpenIcon,
  CubeIcon as ActiveNormalCubeIcon,
  CodeBracketSquareIcon as ActiveNormalCodeBracketSquareIcon,
  LockOpenIcon as ActiceLockOpenIcon,
  UserIcon as ActiveUserIcon,
} from "@heroicons/react/24/solid";

/** 라우팅 관련 값 */
export const routes: CustomRoute[] = [
  {
    label: "메인",
    path: "/",
    Icon: { Normal: NormalHomeIcon, Active: ActiveHomeIcon },
    type: "ALL",
  },
  {
    label: "정보",
    path: "/info",
    Icon: { Normal: NormalBookOpenIcon, Active: ActiveBookOpenIcon },
    type: "ALL",
  },
  {
    label: "상식",
    path: "/sense",
    Icon: { Normal: NormalCubeIcon, Active: ActiveNormalCubeIcon },
    type: "ALL",
  },
  {
    label: "실험적",
    path: "/canary",
    Icon: {
      Normal: NormalCodeBracketSquareIcon,
      Active: ActiveNormalCodeBracketSquareIcon,
    },
    type: "ALL",
  },
  {
    label: "로그인",
    path: "/login",
    Icon: { Normal: NormalLockOpenIcon, Active: ActiceLockOpenIcon },
    type: "LOGGED_OUT",
  },
  {
    label: "내 정보",
    path: "/me",
    Icon: { Normal: NormalUserIcon, Active: ActiveUserIcon },
    type: "LOGGED_IN",
  },
];
