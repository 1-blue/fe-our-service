/**
 * + 유저 역할
 *   1. `ADMIN`: 관리자
 *   1. `MANAGER`: 일부 권한을 부여받은 유저
 *   1. `USER`: 일반 유저
 *   1. `GUEST`: 로그인하지 않고 체험으로 사용하는 유저 ( 1일 )
 */
export type UserRole = "ADMIN" | "MANAGER" | "USER" | "GUEST";

/**
 * + 유저 역할
 *   1. `LOCAL`: 일반 로그인 ( 이메일 + 비밀번호 )
 *   1. `KAKAO`: 카카오 로그인
 *   1. `GOOGLE`: 구글 로그인
 */
export type UserProvider = "LOCAL" | "KAKAO" | "GOOGLE";

/** 유저 모델 */
export interface UserEntity {
  /** 유저 식별자 */
  id: string;
  /** 생성 일자 */
  createdAt: Date;
  /** 수정 일자 */
  updatedAt: Date;
  /** 삭제 일자 */
  deletedAt: Date | null;
  /** 유저 이메일 */
  email: string;
  /** 유저 비밀번호 */
  password: string;
  /** 유저 닉네임 */
  nickname: string;
  /** 유저 휴대폰 번호 */
  phone: string | null;
  /** 유저 보유 금액 */
  money: number;
  /** 유저 역할 */
  role: UserRole;
  /** 유저 로그인 방식 */
  provider: UserProvider;
  /** 유저 로그인 방식 식별자 ( `OAuth`인 경우 제공받는값 ) */
  providerId: string | null;
  /** [1:N] 이미지 식별자 */
  imageId: string | null;
}
