import { CustomError } from "./custom-error";

export class DatabaseError extends CustomError {
  statusCode = 500;

  constructor(public code: string, message?: string) {
    super(`${code}:${message}`);

    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
    return {
      code: this.code
    }
  }
}
