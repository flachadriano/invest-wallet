import { beforeEach, describe, expect, it } from 'vitest';
import { Broker } from '../../entities/Broker';
import { User } from '../../entities/User';
import { BrokerRepositoryInMemory } from '../../repositories/in-memory/BrokerRepositoryInMemory';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { NotFound } from '../errors/NotFound';
import { CreateUserUseCase } from '../users/CreateUserUseCase';
import { CreateBrokerUseCase } from './CreateBrokerUseCase';
import { GetBrokerUseCase } from './GetBrokerUseCase';

describe('WHEN get a Broker', () => {
  let useCase: GetBrokerUseCase;
  let createUserUseCase: CreateUserUseCase;
  let user: User;
  let broker: Broker;

  const getNewUserData = () => {
    return {
      name: 'Adriano Flach',
      email: 'flachadriano@gmail.com',
      login: 'flachadriano',
      password: '123'
    };
  };

  const getNewBrokerData = () => {
    return {
      name: 'Broker 1',
      acronym: 'B1',
      cnpj: 'XXXXXXXX0001XX'
    };
  };

  beforeEach(async () => {
    const userRepository = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepository);
    user = await createUserUseCase.execute(getNewUserData());
    const repository = new BrokerRepositoryInMemory();
    broker = await new CreateBrokerUseCase(repository).execute({ user, ...getNewBrokerData() });
    useCase = new GetBrokerUseCase(repository);
  });

  it('WITH valid data THEN update the broker', async () => {
    const loadedBroker = await useCase.execute(user, broker.id);
    expect(loadedBroker).toBeInstanceOf(Broker);
  });

  it('WITH an user different of the owner WITH valid data THEN raises not found', async () => {
    const anotherUser = await createUserUseCase.execute({ ...getNewUserData(), email: 'teste@gmail.com', login: 'teste' });
    const updatedBrokerPromise = useCase.execute(anotherUser, broker.id);
    expect(updatedBrokerPromise).rejects.toBeInstanceOf(NotFound);
  });

  it('WITH an invalid id THEN raises not found', async () => {
    const updatedBrokerPromise = useCase.execute(user, 999999);
    expect(updatedBrokerPromise).rejects.toBeInstanceOf(NotFound);
  });
});
