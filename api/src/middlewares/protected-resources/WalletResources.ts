import { Router } from 'express';
import { CreateWalletController } from '../../controllers/wallets/CreateWalletController';
import { DeleteWalletController } from '../../controllers/wallets/DeleteWalletController';
import { GetWalletController } from '../../controllers/wallets/GetWalletController';
import { ListWalletController } from '../../controllers/wallets/ListWalletController';
import { UpdateWalletController } from '../../controllers/wallets/UpdateWalletController';
import { WalletRepository } from '../../repositories/WalletRepostory';
import { CreateWalletUseCase } from '../../use-cases/wallets/CreateWalletUseCase';
import { DeleteWalletUseCase } from '../../use-cases/wallets/DeleteWalletUseCase';
import { GetWalletUseCase } from '../../use-cases/wallets/GetWalletUseCase';
import { ListWalletUseCase } from '../../use-cases/wallets/ListWalletUseCase';
import { UpdateWalletUseCase } from '../../use-cases/wallets/UpdateWalletUseCase';

const routes = Router();

const createWalletController = new CreateWalletController(
  new CreateWalletUseCase(new WalletRepository())
);
routes.post('/Wallets', createWalletController.handle.bind(createWalletController));

const listWalletController = new ListWalletController(
  new ListWalletUseCase(new WalletRepository())
);
routes.get('/Wallets', listWalletController.handle.bind(listWalletController));

const getWalletController = new GetWalletController(
  new GetWalletUseCase(new WalletRepository())
);
routes.get('/Wallets/:id', getWalletController.handle.bind(getWalletController));

const updateWalletController = new UpdateWalletController(
  new UpdateWalletUseCase(new WalletRepository())
);
routes.put('/Wallets/:id', updateWalletController.handle.bind(updateWalletController));

const deleteWalletController = new DeleteWalletController(
  new DeleteWalletUseCase(new WalletRepository())
);
routes.delete('/Wallets/:id', deleteWalletController.handle.bind(deleteWalletController));

export default routes;
