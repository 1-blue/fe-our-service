import { HomeIcon as NormalHomeIcon } from "@heroicons/react/24/outline";
import { HomeIcon as ActiveHomeIcon } from "@heroicons/react/24/solid";

/** 커스텀 라우터 타입 ( 라우팅에 사용 ) */
export interface CustomRoute {
  /** 렌더링될 텍스트 */
  label: string;
  /** 이동될 경로 */
  path: string;
  /** 해당 라우팅의 아이콘들 */
  Icon: {
    /** 기본 아이콘 */
    Normal: typeof NormalHomeIcon;
    /** 경로와 일치할때 보여줄 아이콘 */
    Active: typeof ActiveHomeIcon;
  };
}
