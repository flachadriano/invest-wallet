import AppDataSource from '../middlewares/DataSource';
import { IRefreshTokenCreateData, IRefreshTokenRepository } from './interfaces/IRefreshTokenRepository';
import { RefreshToken } from '../entities/RefreshTokens';

export class RefreshTokenRepository implements IRefreshTokenRepository {
  private repository = AppDataSource.getRepository(RefreshToken);

  create(data: IRefreshTokenCreateData): Promise<RefreshToken> {
    const refreshToken = this.repository.create(data);
    return this.repository.save(refreshToken);
  }

  findByToken(token: string): Promise<RefreshToken> {
    return this.repository.findOneBy({ token });
  }
}
