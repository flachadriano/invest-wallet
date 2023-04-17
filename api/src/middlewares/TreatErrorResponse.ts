import { NextFunction, Request, Response } from 'express';
import { Conflict } from '../use-cases/errors/Conflict';
import { Forbidden } from '../use-cases/errors/Forbidden';
import { NotFound } from '../use-cases/errors/NotFound';
import { UnprocessableEntity } from '../use-cases/errors/UnprocessableEntity';
import { Unauthorized } from '../use-cases/errors/Unauthorized';

export function treatErrorResponse(error: Error, req: Request, res: Response, next: NextFunction) {
  // eslint-disable-next-line no-console
  console.log(error);

  if (error instanceof UnprocessableEntity) {
    res.status(422).json({ message: error.message });
  } else if (error instanceof Conflict) {
    res.status(409).json({ message: error.message });
  } else if (error instanceof Forbidden) {
    res.status(403).json({ message: error.message });
  } else if (error instanceof NotFound) {
    res.status(404).json({ message: error.message });
  } else if (error instanceof Unauthorized) {
    res.status(401).json({ message: error.message });
  } else {
    res.status(500).json({ message: error.message });
  }
  next();
}
