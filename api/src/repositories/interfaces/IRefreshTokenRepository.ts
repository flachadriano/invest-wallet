import { RefreshToken } from '../../entities/RefreshTokens';
import { User } from '../../entities/User';

export interface IRefreshTokenCreateData {
  token: string;
  expiresIn: Date;
  user: User;
}

export interface IRefreshTokenRepository {

  create(data: IRefreshTokenCreateData): Promise<RefreshToken>;

  findByToken(token: string): Promise<RefreshToken>;

}
