import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { CreateUserUseCase } from './CreateUserUseCase';

const getMockedUserData = () => {
  return {
    name: 'Adriano Flach',
    email: 'flachadriano@gmail.com',
    login: 'flachadriano',
    password: '123'
  };
};

const getMockedSecondUserData = () => {
  return {
    name: 'Adriano XPTO',
    email: 'adriano@xpto.com',
    login: 'adrianoxpto',
    password: '123'
  };
};

export async function createUserFactory(repository?: IUserRepository) {
  const createUserUseCase = new CreateUserUseCase(repository || new UserRepositoryInMemory());
  const user = await createUserUseCase.execute(getMockedUserData());
  return user;
}

export async function createUserFactoryAnother(repository?: IUserRepository) {
  const createUserUseCase = new CreateUserUseCase(repository || new UserRepositoryInMemory());
  const user = await createUserUseCase.execute(getMockedSecondUserData());
  return user;
}
