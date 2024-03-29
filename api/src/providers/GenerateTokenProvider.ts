import { sign } from 'jsonwebtoken';
import { User } from '../entities/User';

export class GenerateTokenProvider {
  execute(user: User): string {
    return sign({
      id: user.id,
      name: user.name,
      email: user.email,
      login: user.login,
      selectedWalletId: user.selectedWalletId,
      createAt: user.createdAt
    }, process.env.TOKEN_PRIVATE_KEY, {
      subject: user.login,
      expiresIn: process.env.TOKEN_EXPIRES_IN
    });
  }
}
