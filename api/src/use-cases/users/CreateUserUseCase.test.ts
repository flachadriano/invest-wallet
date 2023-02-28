import { describe, expect, it } from 'vitest';
import { User } from '../../entities/User';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';
import { CreateUserUseCase } from './CreateUserUseCase';

describe('WHEN create an user', () => {
  const getUseCaseInstance = () => {
    const repository = new UserRepositoryInMemory();
    return new CreateUserUseCase(repository);
  }

  it('WITH valid data THEN create it', () => {
    const userCreatePromise = getUseCaseInstance().execute({
      name: 'Adriano Flach',
      email: 'flachadriano@gmail.com',
      login: 'flachadriano',
      password: '123'
    });
    expect(userCreatePromise).resolves.toBeInstanceOf(User);
  });

  it('WITH blank name THEN raise an error', () => {
    const userCreatePromise = getUseCaseInstance().execute({
      name: '',
      email: 'flachadriano@gmail.com',
      login: 'flachadriano',
      password: '123'
    });
    expect(userCreatePromise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  it('WITH blank email THEN raise an error', () => {
    const userCreatePromise = getUseCaseInstance().execute({
      name: 'Adriano Flach',
      email: '',
      login: 'flachadriano',
      password: '123'
    });
    expect(userCreatePromise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  it('WITH blank login THEN raise an error', () => {
    const userCreatePromise = getUseCaseInstance().execute({
      name: 'Adriano Flach',
      email: 'flachadriano@gmail.com',
      login: '',
      password: '123'
    });
    expect(userCreatePromise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  it('WITH blank password THEN raise an error', () => {
    const userCreatePromise = getUseCaseInstance().execute({
      name: 'Adriano Flach',
      email: 'flachadriano@gmail.com',
      login: 'flachadriano',
      password: ''
    });
    expect(userCreatePromise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  it('WITH duplicated email THEN raise an error', () => {
    // TODO
  });

  it('WITH duplicated login THEN raise an error', () => {
    // TODO
  });
});
