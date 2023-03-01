import { beforeEach, describe, expect, it } from "vitest";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { IUserRepository } from "../../repositories/IUserRepository";
import { Unauthorized } from "../errors/Unauthorized";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { CreateUserUseCase } from "./CreateUserUseCase";

describe('WHEN authenticate and user', () => {
  let repository: IUserRepository;
  let useCase: AuthenticateUserUseCase;

  const getNewUserData = () => {
    return {
      name: 'Adriano Flach',
      email: 'flachadriano@gmail.com',
      login: 'flachadriano',
      password: '123'
    };
  };

  const createUser = () => {
    new CreateUserUseCase(repository).execute(getNewUserData());
  };

  beforeEach(() => {
    process.env.PASSWORD_SALT='mocked-salt';
    process.env.TOKEN_PRIVATE_KEY='mocked-token-private-key';
    repository = new UserRepositoryInMemory();
    createUser();
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
    expect(promise).rejects.toBeInstanceOf(Unauthorized);
  });

  it('WITH invalid email and password THEN raise an unauthorized exception', () => {
    const promise = useCase.execute({
      loginOrEmail: 'asd@asd.com',
      password: getNewUserData().password
    });
    expect(promise).rejects.toBeInstanceOf(Unauthorized);
  });
});
