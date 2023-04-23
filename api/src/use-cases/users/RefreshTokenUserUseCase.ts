import { verify } from 'jsonwebtoken';
import { GenerateTokenProvider } from '../../providers/GenerateTokenProvider';
import { Unauthorized } from '../errors/Unauthorized';
import { DecodeTokenPayloadProvider } from '../../providers/DecodeTokenPayloadProvider';
import { IUserRepository } from '../../repositories/interfaces/IUserRepository';
import { GenerateTemporaryRefreshTokenProvider } from '../../providers/GenerateTemporaryRefreshTokenProvider';
import { GenerateRefreshTokenProvider } from '../../providers/GenerateRefreshTokenProvider';

interface IRequest {
  refreshToken: string;
}

interface IResponse {
  token: string;
  refreshToken: string;
}

export class RefreshTokenUserUseCase {
  constructor(private userRepo: IUserRepository) {}

  async execute({ refreshToken }: IRequest): Promise<IResponse> {
    try {
      verify(refreshToken, process.env.TOKEN_PRIVATE_KEY);
      const decodedToken = new DecodeTokenPayloadProvider().execute(refreshToken);
      const userEmail = decodedToken.email;
      const user = await this.userRepo.findByEmail(userEmail);
      const newToken = new GenerateTokenProvider().execute(user);
      let newRefreshToken: string;
      if (decodedToken.temporary) {
        newRefreshToken = new GenerateTemporaryRefreshTokenProvider().execute(user);
      } else {
        newRefreshToken = new GenerateRefreshTokenProvider().execute(user);
      }
      return { token: newToken, refreshToken: newRefreshToken };
    } catch (e) {
      throw new Unauthorized('Refresh token inválido');
    }
  }
}
