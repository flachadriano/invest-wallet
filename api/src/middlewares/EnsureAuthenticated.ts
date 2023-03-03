import { NextFunction, Request, Response } from 'express';
import { EnsureAuthenticateUserUseCase } from '../use-cases/users/EnsureAuthenticatedUserUseCase';

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authToken = req.headers.authorization;
  if (new EnsureAuthenticateUserUseCase().execute({ token: authToken })) {
    next();
  }
}
