import { Router } from 'express';
import { AuthenticateUserController } from './controllers/users/AuthenticateUserController';
import { CreateUserController } from './controllers/users/CreateUserController';
import { RefreshTokenUserController } from './controllers/users/RefreshTokenUserController';
import { RefreshTokenRepository } from './repositories/RefreshTokenRepository';
import { UserRepository } from './repositories/UserRepository';
import { AuthenticateUserUseCase } from './use-cases/users/AuthenticateUserUseCase';
import { CreateUserUseCase } from './use-cases/users/CreateUserUseCase';
import { RefreshTokenUserUseCase } from './use-cases/users/RefreshTokenUserUseCase';

const routes = Router();

const createUserController = new CreateUserController(new CreateUserUseCase(new UserRepository()));
routes.post('/users', createUserController.handle.bind(createUserController));

const authenticateUserController = new AuthenticateUserController(
  new AuthenticateUserUseCase(new UserRepository(), new RefreshTokenRepository())
);
routes.post('/users/authenticate', authenticateUserController.handle.bind(authenticateUserController));

const refreshTokenUserController = new RefreshTokenUserController(
  new RefreshTokenUserUseCase(new RefreshTokenRepository())
);
routes.post('/users/refresh-token', refreshTokenUserController.handle.bind(refreshTokenUserController));

export default routes;
