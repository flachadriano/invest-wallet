/* eslint-disable no-console */
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import AppDataSource from './src/middlewares/DataSource';
import routes from './src/Routes';
import { Conflict } from './src/use-cases/errors/Conflict';
import { UnprocessableEntity } from './src/use-cases/errors/UnprocessableEntity';
import { Forbidden } from './src/use-cases/errors/Forbidden';

console.log('Connecting to the database...');
AppDataSource.initialize().then(() => {
  console.log('Connected to the database');

  const app = express();
  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
  });

  app.use(routes);

  // it is necessary to add the last parameter 'next' to intercept exceptions
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(error);
    if (error instanceof UnprocessableEntity) {
      res.status(422).json({ message: error.message });
    } else if (error instanceof Conflict) {
      res.status(409).json({ message: error.message });
    } else if (error instanceof Forbidden) {
      res.status(403).json({ message: error.message });
    } else {
      res.status(500).json({ message: error.message });
    }
    next();
  });

  app.listen(process.env.APP_PORT, () => console.log(`Server is running on port ${process.env.APP_PORT}`));
}).catch(e => console.log('Failed to connect to the database:', e));
