import { Router } from 'express';
import { AssetRepository } from '../../repositories/AssetRepository';
import { CreateTransactionController } from '../../controllers/transactions/CreateTransactionController';
import { CreateTransactionUseCase } from '../../use-cases/transactions/CreateTransactionUseCase';
import { TransactionRepository } from '../../repositories/TransactionRepository';
import { WalletRepository } from '../../repositories/WalletRepostory';
import { BrokerRepository } from '../../repositories/BrokerRepository';
import { ListTransactionController } from '../../controllers/transactions/ListTransactionController';
import { ListTransactionUseCase } from '../../use-cases/transactions/ListTransactionUseCase';
import { GetWalletUseCase } from '../../use-cases/wallets/GetWalletUseCase';

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

const listController = new ListTransactionController(
  new ListTransactionUseCase(new TransactionRepository()),
  new GetWalletUseCase(new WalletRepository())
);
routes.get('/wallets/:walletId/transactions', listController.handle.bind(listController));

export default routes;
