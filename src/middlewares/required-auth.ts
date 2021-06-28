import { Request, Response, NextFunction } from 'express';
import AuthorizationError from '../errors/authorization-error';

const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const AUTH_TOKEN = process.env.AUTH_TOKEN;
  const { authorization } = req.headers;

  if (!authorization || authorization !== AUTH_TOKEN) {
    throw new AuthorizationError();
  }

  next();
};

export default requireAuth;
