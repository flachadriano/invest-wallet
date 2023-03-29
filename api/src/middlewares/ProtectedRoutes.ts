import { Router } from 'express';
import { CreateAssetController } from '../controllers/assets/CreateAssetController';
import { DeleteAssetController } from '../controllers/assets/DeleteAssetController';
import { GetAssetController } from '../controllers/assets/GetAssetController';
import { ListAssetController } from '../controllers/assets/ListAssetController';
import { UpdateAssetController } from '../controllers/assets/UpdateAssetController';
import { CreateBrokerController } from '../controllers/brokers/CreateBrokerController';
import { DeleteBrokerController } from '../controllers/brokers/DeleteBrokerController';
import { GetBrokerController } from '../controllers/brokers/GetBrokerController';
import { ListBrokerController } from '../controllers/brokers/ListBrokerController';
import { UpdateBrokerController } from '../controllers/brokers/UpdateBrokerController';
import { AssetRepository } from '../repositories/AssetRepository';
import { BrokerRepository } from '../repositories/BrokerRepository';
import { CreateAssetUseCase } from '../use-cases/assets/CreateAssetUseCase';
import { DeleteAssetUseCase } from '../use-cases/assets/DeleteAssetUseCase';
import { GetAssetUseCase } from '../use-cases/assets/GetAssetUseCase';
import { ListAssetUseCase } from '../use-cases/assets/ListAssetUseCase';
import { UpdateAssetUseCase } from '../use-cases/assets/UpdateAssetUseCase';
import { CreateBrokerUseCase } from '../use-cases/brokers/CreateBrokerUseCase';
import { DeleteBrokerUseCase } from '../use-cases/brokers/DeleteBrokerUseCase';
import { GetBrokerUseCase } from '../use-cases/brokers/GetBrokerUseCase';
import { ListBrokerUseCase } from '../use-cases/brokers/ListBrokerUseCase';
import { UpdateBrokerUseCase } from '../use-cases/brokers/UpdateBrokerUseCase';

const routes = Router();

const createBrokerController = new CreateBrokerController(
  new CreateBrokerUseCase(new BrokerRepository())
);
routes.post('/brokers', createBrokerController.handle.bind(createBrokerController));

const listBrokerController = new ListBrokerController(
  new ListBrokerUseCase(new BrokerRepository())
);
routes.get('/brokers', listBrokerController.handle.bind(listBrokerController));

const getBrokerController = new GetBrokerController(
  new GetBrokerUseCase(new BrokerRepository())
);
routes.get('/brokers/:id', getBrokerController.handle.bind(getBrokerController));

const updateBrokerController = new UpdateBrokerController(
  new UpdateBrokerUseCase(new BrokerRepository())
);
routes.put('/brokers/:id', updateBrokerController.handle.bind(updateBrokerController));

const deleteBrokerController = new DeleteBrokerController(
  new DeleteBrokerUseCase(new BrokerRepository())
);
routes.delete('/brokers/:id', deleteBrokerController.handle.bind(deleteBrokerController));

const createAssetController = new CreateAssetController(
  new CreateAssetUseCase(new AssetRepository())
);
routes.post('/assets', createAssetController.handle.bind(createAssetController));

const listAssetController = new ListAssetController(
  new ListAssetUseCase(new AssetRepository())
);
routes.get('/assets', listAssetController.handle.bind(listAssetController));

const getAssetController = new GetAssetController(
  new GetAssetUseCase(new AssetRepository())
);
routes.get('/assets/:id', getAssetController.handle.bind(getAssetController));

const updateAssetController = new UpdateAssetController(
  new UpdateAssetUseCase(new AssetRepository())
);
routes.put('/assets/:id', updateAssetController.handle.bind(updateAssetController));

const deleteAssetController = new DeleteAssetController(
  new DeleteAssetUseCase(new AssetRepository())
);
routes.delete('/assets/:id', deleteAssetController.handle.bind(deleteAssetController));

export default routes;
