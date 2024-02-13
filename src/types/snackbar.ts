/**
 * 스낵바 기본 타입
 * + `message`: 스낵바 메시지
 * + `type`: 스낵바 종류
 * + `timer`: 스낵바 렌더링 시간
 * + `action`: 스낵바에서 실행할 행위
 */
export interface Snackbar {
  /** 스낵바 아이디 */
  id?: string;
  /** 스낵바 메시지 */
  message: string;
  /** 스낵바 렌더링 시간 */
  timer?: number;
  /** 스낵바 액션 관련 데이터 */
  action: {
    /** 스낵바 액션 이름 */
    name: string;
    /** 스낵바 액션 함수 */
    func: () => void;
  };
}
