import { Request, Response, NextFunction } from 'express';
import AuthorizationError from '../errors/authorization-error';

const { AUTH_TOKEN } = process.env;

const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { authorization } = req.headers;

  if (authorization !== AUTH_TOKEN) {
    throw new AuthorizationError();
  }

  next();
};

export default requireAuth;
