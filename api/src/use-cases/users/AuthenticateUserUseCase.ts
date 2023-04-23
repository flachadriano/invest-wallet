import { EncryptPasswordProvider } from '../../providers/EncryptPasswordProvider';
import { GenerateRefreshTokenProvider } from '../../providers/GenerateRefreshTokenProvider';
import { GenerateTemporaryRefreshTokenProvider } from '../../providers/GenerateTemporaryRefreshTokenProvider';
import { GenerateTokenProvider } from '../../providers/GenerateTokenProvider';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { Forbidden } from '../errors/Forbidden';

interface IRequest {
  loginOrEmail: string;
  password: string;
  keepConnected?: boolean;
}

export interface IResponse {
  token: string;
  refreshToken: string;
}

export class AuthenticateUserUseCase {
  constructor(private repository: IUserRepository) {}

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
    let refreshToken: string;
    if (keepConnected) {
      refreshToken = new GenerateRefreshTokenProvider().execute(user);
    } else {
      refreshToken = new GenerateTemporaryRefreshTokenProvider().execute(user);
    }

    return { token, refreshToken };
  }
}
