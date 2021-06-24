import CustomError, { SerializedError } from './custom-error';

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["serializeErrors"] }] */
class AuthorizationError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Authentication Error! Need to provide authentication token !');

    Object.setPrototypeOf(this, AuthorizationError.prototype);
  }

  serializeErrors(): SerializedError {
    return {
      code: 'NOT_AUTHORIZED',
    };
  }
}

export default AuthorizationError;
