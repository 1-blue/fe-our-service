export * from "./auth";
export * from "./users";
export * from "./email";
export * from "./images";

/**
 * API 요청 타입 형식
 * `Params`, `Queries`, `Body` 순서
 **/
export interface APIRuquestType<Params = {}, Queries = {}, Body = {}> {
  params?: Params;
  queries?: Queries;
  body?: Body;
}
