import { beforeEach, describe, expect, it } from 'vitest';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { Forbidden } from '../errors/Forbidden';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { CreateUserUseCase } from './CreateUserUseCase';

describe('WHEN authenticate and user', () => {
  let useCase: AuthenticateUserUseCase;

  const getNewUserData = () => {
    return {
      name: 'Adriano Flach',
      email: 'flachadriano@gmail.com',
      login: 'flachadriano',
      password: '123'
    };
  };

  const createUser = (repository: IUserRepository) => {
    new CreateUserUseCase(repository).execute(getNewUserData());
  };

  beforeEach(() => {
    const repository = new UserRepositoryInMemory();
    createUser(repository);
    useCase = new AuthenticateUserUseCase(repository);
  });

  it('WITH valid login and password THEN return the user data', () => {
    const promise = useCase.execute({
      loginOrEmail: getNewUserData().login,
      password: getNewUserData().password
    });
    expect(promise).resolves.toBeInstanceOf(Object);
  });

  it('WITH valid email and password THEN return the user data', () => {
    const promise = useCase.execute({
      loginOrEmail: getNewUserData().email,
      password: getNewUserData().password
    });
    expect(promise).resolves.toBeInstanceOf(Object);
  });

  it('WITH invalid login and password THEN raise an unauthorized exception', () => {
    const promise = useCase.execute({
      loginOrEmail: 'asd',
      password: getNewUserData().password
    });
    expect(promise).rejects.toBeInstanceOf(Forbidden);
  });

  it('WITH invalid email and password THEN raise an unauthorized exception', () => {
    const promise = useCase.execute({
      loginOrEmail: 'asd@asd.com',
      password: getNewUserData().password
    });
    expect(promise).rejects.toBeInstanceOf(Forbidden);
  });

  describe('WITH keep connected', () => {
    it('WITH the value true THEN it should return a refresh token info', async () => {
      const token = await useCase.execute({
        loginOrEmail: getNewUserData().login,
        password: getNewUserData().password,
        keepConnected: true
      });
      expect(token.refreshToken).toBeDefined();
    });

    it('WITH the value false THEN it should return a refresh token info', async () => {
      const token = await useCase.execute({
        loginOrEmail: getNewUserData().login,
        password: getNewUserData().password,
        keepConnected: false
      });
      expect(token.refreshToken).toBeDefined();
    });

    it('WITH no value THEN it should return a refresh token info', async () => {
      const token = await useCase.execute({
        loginOrEmail: getNewUserData().login,
        password: getNewUserData().password
      });
      expect(token.refreshToken).toBeDefined();
    });
  });
});
