export interface SerializedError {
  code: string;
  options?: {
    message: string;
    field: string
  }[]
}

abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this.message, CustomError.prototype);
  }

  abstract serializeErrors(): SerializedError;
}

export default CustomError;
