import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/users/AuthenticateUserController';
import { CreateUserController } from '../controllers/users/CreateUserController';
import { RefreshTokenUserController } from '../controllers/users/RefreshTokenUserController';
import { UserRepository } from '../repositories/UserRepository';
import { WalletRepository } from '../repositories/WalletRepostory';
import { AuthenticateUserUseCase } from '../use-cases/users/AuthenticateUserUseCase';
import { CreateUserUseCase } from '../use-cases/users/CreateUserUseCase';
import { RefreshTokenUserUseCase } from '../use-cases/users/RefreshTokenUserUseCase';
import { UpdateUserWalletUseCase } from '../use-cases/users/UpdateUserWalletUseCase';
import { CreateWalletUseCase } from '../use-cases/wallets/CreateWalletUseCase';

const routes = Router();

const createUserController = new CreateUserController(
  new CreateUserUseCase(new UserRepository()),
  new CreateWalletUseCase(new WalletRepository()),
  new UpdateUserWalletUseCase(new UserRepository(), new WalletRepository())
);
routes.post('/users', createUserController.handle.bind(createUserController));

const authenticateUserController = new AuthenticateUserController(
  new AuthenticateUserUseCase(new UserRepository())
);
routes.post('/users/authenticate', authenticateUserController.handle.bind(authenticateUserController));

const refreshTokenUserController = new RefreshTokenUserController(
  new RefreshTokenUserUseCase(new UserRepository())
);
routes.post('/users/refresh-token', refreshTokenUserController.handle.bind(refreshTokenUserController));

export default routes;
