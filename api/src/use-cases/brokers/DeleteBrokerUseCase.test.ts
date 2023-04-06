import { beforeEach, describe, expect, it } from 'vitest';
import { Broker } from '../../entities/Broker';
import { User } from '../../entities/User';
import { BrokerRepositoryInMemory } from '../../repositories/in-memory/BrokerRepositoryInMemory';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { NotFound } from '../errors/NotFound';
import { CreateUserUseCase } from '../users/CreateUserUseCase';
import { DeleteBrokerUseCase } from './DeleteBrokerUseCase';
import { createBrokerFactory } from './CreateBrokerUseCase.factory';
import { createUserFactory, getMockedUserData } from '../users/CreateUserUseCase.factory';

describe('WHEN update a Broker', () => {
  let useCase: DeleteBrokerUseCase;
  let createUserUseCase: CreateUserUseCase;
  let user: User;
  let broker: Broker;

  beforeEach(async () => {
    const userRepository = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepository);
    user = await createUserFactory(userRepository);
    const repository = new BrokerRepositoryInMemory();
    broker = await createBrokerFactory(repository, user);
    useCase = new DeleteBrokerUseCase(repository);
  });

  it('WITH valid id THEN delete true', async () => {
    const updatedBroker = await useCase.execute(user, broker.id);
    expect(updatedBroker).toBe(true);
  });

  it('WITH invalid id THEN delete true', () => {
    const updatedBrokerPromise = useCase.execute(user, 2);
    expect(updatedBrokerPromise).rejects.toBeInstanceOf(NotFound);
  });

  it('WITH valid id of another user THEN delete true', async () => {
    const anotherUser = await createUserUseCase.execute({ ...getMockedUserData(), email: 'teste@gmail.com', login: 'teste' });
    const updatedBrokerPromise = useCase.execute(anotherUser, broker.id);
    expect(updatedBrokerPromise).rejects.toBeInstanceOf(NotFound);
  });
});
