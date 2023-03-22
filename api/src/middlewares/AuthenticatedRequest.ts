import { NextFunction, Request, Response } from 'express';
import { User } from '../entities/User';
import { DecodeTokenPayloadProvider } from '../providers/DecodeTokenPayloadProvider';
import AppDataSource from './DataSource';

export async function authenticateRequest(request: Request, res: Response, next: NextFunction) {
  const token = request.headers.authorization.split(' ')[1];
  const payload = new DecodeTokenPayloadProvider().execute(token);

  const repository = AppDataSource.getRepository(User);
  const user = await repository.findOneBy({ id: payload.id });
  request.currentUser = user;

  next();
}
