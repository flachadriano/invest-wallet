import { sign } from 'jsonwebtoken';
import { User } from '../entities/User';

export class GenerateRefreshTokenProvider {
  execute(user: User): string {
    return sign({
      id: user.id,
      name: user.name,
      email: user.email,
      login: user.login,
      createdAt: user.createdAt
    }, process.env.TOKEN_PRIVATE_KEY, {
      subject: user.login,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
    });
  }
}
