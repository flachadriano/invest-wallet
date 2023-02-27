import { User } from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

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
      throw Error('Name should no be blank');
    }

    const user = this.repository.create(request);
    await this.repository.save(user);
    return user;
  }
}