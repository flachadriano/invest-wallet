import crypto from "crypto";
import { sign } from "jsonwebtoken";
import { IUserRepository } from "../../repositories/IUserRepository";
import { Unauthorized } from "../errors/Unauthorized";

interface IRequest {
  loginOrEmail: string;
  password: string;
  rememberMe?: boolean;
}

interface IResponse {
  token: string;
  refreshToken?: string;
}

export class AuthenticateUserUseCase {
  constructor(private repository: IUserRepository) {}

  async execute({ loginOrEmail, password, rememberMe }: IRequest): Promise<IResponse> {
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

    const token = sign({
      name: user.name
    }, process.env.TOKEN_PRIVATE_KEY, {
      subject: user.login,
      expiresIn: process.env.TOKEN_EXPIRES_IN
    });

    if (rememberMe) {
      const refreshToken = sign({
        name: user.name
      }, process.env.TOKEN_PRIVATE_KEY, {
        subject: user.login,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
      });

      return {
        token,
        refreshToken
      };
    }

    return {
      token
    };
  }
}
