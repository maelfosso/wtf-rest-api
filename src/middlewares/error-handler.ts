import { NextFunction, Request, Response } from 'express';
import CustomError from '../errors/custom-error';

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
): Response => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ ...err.serializeErrors() });
  }

  return res.status(400).send({
    code: 'SOMETHING_WENT_WRONG',
    options: [{ message: err.message || 'Something went wrong' }],
  });
};

export default errorHandler;
