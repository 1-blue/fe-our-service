import { CustomError } from "#/errors";
import type {
  PostSendTokenByEmailAPIHandler,
  PostAuthenticateTokenByEmailAPIHandler,
} from "#/types/apis";

/** 이메일을 이용한 토큰 전달 함수 */
export const postSendTokenByEmailAPI: PostSendTokenByEmailAPIHandler = async ({
  body,
}) => {
  return fetch(
    process.env.NEXT_PUBLIC_SERVER_END_POINT + "/api/v1/email/send-token",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    },
  ).then(async (res) => {
    // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
    const parsedText = await res.text();

    // 성공한 경우
    if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

    // 실패한 경우
    throw new CustomError(JSON.parse(parsedText));
  });
};

/** 이메일 인증 토큰 유효성 검사 함수 */
export const postAuthenticateByEmailAPI: PostAuthenticateTokenByEmailAPIHandler =
  async ({ body }) => {
    return fetch(
      process.env.NEXT_PUBLIC_SERVER_END_POINT + "/api/v1/email/authenticate",
      {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      },
    ).then(async (res) => {
      // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
      const parsedText = await res.text();

      // 성공한 경우
      if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

      // 실패한 경우
      throw new CustomError(JSON.parse(parsedText));
    });
  };
