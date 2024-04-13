import { CustomError } from "#/errors";
import type { PostLogInAPIHandler, PostLogOutAPIHandler } from "#/types/apis";

/** 로그인 함수 */
export const postLogInAPI: PostLogInAPIHandler = async ({ body }) => {
  return fetch(
    process.env.NEXT_PUBLIC_SERVER_END_POINT + "/api/v1/auth/login",
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

/** 로그아웃 함수 */
export const postLogOutAPI: PostLogOutAPIHandler = async () => {
  return fetch(
    process.env.NEXT_PUBLIC_SERVER_END_POINT + "/api/v1/auth/logout",
    {
      method: "POST",
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
