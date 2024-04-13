import type { APIRuquestType } from ".";
import type { UserEntity } from "#/types/entities";
import type { UserWithImage } from "#/types/models";

/** 로그인된 유저 정보 요청 타입 */
export interface GetMeAPIRequest extends APIRuquestType {}
/** 로그인된 유저 정보 응답 타입 */
export interface GetMeAPIResponse extends UserWithImage {}
/** 로그인된 유저 정보 요청 & 응답 핸들러 타입 */
export type GetMeAPIHandler = (
  args: GetMeAPIRequest,
) => Promise<GetMeAPIResponse>;

/** 이미 존재하는 이메일인지 확인하는 요청 타입 */
export interface PostCheckEmailAPIRequest
  extends APIRuquestType<{}, {}, { email: string }> {}
/** 이미 존재하는 이메일인지 확인하는 응답 타입 */
export interface PostCheckEmailAPIResponse extends UserWithImage {}
/** 이미 존재하는 이메일인지 확인하는 요청 & 응답 핸들러 타입 */
export type PostCheckEmailAPIHandler = (
  args: PostCheckEmailAPIRequest,
) => Promise<PostCheckEmailAPIResponse>;

/** 이미 존재하는 닉네임인지 확인하는 요청 타입 */
export interface PostCheckNicknameAPIRequest
  extends APIRuquestType<{}, {}, { nickname: string }> {}
/** 이미 존재하는 닉네임인지 확인하는 응답 타입 */
export interface PostCheckNicknameAPIResponse extends UserWithImage {}
/** 이미 존재하는 닉네임인지 확인하는 요청 & 응답 핸들러 타입 */
export type PostCheckNicknameAPIHandler = (
  args: PostCheckNicknameAPIRequest,
) => Promise<PostCheckNicknameAPIResponse>;

/** ( 회원가입 ) 유저 생성 요청 타입 */
export interface PostCreateUserAPIRequest
  extends APIRuquestType<
    {},
    {},
    Pick<UserEntity, "email" | "password" | "nickname"> &
      Partial<Pick<UserEntity, "id" | "phone" | "money" | "role" | "imageId">>
  > {}
/** ( 회원가입 ) 유저 생성 응답 타입 */
export interface PostCreateUserAPIResponse extends UserWithImage {}
/** ( 회원가입 ) 유저 생성 요청 & 응답 핸들러 타입 */
export type PostCreateUserAPIHandler = (
  args: PostCreateUserAPIRequest,
) => Promise<PostCreateUserAPIResponse>;
