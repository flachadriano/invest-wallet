import { verify } from 'jsonwebtoken';
import { GenerateTokenProvider } from '../../providers/GenerateTokenProvider';
import { Unauthorized } from '../errors/Unauthorized';
import { DecodeTokenPayloadProvider } from '../../providers/DecodeTokenPayloadProvider';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { GenerateTemporaryRefreshTokenProvider } from '../../providers/GenerateTemporaryRefreshTokenProvider';

interface IRequest {
  refreshToken: string;
}

interface IResponse {
  token: string;
  refreshToken: string;
}

export class RefreshTokenUserUseCase {
  constructor(
    private userRepo: IUserRepository
  ) {}

  async execute({ refreshToken }: IRequest): Promise<IResponse> {
    try {
      verify(refreshToken, process.env.TOKEN_PRIVATE_KEY);
      const userEmail = new DecodeTokenPayloadProvider().execute(refreshToken).email;
      const user = await this.userRepo.findByEmail(userEmail);
      const newToken = new GenerateTokenProvider().execute(user);
      const newRefreshToken = new GenerateTemporaryRefreshTokenProvider().execute(user);
      return { token: newToken, refreshToken: newRefreshToken };
    } catch (e) {
      throw new Unauthorized('Refresh token inválido');
    }
  }
}
