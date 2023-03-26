import { Router } from 'express';
import { CreateBrokerController } from '../controllers/brokers/CreateBrokerController';
import { DeleteBrokerController } from '../controllers/brokers/DeleteBrokerController';
import { GetBrokerController } from '../controllers/brokers/GetBrokerController';
import { ListBrokerController } from '../controllers/brokers/ListBrokerController';
import { UpdateBrokerController } from '../controllers/brokers/UpdateBrokerController';
import { BrokerRepository } from '../repositories/BrokerRepository';
import { CreateBrokerUseCase } from '../use-cases/brokers/CreateBrokerUseCase';
import { DeleteBrokerUseCase } from '../use-cases/brokers/DeleteBrokerUseCase';
import { GetBrokerUseCase } from '../use-cases/brokers/GetBrokerUseCase';
import { ListBrokerUseCase } from '../use-cases/brokers/ListBrokerUseCase';
import { UpdateBrokerUseCase } from '../use-cases/brokers/UpdateBrokeUseCase';

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

export default routes;
