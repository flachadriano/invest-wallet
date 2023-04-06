import { Router } from 'express';
import { CreateBrokerController } from '../../controllers/brokers/CreateBrokerController';
import { CreateBrokerUseCase } from '../../use-cases/brokers/CreateBrokerUseCase';
import { BrokerRepository } from '../../repositories/BrokerRepository';
import { ListBrokerController } from '../../controllers/brokers/ListBrokerController';
import { ListBrokerUseCase } from '../../use-cases/brokers/ListBrokerUseCase';
import { GetBrokerController } from '../../controllers/brokers/GetBrokerController';
import { GetBrokerUseCase } from '../../use-cases/brokers/GetBrokerUseCase';
import { UpdateBrokerController } from '../../controllers/brokers/UpdateBrokerController';
import { UpdateBrokerUseCase } from '../../use-cases/brokers/UpdateBrokerUseCase';
import { DeleteBrokerController } from '../../controllers/brokers/DeleteBrokerController';
import { DeleteBrokerUseCase } from '../../use-cases/brokers/DeleteBrokerUseCase';

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
