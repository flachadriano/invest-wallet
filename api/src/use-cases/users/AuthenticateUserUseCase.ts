import { EncryptPasswordProvider } from "../../providers/EncryptPasswordProvider";
import { GenerateRefreshTokenProvider } from "../../providers/GenerateRefreshTokenProvider";
import { GenerateTokenProvider } from "../../providers/GenerateTokenProvider";
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

    const passwordHash = new EncryptPasswordProvider().execute(password);
    if (user.password != passwordHash) {
      throw new Unauthorized();
    }

    const token = new GenerateTokenProvider().execute(user);

    if (rememberMe) {
      const refreshToken = new GenerateRefreshTokenProvider().execute(user);

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
