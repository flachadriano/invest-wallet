import { describe, expect, it } from 'vitest';
import { RefreshTokenRepositoryInMemory } from '../../repositories/in-memory/RefreshTokenRepositoryInMemory';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { IRefreshTokenRepository } from '../../repositories/IRefreshTokenRepository';
import { AuthenticateUserUseCase, IResponse } from './AuthenticateUserUseCase';
import { CreateUserUseCase } from './CreateUserUseCase';
import { RefreshTokenUserUseCase } from './RefreshTokenUserUseCase';

describe('WHEN generate a new token', () => {
  let refreshTokenRepository: IRefreshTokenRepository;
  let loggedTokens: IResponse;

  const getNewUserData = () => {
    return {
      name: 'Adriano Flach',
      email: 'flachadriano@gmail.com',
      login: 'flachadriano',
      password: '123'
    };
  };

  it('WITH a valid refresh token THEN create a refresh token', async () => {
    const userRepository = new UserRepositoryInMemory();
    await new CreateUserUseCase(userRepository).execute(getNewUserData());
    refreshTokenRepository = new RefreshTokenRepositoryInMemory();
    loggedTokens = await new AuthenticateUserUseCase(userRepository, refreshTokenRepository)
      .execute({
        loginOrEmail: getNewUserData().login,
        password: getNewUserData().password,
        keepConnected: true
      });
    const newToken = await new RefreshTokenUserUseCase(refreshTokenRepository)
      .execute({ refreshToken: loggedTokens.refreshToken });
    expect(newToken).toBeInstanceOf(Object);
  });
});
