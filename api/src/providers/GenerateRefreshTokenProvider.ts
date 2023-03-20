import { sign } from 'jsonwebtoken';
import { User } from '../entities/User';
import { IRefreshTokenRepository } from '../repositories/IRefreshTokenRepository';

export class GenerateRefreshTokenProvider {
  constructor(private repository: IRefreshTokenRepository) {}

  execute(user: User): string {
    const refreshToken = sign({
      id: user.id,
      name: user.name,
      email: user.email,
      login: user.login,
      createdAt: user.createdAt
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
