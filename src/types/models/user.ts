import type { UserEntity, ImageEntity } from "#/types/entities";

/** 비밀번호를 제외한 유저 모델 */
export interface UserWithoutPassword extends Omit<UserEntity, "password"> {}

/** 프로필 이미지가 포함된 유저 모델 */
export interface UserWithImage extends UserWithoutPassword {
  image: ImageEntity;
}
