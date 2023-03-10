import { EncryptPasswordProvider } from '../../providers/EncryptPasswordProvider';
import { GenerateRefreshTokenProvider } from '../../providers/GenerateRefreshTokenProvider';
import { GenerateTokenProvider } from '../../providers/GenerateTokenProvider';
import { IRefreshTokenRepository } from '../../repositories/IRefreshTokenRepository';
import { IUserRepository } from '../../repositories/IUserRepository';
import { Unauthorized } from '../errors/Unauthorized';

interface IRequest {
  loginOrEmail: string;
  password: string;
  keepConnected?: boolean;
}

export interface IResponse {
  token: string;
  refreshToken?: string;
}

export class AuthenticateUserUseCase {
  constructor(
    private repository: IUserRepository,
    private refreshTokenRepository: IRefreshTokenRepository
  ) {}

  async execute({ loginOrEmail, password, keepConnected }: IRequest): Promise<IResponse> {
    let user = await this.repository.findByLogin(loginOrEmail);
    if (!user) {
      user = await this.repository.findByEmail(loginOrEmail);
    }

    if (!user) {
      throw new Unauthorized();
    }

    const passwordHash = new EncryptPasswordProvider().execute(password);
    if (user.password !== passwordHash) {
      throw new Unauthorized();
    }

    const token = new GenerateTokenProvider().execute(user);

    if (keepConnected) {
      const provider = new GenerateRefreshTokenProvider(this.refreshTokenRepository);
      const refreshToken = provider.execute(user);

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
