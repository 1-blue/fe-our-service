/**
 * 토스트의 종류
 * + `info`: 정보
 * + `success`: 성공
 * + `warning`: 경고
 * + `error`: 에러
 */
export type ToastType = "info" | "success" | "warning" | "error";

/**
 * 토스트 기본 타입
 * + `message`: 토스트 메시지
 * + `type`: 토스트 종류
 * + `timer`: 토스트 렌더링 시간
 */
export interface Toast {
  /** 토스트 아이디 */
  id?: string;
  /** 토스트 메시지 */
  message: string;
  /** 토스트 종류 */
  type?: ToastType;
  /** 토스트 렌더링 시간 */
  timer?: number;
}
