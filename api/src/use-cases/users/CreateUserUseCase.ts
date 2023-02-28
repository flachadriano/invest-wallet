import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";
import { UnprocessableEntity } from "../errors/UnprocessableEntity";

interface IRequest {
  name: string;
  email: string;
  login: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private repository: IUserRepository) {}

  async execute(request: IRequest): Promise<User> {
    if (!request.name) {
      throw new UnprocessableEntity('Nome');
    }
    if (!request.email) {
      throw new UnprocessableEntity('E-mail');
    }
    if (!request.login) {
      throw new UnprocessableEntity('Login');
    }
    if (!request.password) {
      throw new UnprocessableEntity('Senha');
    }

    const user = this.repository.create(request);
    await this.repository.save(user);
    return user;
  }
}