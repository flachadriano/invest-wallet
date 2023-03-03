import { describe, expect, it } from 'vitest';
import { User } from '../../entities/User';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { Conflict } from '../errors/Conflict';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';
import { CreateUserUseCase } from './CreateUserUseCase';

describe('WHEN create an user', () => {
  const getUseCaseInstance = () => {
    const repository = new UserRepositoryInMemory();
    return new CreateUserUseCase(repository);
  };

  const getNewUserData = () => {
    return {
      name: 'Adriano Flach',
      email: 'flachadriano@gmail.com',
      login: 'flachadriano',
      password: '123'
    };
  };

  it('WITH valid data THEN create it', () => {
    const userCreatePromise = getUseCaseInstance().execute(getNewUserData());
    expect(userCreatePromise).resolves.toBeInstanceOf(User);
  });

  it('WITH blank name THEN raise an error', () => {
    const userCreatePromise = getUseCaseInstance().execute({ ...getNewUserData(), name: '' });
    expect(userCreatePromise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  it('WITH blank email THEN raise an error', () => {
    const userCreatePromise = getUseCaseInstance().execute({ ...getNewUserData(), email: '' });
    expect(userCreatePromise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  it('WITH blank login THEN raise an error', () => {
    const userCreatePromise = getUseCaseInstance().execute({ ...getNewUserData(), login: '' });
    expect(userCreatePromise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  it('WITH blank password THEN raise an error', () => {
    const userCreatePromise = getUseCaseInstance().execute({ ...getNewUserData(), password: '' });
    expect(userCreatePromise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  it('WITH duplicated email THEN raise an error', async () => {
    const useCase = getUseCaseInstance();
    const user = await useCase.execute(getNewUserData());
    expect(user).toBeInstanceOf(User);
    const duplicatedUserPromise = useCase.execute({ ...getNewUserData(), login: 'flachadriano2' });
    expect(duplicatedUserPromise).rejects.toBeInstanceOf(Conflict);
  });

  it('WITH duplicated login THEN raise an error', async () => {
    const useCase = getUseCaseInstance();
    const user = await useCase.execute(getNewUserData());
    expect(user).toBeInstanceOf(User);
    const duplicatedUserPromise = useCase.execute({ ...getNewUserData(), email: 'flachadriano2@gmail.com' });
    expect(duplicatedUserPromise).rejects.toBeInstanceOf(Conflict);
  });

  it('WITH malformed email, without at THEN raise an error', () => {
    const userCreatePromise = getUseCaseInstance().execute({ ...getNewUserData(), email: 'flachadrianogmail.com' });
    expect(userCreatePromise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

  it('WITH malformed email, without dot after the at THEN raise an error', () => {
    const userCreatePromise = getUseCaseInstance().execute({ ...getNewUserData(), email: 'flachadriano@gmailcom' });
    expect(userCreatePromise).rejects.toBeInstanceOf(UnprocessableEntity);
  });

});
