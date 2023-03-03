import { sign } from 'jsonwebtoken';
import { User } from '../entities/User';

export class GenerateRefreshTokenProvider {
  execute(user: User) {
    return sign({
      name: user.name
    }, process.env.TOKEN_PRIVATE_KEY, {
      subject: user.login,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN
    });
  }
}
