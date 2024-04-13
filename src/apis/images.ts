import { CustomError } from "#/errors";
import type {
  PatchMoveImageToDBAPIHandler,
  PostCreatePresignedURLAPIHandler,
  PostSaveImageToDBAPIHandler,
  PostUploadPresignedURLByPresignedURLAPIHandler,
} from "#/types/apis";

/** `PresignedURL` 생성 함수 */
export const postCreatePresignedURL: PostCreatePresignedURLAPIHandler = async ({
  body,
}) => {
  return await fetch(
    process.env.NEXT_PUBLIC_SERVER_END_POINT + "/api/v1/images/presigned-url",
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  ).then(async (res) => {
    // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
    const parsedText = await res.text();

    // 성공한 경우
    if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

    // 실패한 경우
    throw new CustomError(JSON.parse(parsedText));
  });
};

/** `PresignedURL`를 이용해서 `AWS-S3`에 이미지 업로드 함수 */
export const postUploadImageByPresignedURL: PostUploadPresignedURLByPresignedURLAPIHandler =
  async ({ fields, imageFile }) => {
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("Content-Type", imageFile.type);
    formData.append("file", imageFile, imageFile.name);

    return await fetch("https://s3.ap-northeast-2.amazonaws.com/no-service", {
      method: "POST",
      body: formData,
    }).then(async (res) => {
      // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
      const parsedText = await res.text();

      // 성공한 경우
      if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

      // 실패한 경우
      throw new CustomError(JSON.parse(parsedText));
    });
  };

/** `S3`에 업로드된 이미지 `DB`에 저장하는 함수 */
export const postSaveImageToDB: PostSaveImageToDBAPIHandler = async ({
  body,
}) => {
  return await fetch(
    process.env.NEXT_PUBLIC_SERVER_END_POINT + "/api/v1/images",
    {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  ).then(async (res) => {
    // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
    const parsedText = await res.text();

    // 성공한 경우
    if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

    // 실패한 경우
    throw new CustomError(JSON.parse(parsedText));
  });
};

/** `DB`에 저장된 이미지 이동 함수 */
export const patchMoveImageToDB: PatchMoveImageToDBAPIHandler = async ({
  params,
  body,
}) => {
  return await fetch(
    process.env.NEXT_PUBLIC_SERVER_END_POINT + `/api/v1/images/${params?.id}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  ).then(async (res) => {
    // json 형태로 응답을 주지 않는 경우 에러 발생을 처리하기 위함
    const parsedText = await res.text();

    // 성공한 경우
    if (res.ok) return parsedText ? JSON.parse(parsedText) : parsedText;

    // 실패한 경우
    throw new CustomError(JSON.parse(parsedText));
  });
};
