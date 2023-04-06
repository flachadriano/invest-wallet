import { beforeEach, describe, expect, it } from 'vitest';
import { User } from '../../entities/User';
import { BrokerRepositoryInMemory } from '../../repositories/in-memory/BrokerRepositoryInMemory';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { CreateUserUseCase } from '../users/CreateUserUseCase';
import { CreateBrokerUseCase } from './CreateBrokerUseCase';
import { ListBrokerUseCase } from './ListBrokerUseCase';

describe('WHEN list a Broker', () => {
  let useCase: ListBrokerUseCase;
  let userUseCase: CreateUserUseCase;
  let brokerUseCase: CreateBrokerUseCase;
  let user: User;

  const getNewUserData = () => ({
    name: 'Adriano Flach',
    email: 'flachadriano@gmail.com',
    login: 'flachadriano',
    password: '123'
  });

  const getNewBrokerData = () => ({
    name: 'Broker 1',
    legalName: 'Broker 1 DTVM',
    cnpj: 'XXXXXXXX0001XX'
  });

  beforeEach(async () => {
    const userRepository = new UserRepositoryInMemory();
    userUseCase = new CreateUserUseCase(userRepository);
    user = await userUseCase.execute(getNewUserData());
    const brokerRepository = new BrokerRepositoryInMemory();
    brokerUseCase = new CreateBrokerUseCase(brokerRepository);
    await brokerUseCase.execute(user, getNewBrokerData());
    useCase = new ListBrokerUseCase(brokerRepository);
  });

  it('WITH a broker stored earlier THEN get the broker', async () => {
    const brokers = await useCase.execute(user);
    expect(brokers.length).toBe(1);
  });

  it('WITH two brokers stored earlier from different users THEN get only the user brokers', async () => {
    const user2 = await userUseCase.execute({ ...getNewUserData(), email: 'flachadriano2@gmail.com', login: 'flachadriano2' });
    brokerUseCase.execute(user2, getNewBrokerData());
    const brokers = await useCase.execute(user);
    expect(brokers.length).toBe(1);
  });
});
