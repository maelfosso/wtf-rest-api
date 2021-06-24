import CustomError, { SerializedError } from './custom-error';

class BadRequestError extends CustomError {
  statusCode = 400;

  constructor(public code: string, message?: string) {
    super(`${code}:${message || ''}`);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors(): SerializedError {
    return {
      code: this.code,
    };
  }
}

export default BadRequestError;
