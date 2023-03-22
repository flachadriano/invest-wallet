import { beforeEach, describe, expect, it } from 'vitest';
import { Broker } from '../../entities/Broker';
import { User } from '../../entities/User';
import { BrokerRepositoryInMemory } from '../../repositories/in-memory/BrokerRepositoryInMemory';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { NotFound } from '../errors/NotFound';
import { CreateUserUseCase } from '../users/CreateUserUseCase';
import { CreateBrokerUseCase } from './CreateBrokerUseCase';
import { DeleteBrokerUseCase } from './DeleteBrokerUseCase';

describe('WHEN update a Broker', () => {
  let useCase: DeleteBrokerUseCase;
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
    const anotherUser = await createUserUseCase.execute({ ...getNewUserData(), email: 'teste@gmail.com', login: 'teste' });
    const updatedBrokerPromise = useCase.execute(anotherUser, broker.id);
    expect(updatedBrokerPromise).rejects.toBeInstanceOf(NotFound);
  });
});
