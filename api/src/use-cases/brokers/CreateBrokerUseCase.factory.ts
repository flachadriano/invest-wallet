import { Broker } from '../../entities/Broker';
import { User } from '../../entities/User';
import { BrokerRepositoryInMemory } from '../../repositories/in-memory/BrokerRepositoryInMemory';
import { IBrokerRepository } from '../../repositories/interfaces/IBrokerRepository';
import { createUserFactory } from '../users/CreateUserUseCase.factory';
import { CreateBrokerUseCase } from './CreateBrokerUseCase';

const getNewBrokerData = async () => ({
  name: 'Broker 1',
  legalName: 'Broker B1 DTVM',
  cnpj: 'XXXXXXXX0001XX'
});

const getNewBrokerAnotherData = async () => ({
  name: 'Broker 2',
  legalName: 'Broker B2 DTVM',
  cnpj: 'XXXXXXXX000100'
});

export async function createBrokerFactory(
  repository?: IBrokerRepository,
  user?: User
): Promise<Broker> {
  const useCase = new CreateBrokerUseCase(repository || new BrokerRepositoryInMemory());
  return useCase.execute(user || await createUserFactory(), await getNewBrokerData());
}

export async function createBrokerFactoryAnother(
  repository?: IBrokerRepository,
  user?: User
): Promise<Broker> {
  const useCase = new CreateBrokerUseCase(repository || new BrokerRepositoryInMemory());
  return useCase.execute(user || await createUserFactory(), await getNewBrokerAnotherData());
}
