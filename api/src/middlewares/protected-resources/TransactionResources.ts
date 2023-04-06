import { Router } from 'express';
import { AssetRepository } from '../../repositories/AssetRepository';
import { CreateTransactionController } from '../../controllers/transactions/CreateTransactionController';
import { CreateTransactionUseCase } from '../../use-cases/transactions/CreateTransactionUseCase';
import { TransactionRepository } from '../../repositories/TransactionRepository';
import { WalletRepository } from '../../repositories/WalletRepostory';
import { BrokerRepository } from '../../repositories/BrokerRepository';

const routes = Router();

const createController = new CreateTransactionController(
  new CreateTransactionUseCase(
    new TransactionRepository(),
    new WalletRepository(),
    new BrokerRepository(),
    new AssetRepository()
  )
);
routes.post('/transactions', createController.handle.bind(createController));

export default routes;
