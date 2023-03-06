import { GenerateTokenProvider } from '../../providers/GenerateTokenProvider';
import { IRefreshTokenRepository } from '../../repositories/IRefreshTokenRepository';
import { Unauthorized } from '../errors/Unauthorized';

interface IRequest {
  refreshToken: string;
}

interface IResponse {
  token: string;
}

export class RefreshTokenUserUseCase {
  constructor(private repository: IRefreshTokenRepository) {}

  async execute({ refreshToken }: IRequest): Promise<IResponse> {
    const record = await this.repository.findByToken(refreshToken);

    if (!record) {
      throw new Unauthorized('Refresh token inválido');
    }

    const token = new GenerateTokenProvider().execute(record.user);
    return { token };
  }
}
