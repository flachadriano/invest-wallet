import { beforeEach, describe, expect, it } from 'vitest';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { Unauthorized } from '../errors/Unauthorized';
import { AuthenticateUserUseCase, IResponse } from './AuthenticateUserUseCase';
import { RefreshTokenUserUseCase } from './RefreshTokenUserUseCase';
import { createUserFactory } from './CreateUserUseCase.factory';

describe('WHEN generate a new token', () => {
  let loggedTokens: IResponse;
  let useCase: RefreshTokenUserUseCase;

  const getNewUserData = () => ({
    name: 'Adriano Flach',
    email: 'flachadriano@gmail.com',
    login: 'flachadriano',
    password: '123'
  });

  beforeEach(async () => {
    const userRepo = new UserRepositoryInMemory();
    await createUserFactory(userRepo);
    useCase = new RefreshTokenUserUseCase(userRepo);
    loggedTokens = await new AuthenticateUserUseCase(userRepo)
      .execute({
        loginOrEmail: getNewUserData().login,
        password: getNewUserData().password,
        keepConnected: true
      });
  });

  it('WITH a valid refresh token THEN create a refresh token', () => {
    expect(useCase.execute({ refreshToken: loggedTokens.refreshToken }))
      .resolves.toBeInstanceOf(Object);
  });

  it('WITH a invalid refresh token THEN throw unauthorized error', () => {
    expect(useCase.execute({ refreshToken: 'fake-refresh-token' }))
      .rejects.toThrow(Unauthorized);
  });
});
