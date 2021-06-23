import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public code: string, message?: string) {
    super(`${code}:${message}`);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return {
      code: this.code
    }
  }
}
