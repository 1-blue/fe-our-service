import type { APIRuquestType } from ".";
import type { ImageEntity, ImageStatus } from "#/types/entities";

/** `presignedURL` 생성 요청 타입 */
export interface PostCreatePresignedURLAPIRequest
  extends APIRuquestType<{}, {}, { filename: string; status?: ImageStatus }> {}
/**
 * `presignedURL` 생성 응답 타입
 * `@aws-sdk/s3-presigned-post`의 `createPresignedPost()`에 대한 응답값
 */
export interface PostCreatePresignedURLAPIResponse {
  url: string;
  fields: {
    bucket: string;
    "X-Amz-Algorithm": string;
    "X-Amz-Credential": string;
    "X-Amz-Date": string;
    key: string;
    Policy: string;
    "X-Amz-Signature": string;
  };
}
/** `presignedURL` 생성 요청 & 응답 핸들러 타입 */
export type PostCreatePresignedURLAPIHandler = (
  args: PostCreatePresignedURLAPIRequest
) => Promise<PostCreatePresignedURLAPIResponse>;

/** `PresignedURL`를 이용해서 `AWS-S3`에 이미지 업로드 요청 타입 */
export interface PostUploadPresignedURLByPresignedURLAPIRequest
  extends Pick<PostCreatePresignedURLAPIResponse, "fields"> {
  imageFile: File;
}
/** `PresignedURL`를 이용해서 `AWS-S3`에 이미지 업로드 응답 타입 */
export interface PostUploadPresignedURLByPresignedURLAPIResponse {}
/** `PresignedURL`를 이용해서 `AWS-S3`에 이미지 업로드 요청 & 응답 핸들러 타입 */
export type PostUploadPresignedURLByPresignedURLAPIHandler = (
  args: PostUploadPresignedURLByPresignedURLAPIRequest
) => Promise<PostUploadPresignedURLByPresignedURLAPIResponse>;

/** `S3`에 업로드된 이미지 `DB` 저장 요청 타입 */
export interface PostSaveImageToDBAPIRequest
  extends APIRuquestType<
    {},
    {},
    Pick<ImageEntity, "url" | "name"> &
      Partial<Pick<ImageEntity, "id" | "status" | "purpose">>
  > {}
/** `S3`에 업로드된 이미지 `DB` 저장 응답 타입 */
export interface PostSaveImageToDBAPIResponse extends ImageEntity {}
/** `S3`에 업로드된 이미지 `DB` 저장 요청 & 응답 핸들러 타입 */
export type PostSaveImageToDBAPIHandler = (
  args: PostSaveImageToDBAPIRequest
) => Promise<PostSaveImageToDBAPIResponse>;

/** `DB`에 저장된 이미지 위치 이동 요청 타입 */
export interface PatchMoveImageToDBAPIRequest
  extends APIRuquestType<
    Pick<ImageEntity, "id">,
    {},
    { beforeStatus: ImageStatus; afterStatus: ImageStatus }
  > {}
/** `DB`에 저장된 이미지 위치 이동 응답 타입 */
export interface PatchMoveImageToDBAPIResponse extends ImageEntity {}
/** `DB`에 저장된 이미지 위치 이동 요청 & 응답 핸들러 타입 */
export type PatchMoveImageToDBAPIHandler = (
  args: PatchMoveImageToDBAPIRequest
) => Promise<PatchMoveImageToDBAPIResponse>;
