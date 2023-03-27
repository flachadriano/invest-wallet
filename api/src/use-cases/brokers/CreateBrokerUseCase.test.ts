import { beforeEach, describe, expect, it } from 'vitest';
import { Broker } from '../../entities/Broker';
import { BrokerRepositoryInMemory } from '../../repositories/in-memory/BrokerRepositoryInMemory';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';
import { CreateUserUseCase } from '../users/CreateUserUseCase';
import { CreateBrokerUseCase } from './CreateBrokerUseCase';

describe('WHEN create a broker', () => {
  let useCase: CreateBrokerUseCase;

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

  beforeEach(() => {
    useCase = new CreateBrokerUseCase(new BrokerRepositoryInMemory());
  });

  it('WITH valid data THEN create a broker', async () => {
    const userRepository = new UserRepositoryInMemory();
    const user = await new CreateUserUseCase(userRepository).execute(getNewUserData());
    const newBroker = await useCase.execute({ user, ...getNewBrokerData() });
    expect(newBroker).instanceOf(Broker);
  });

  it('WITH no legal name THEN create a broker', async () => {
    const userRepository = new UserRepositoryInMemory();
    const user = await new CreateUserUseCase(userRepository).execute(getNewUserData());
    const newBroker = await useCase.execute({ user, ...getNewBrokerData(), legalName: '' });
    expect(newBroker).instanceOf(Broker);
  });

  it('WITH no name THEN should raise an error', async () => {
    const userRepository = new UserRepositoryInMemory();
    const user = await new CreateUserUseCase(userRepository).execute(getNewUserData());
    const newBrokerPromise = useCase.execute({ user, ...getNewBrokerData(), name: '' });
    expect(newBrokerPromise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  describe('WITH CNPJ', () => {
    it('blank THEN create a broker', async () => {
      const userRepository = new UserRepositoryInMemory();
      const user = await new CreateUserUseCase(userRepository).execute(getNewUserData());
      const newBroker = await useCase.execute({ user, ...getNewBrokerData(), cnpj: '' });
      expect(newBroker).instanceOf(Broker);
    });

    it('invalid THEN should raise an error', async () => {
      const userRepository = new UserRepositoryInMemory();
      const user = await new CreateUserUseCase(userRepository).execute(getNewUserData());
      const newBrokerPromise = useCase.execute({ user, ...getNewBrokerData(), cnpj: 'XXXXXXXX0001-XX' });
      expect(newBrokerPromise).rejects.toBeInstanceOf(UnprocessableEntity);
    });
  });
});
