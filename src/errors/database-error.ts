import CustomError, { SerializedError } from './custom-error';

class DatabaseError extends CustomError {
  statusCode = 500;

  constructor(public code: string, message?: string) {
    super(`${code}:${message || ''}`);

    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors(): SerializedError {
    return {
      code: this.code,
    };
  }
}

export default DatabaseError;
