import { beforeEach, describe, expect, it } from 'vitest';
import { RefreshTokenRepositoryInMemory } from '../../repositories/in-memory/RefreshTokenRepositoryInMemory';
import { UserRepositoryInMemory } from '../../repositories/in-memory/UserRepositoryInMemory';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { Unauthorized } from '../errors/Unauthorized';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { CreateUserUseCase } from './CreateUserUseCase';
import { EnsureAuthenticateUserUseCase } from './EnsureAuthenticatedUserUseCase';

describe('WHEN try to access a protected endpoint', () => {
  let repository: IUserRepository;
  let useCase: EnsureAuthenticateUserUseCase;

  const getNewUserData = () => {
    return {
      name: 'Adriano Flach',
      email: 'flachadriano@gmail.com',
      login: 'flachadriano',
      password: '123'
    };
  };

  const createUser = (repo: IUserRepository) => {
    new CreateUserUseCase(repo).execute(getNewUserData());
  };

  beforeEach(() => {
    repository = new UserRepositoryInMemory();
    createUser(repository);
    useCase = new EnsureAuthenticateUserUseCase();
  });

  it('WITH a valid token THEN authenticate', async () => {
    const authenticate = new AuthenticateUserUseCase(
      repository,
      new RefreshTokenRepositoryInMemory()
    );
    const { token } = await authenticate.execute({
      loginOrEmail: getNewUserData().email,
      password: getNewUserData().password
    });
    const authenticated = useCase.execute({ token: `Bearer ${token}` });
    expect(authenticated).toBe(true);
  });

  it('WITH no token THEN raise unauthorized exception', () => {
    expect(() => {
      useCase.execute({ token: undefined });
    }).throw(Unauthorized);
  });

  it('WITH an invalid token THEN raise unauthorized exception', () => {
    expect(() => {
      useCase.execute({ token: 'Bearer mocked-token-info' });
    }).throw(Unauthorized);
  });
});
