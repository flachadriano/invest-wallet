/* eslint-disable no-console */
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import AppDataSource from './src/middlewares/DataSource';
import PublicRoutes from './src/middlewares/PublicRoutes';
import AssetResources from './src/middlewares/protected-resources/AssetResources';
import BrokerResources from './src/middlewares/protected-resources/BrokerResources';
import TransactionResources from './src/middlewares/protected-resources/TransactionResources';
import WalletResources from './src/middlewares/protected-resources/WalletResources';
import { ensureAuthenticated } from './src/middlewares/EnsureAuthenticated';
import { authenticateRequest } from './src/middlewares/AuthenticatedRequest';
import { treatErrorResponse } from './src/middlewares/TreatErrorResponse';

console.log('Connecting to the database...');
AppDataSource.initialize().then(() => {
  console.log('Connected to the database');

  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(PublicRoutes);

  app.use(ensureAuthenticated);
  app.use(authenticateRequest);
  app.use(AssetResources);
  app.use(BrokerResources);
  app.use(TransactionResources);
  app.use(WalletResources);

  app.use(treatErrorResponse);

  app.listen(process.env.APP_PORT, () => console.log(`Server is running on port ${process.env.APP_PORT}`));
}).catch(e => console.log('Failed to connect to the database:', e));
