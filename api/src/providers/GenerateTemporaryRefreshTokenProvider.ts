import { sign } from 'jsonwebtoken';
import { User } from '../entities/User';

export class GenerateTemporaryRefreshTokenProvider {
  execute(user: User): string {
    return sign({
      id: user.id,
      name: user.name,
      email: user.email,
      login: user.login,
      createdAt: user.createdAt,
      temporary: true
    }, process.env.TOKEN_PRIVATE_KEY, {
      subject: user.login,
      expiresIn: process.env.TEMPORARY_REFRESH_TOKEN_EXPIRES_IN
    });
  }
}
