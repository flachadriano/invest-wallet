import { Router } from 'express';
import { CreateUserController } from './controllers/users/CreateUserController';
import { UserRepository } from './repositories/UserRepository';
import { CreateUserUseCase } from './use-cases/users/CreateUserUseCase';

const routes = Router();

const controller = new CreateUserController(new CreateUserUseCase(new UserRepository()));
routes.post('/users', controller.handle.bind(controller));

export default routes;
