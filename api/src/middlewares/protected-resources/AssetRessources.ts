import { Router } from 'express';
import { CreateAssetController } from '../../controllers/assets/CreateAssetController';
import { DeleteAssetController } from '../../controllers/assets/DeleteAssetController';
import { GetAssetController } from '../../controllers/assets/GetAssetController';
import { ListAssetController } from '../../controllers/assets/ListAssetController';
import { UpdateAssetController } from '../../controllers/assets/UpdateAssetController';
import { AssetRepository } from '../../repositories/AssetRepository';
import { CreateAssetUseCase } from '../../use-cases/assets/CreateAssetUseCase';
import { DeleteAssetUseCase } from '../../use-cases/assets/DeleteAssetUseCase';
import { GetAssetUseCase } from '../../use-cases/assets/GetAssetUseCase';
import { ListAssetUseCase } from '../../use-cases/assets/ListAssetUseCase';
import { UpdateAssetUseCase } from '../../use-cases/assets/UpdateAssetUseCase';

const routes = Router();

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
