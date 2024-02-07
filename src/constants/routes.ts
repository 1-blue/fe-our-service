import { CustomRoute } from "#/types";
import {
  HomeIcon as NormalHomeIcon,
  BookOpenIcon as NormalBookOpenIcon,
  LockOpenIcon as NormalLockOpenIcon,
  UserIcon as NormalUserIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as ActiveHomeIcon,
  BookOpenIcon as ActiveBookOpenIcon,
  LockOpenIcon as ActiceLockOpenIcon,
  UserIcon as ActiveUserIcon,
} from "@heroicons/react/24/solid";

/** 라우팅 관련 값 */
export const routes: CustomRoute[] = [
  {
    label: "메인",
    path: "/",
    Icon: { Normal: NormalHomeIcon, Active: ActiveHomeIcon },
  },
  {
    label: "상식",
    path: "/sense",
    Icon: { Normal: NormalBookOpenIcon, Active: ActiveBookOpenIcon },
  },
  {
    label: "로그인",
    path: "/signin",
    Icon: { Normal: NormalLockOpenIcon, Active: ActiceLockOpenIcon },
  },
  {
    label: "내 정보",
    path: "/information",
    Icon: { Normal: NormalUserIcon, Active: ActiveUserIcon },
  },
];
