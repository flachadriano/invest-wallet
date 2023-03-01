import { IUserRepository } from "../../repositories/IUserRepository";
import { Unauthorized } from "../errors/Unauthorized";

interface IRequest {
  loginOrEmail: string;
  password: string;
}

export class AuthenticateUserUseCase {
  constructor(private repository: IUserRepository) {}

  async execute({ loginOrEmail, password }: IRequest) {
    let user = await this.repository.findByLogin(loginOrEmail);
    if (!user) {
      user = await this.repository.findByEmail(loginOrEmail);
    }

    if (!user || user.password != password) {
      throw new Unauthorized();
    }

    return user;
  }
}