import { UserResponse } from '../../entities/UserResponse';
import { EncryptPasswordProvider } from '../../providers/EncryptPasswordProvider';
import { GenerateRefreshTokenProvider } from '../../providers/GenerateRefreshTokenProvider';
import { GenerateTokenProvider } from '../../providers/GenerateTokenProvider';
import { IRefreshTokenRepository } from '../../repositories/interfaces/IRefreshTokenRepository';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { Forbidden } from '../errors/Forbidden';

interface IRequest {
  loginOrEmail: string;
  password: string;
  keepConnected?: boolean;
}

export interface IResponse {
  token: string;
  refreshToken?: string;
  user: UserResponse;
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
      throw new Forbidden('Usuário e/ou senha inválidos.');
    }

    const passwordHash = new EncryptPasswordProvider().execute(password);
    if (user.password !== passwordHash) {
      throw new Forbidden('Usuário e/ou senha inválidos.');
    }

    const token = new GenerateTokenProvider().execute(user);

    if (keepConnected) {
      const provider = new GenerateRefreshTokenProvider(this.refreshTokenRepository);
      const refreshToken = provider.execute(user);

      return {
        token,
        refreshToken,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          login: user.login,
          createdAt: user.createdAt
        }
      };
    }

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        login: user.login,
        createdAt: user.createdAt
      }
    };
  }
}
