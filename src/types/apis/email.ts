import { APIRuquestType } from ".";

/** 이메일을 통해 토큰 전달 요청 타입 */
export interface PostSendTokenByEmailAPIRequest
  extends APIRuquestType<{}, {}, { email: string }> {}
/** 이메일을 통해 토큰 전달 응답 타입 */
export interface PostSendTokenByEmailAPIResponse {}
/** 이메일을 통해 토큰 전달 요청 & 응답 핸들러 타입 */
export type PostSendTokenByEmailAPIHandler = (
  args: PostSendTokenByEmailAPIRequest
) => Promise<PostSendTokenByEmailAPIResponse>;

/** 이메일 인증 토큰 유효성 검사 요청 타입 */
export interface PostAuthenticateTokenByEmailAPIRequest
  extends APIRuquestType<{}, {}, { email: string; token: string }> {}
/** 이메일 인증 토큰 유효성 검사 응답 타입 */
export interface PostAuthenticateTokenByEmailAPIResponse {}
/** 이메일 인증 토큰 유효성 검사 요청 & 응답 핸들러 타입 */
export type PostAuthenticateTokenByEmailAPIHandler = (
  args: PostAuthenticateTokenByEmailAPIRequest
) => Promise<PostAuthenticateTokenByEmailAPIResponse>;
