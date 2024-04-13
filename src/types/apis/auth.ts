import type { APIRuquestType } from ".";
import type { UserEntity } from "#/types/entities";

/** 로그인 요청 타입 */
export interface PostLogInAPIRequest
  extends APIRuquestType<{}, {}, Pick<UserEntity, "email" | "password">> {}
/** 로그인 응답 타입 */
export interface PostLogInAPIResponse extends Omit<UserEntity, "password"> {}
/** 로그인 요청 & 응답 핸들러 타입 */
export type PostLogInAPIHandler = (
  args: PostLogInAPIRequest
) => Promise<PostLogInAPIResponse>;

/** 로그아웃 요청 타입 */
export interface PostLogOutAPIRequest extends APIRuquestType {}
/** 로그아웃 응답 타입 */
export interface PostLogOutAPIResponse {}
/** 로그아웃 요청 & 응답 핸들러 타입 */
export type PostLogOutAPIHandler = (
  args: PostLogInAPIRequest
) => Promise<PostLogInAPIResponse>;
