/**
 * 뱃지 상태
 *
 * @description
 * 1. `default`: 스낵바 메시지 ( 메인 색상: `#6366f1` )
 * 1. `processing`: 스낵바 종류 ( 파란색: `#3b82f6` )
 * 1. `success`: 스낵바 렌더링 시간 ( 초록색: `#22c55e` )
 * 1. `warning`: 스낵바에서 실행할 행위 ( 노란색: `#eab308` )
 * 1. `error`: 스낵바에서 실행할 행위 ( 빨간색: `#ef4444` )
 */
export type BadgeStatus =
  | "default"
  | "processing"
  | "success"
  | "warning"
  | "error";
