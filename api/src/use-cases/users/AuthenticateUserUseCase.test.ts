import { beforeEach, describe, expect, it } from 'vitest';
import { RefreshTokenRepositoryInMemory } from '../../repositories/in-memory/RefreshTokenRepositoryInMemory';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { IUserRepository } from '../../repositories/IUserRepository';
import { Unauthorized } from '../errors/Unauthorized';
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
    const refreshTokenRepository = new RefreshTokenRepositoryInMemory();
    createUser(repository);
    useCase = new AuthenticateUserUseCase(repository, refreshTokenRepository);
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
    expect(promise).rejects.toBeInstanceOf(Unauthorized);
  });

  it('WITH invalid email and password THEN raise an unauthorized exception', () => {
    const promise = useCase.execute({
      loginOrEmail: 'asd@asd.com',
      password: getNewUserData().password
    });
    expect(promise).rejects.toBeInstanceOf(Unauthorized);
  });

  describe('WITH remember', () => {
    it('WITH the value true THEN it should return a refresh token info', async () => {
      const token = await useCase.execute({
        loginOrEmail: getNewUserData().login,
        password: getNewUserData().password,
        rememberMe: true
      });
      expect(token.refreshToken).not.toBeUndefined();
    });

    it('WITH the value false THEN it should not return a refresh token info', async () => {
      const token = await useCase.execute({
        loginOrEmail: getNewUserData().login,
        password: getNewUserData().password,
        rememberMe: false
      });
      expect(token.refreshToken).toBeUndefined();
    });

    it('WITH no value THEN it should not return a refresh token info', async () => {
      const token = await useCase.execute({
        loginOrEmail: getNewUserData().login,
        password: getNewUserData().password
      });
      expect(token.refreshToken).toBeUndefined();
    });
  });
});
