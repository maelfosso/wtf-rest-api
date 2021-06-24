import { ValidationError } from 'express-validator';
import CustomError, { SerializedError } from './custom-error';

class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): SerializedError {
    return {
      code: 'VALIDATION_ERROR',
      options: this.errors.map((err) => ({
        message: err.msg as string,
        field: err.param,
      })),
    };
  }
}

export default RequestValidationError;
