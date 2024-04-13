/** `Nest`에서 에러를 던질때 전달해주는 형태와 같은 클래스 */
export class CustomError extends Error {
  readonly message: string;
  readonly statusCode: string;
  readonly error: string;

  constructor({
    message,
    statusCode,
    error,
  }: {
    message: string;
    statusCode: string;
    error: string;
  }) {
    super();

    // Error
    this.name = error;

    // CustomError
    this.message = message;
    this.statusCode = statusCode;
    this.error = error;
  }
}
