/* eslint-disable no-console */
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import AppDataSource from './src/middlewares/DataSource';
import routes from './src/Routes';
import { Conflict } from './src/use-cases/errors/Conflict';
import { UnprocessableEntity } from './src/use-cases/errors/UnprocessableEntity';

console.log('Connecting to the database...');
AppDataSource.initialize().then(() => {
  console.log('Connected to the database');

  const app = express();
  app.use(express.json());
  app.use(routes);

  // it is necessary to add the last parameter 'next' to intercept exceptions
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof UnprocessableEntity) {
      return res.status(422).json({ message: error.message });
    }
    if (error instanceof Conflict) {
      return res.status(409).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  });

  app.listen(process.env.APP_PORT, () => console.log(`Server is running on port ${process.env.APP_PORT}`));
}).catch(e => console.log('Failed to connect to the database:', e));
