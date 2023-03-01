import crypto from "crypto";
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

    if (!user) {
      throw new Unauthorized();
    }

    const passwordHash = crypto.pbkdf2Sync(password, process.env.PASSWORD_SALT, 1000, 64, 'sha512').toString('hex');
    if (user.password != passwordHash) {
      throw new Unauthorized();
    }

    return user;
  }
}