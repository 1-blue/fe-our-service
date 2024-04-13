import { CustomError } from "#/errors";
import type {
  GetMeAPIHandler,
  PostCheckEmailAPIHandler,
  PostCheckNicknameAPIHandler,
  PostCreateUserAPIHandler,
} from "#/types/apis";

/** 로그인된 유저 정보 가져오기 함수 */
export const getMeAPI: GetMeAPIHandler = async () => {
  return await fetch(
    process.env.NEXT_PUBLIC_SERVER_END_POINT + "/api/v1/users/me",
    {
      method: "GET",
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

/** 이미 존재하는 이메일인지 확인하는 함수 */
export const postCheckEmailAPI: PostCheckEmailAPIHandler = async ({ body }) => {
  return await fetch(
    process.env.NEXT_PUBLIC_SERVER_END_POINT + "/api/v1/users/check/email",
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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

/** 이미 존재하는 닉네임인지 확인하는 함수 */
export const postCheckNicknameAPI: PostCheckNicknameAPIHandler = async ({
  body,
}) => {
  return await fetch(
    process.env.NEXT_PUBLIC_SERVER_END_POINT + "/api/v1/users/check/nickname",
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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

/** 유저 생성 함수 ( 회원가입 ) */
export const postCreateUserAPI: PostCreateUserAPIHandler = async ({ body }) => {
  return await fetch(
    process.env.NEXT_PUBLIC_SERVER_END_POINT + "/api/v1/users",
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
