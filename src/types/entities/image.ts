/**
 * + 이미지 저장 상태
 *   1. `DEFAULT`: 공용으로 사용할 기본 이미지
 *   2. `TEMP`: 임시 저장 ( 게시글 업로드 시 썸네일 입력 후 생성 취소한 경우 )
 *   3. `USE`: 실제로 사용되는 이미지
 *   4. `DELETED`: 실제로 사용되다가 중지된 이미지 ( 업로드된 게시글을 지운 경우 썸네일 이미지 )
 *   5. `EXTERNAL`: 외부에서 제공받은 이미지인지 확인할 값 ( 내 S3에 업로드된 이미지가 아닌 경우 )
 */
export type ImageStatus = "DEFAULT" | "TEMP" | "USE" | "DELETED";

/**
 * + 이미지 저장 상태
 *   1. `USER_PROFILE`: 유저 프로필 이미지로 사용하는 이미지
 */
export type ImagePurpose = "USER_PROFILE";

/** 이미지 모델 */
export interface ImageEntity {
  /** 이미지 식별자 */
  id: string;
  /** 생성 일자 */
  createdAt: Date;
  /** 수정 일자 */
  updatedAt: Date;
  /** 삭제 일자 */
  deletedAt: Date | null;
  /** 이미지 URL */
  url: string;
  /** 이미지 원본 파일명 */
  name: string;
  /** 이미지 상태 */
  status: ImageStatus;
  /** 이미지 사용 목적*/
  purpose: ImagePurpose;
}
