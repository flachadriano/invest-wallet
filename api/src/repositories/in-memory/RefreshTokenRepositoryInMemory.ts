import { RefreshToken } from '../../entities/RefreshTokens';
import { IRefreshTokenCreateData, IRefreshTokenRepository } from '../IRefreshTokenRepository';

export class RefreshTokenRepositoryInMemory implements IRefreshTokenRepository {
  refreshTokens: RefreshToken[] = [];

  create(data: IRefreshTokenCreateData): Promise<RefreshToken> {
    const refreshToken = new RefreshToken();
    refreshToken.id = 1;
    refreshToken.token = data.token;
    refreshToken.user = data.user;
    this.refreshTokens.push(refreshToken);
    return Promise.resolve(refreshToken);
  }

  findByToken(token: string): Promise<RefreshToken> {
    return Promise.resolve(this.refreshTokens.find(t => t.token === token));
  }
}
