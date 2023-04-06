import { beforeEach, describe, expect, it } from 'vitest';
import { Broker } from '../../entities/Broker';
import { User } from '../../entities/User';
import { BrokerRepositoryInMemory } from '../../repositories/in-memory/BrokerRepositoryInMemory';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { NotFound } from '../errors/NotFound';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';
import { CreateUserUseCase } from '../users/CreateUserUseCase';
import { CreateBrokerUseCase } from './CreateBrokerUseCase';
import { UpdateBrokerUseCase } from './UpdateBrokerUseCase';

describe('WHEN update a Broker', () => {
  let useCase: UpdateBrokerUseCase;
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
      legalName: 'Broker B1 DTVM',
      cnpj: 'XXXXXXXX0001XX'
    };
  };

  const getChangedBrokerData = () => {
    return {
      name: 'Broker 2',
      legalName: 'Broker B2 DTVM',
      cnpj: 'XXXXXXXX0001XX'
    };
  };

  beforeEach(async () => {
    const userRepository = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(userRepository);
    user = await createUserUseCase.execute(getNewUserData());
    const repository = new BrokerRepositoryInMemory();
    broker = await new CreateBrokerUseCase(repository).execute(user, getNewBrokerData());
    useCase = new UpdateBrokerUseCase(repository);
  });

  it('WITH valid data THEN update the broker', async () => {
    const updatedBroker = await useCase.execute(user, broker.id, getChangedBrokerData());
    expect(updatedBroker).toBeInstanceOf(Broker);
  });

  it('WITH an user different of the owner WITH valid data THEN update the broker', async () => {
    const anotherUser = await createUserUseCase.execute({ ...getNewUserData(), email: 'teste@gmail.com', login: 'teste' });
    const updatedBrokerPromise = useCase.execute(anotherUser, broker.id, getChangedBrokerData());
    expect(updatedBrokerPromise).rejects.toBeInstanceOf(NotFound);
  });

  it('WITH no legal name THEN should raise an error', async () => {
    const updatedBroker = await useCase.execute(user, broker.id, { ...getChangedBrokerData(), legalName: '' });
    expect(updatedBroker).toBeInstanceOf(Broker);
  });

  it('WITH no name THEN should raise an error', () => {
    const updatedBrokerPromise = useCase.execute(user, broker.id, { ...getChangedBrokerData(), name: '' });
    expect(updatedBrokerPromise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  describe('WITH CNPJ', () => {
    it('blank THEN create a broker', async () => {
      const updatedBroker = await useCase.execute(user, broker.id, { ...getChangedBrokerData(), cnpj: '' });
      expect(updatedBroker).toBeInstanceOf(Broker);
    });

    it('invalid THEN should raise an error', () => {
      const updatedBrokerPromise = useCase.execute(user, broker.id, { ...getChangedBrokerData(), cnpj: 'XXXXXXXX0001-XX' });
      expect(updatedBrokerPromise).rejects.toBeInstanceOf(UnprocessableEntity);
    });
  });
});
