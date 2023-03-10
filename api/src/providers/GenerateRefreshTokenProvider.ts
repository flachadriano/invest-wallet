import { sign } from 'jsonwebtoken';
import { User } from '../entities/User';
import { IRefreshTokenRepository } from '../repositories/IRefreshTokenRepository';

export class GenerateRefreshTokenProvider {
  constructor(private repository: IRefreshTokenRepository) {}

  execute(user: User): string {
    const refreshToken = sign({
      name: user.name
    }, process.env.TOKEN_PRIVATE_KEY, {
      subject: user.login,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
    });

    this.repository.create({
      token: refreshToken,
      expiresIn: new Date(),
      user: user
    });

    return refreshToken;
  }
}
