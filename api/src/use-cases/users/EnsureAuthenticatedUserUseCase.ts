import { verify } from 'jsonwebtoken';
import { Unauthorized } from '../errors/Unauthorized';

interface IRequest {
  token: string;
}

export class EnsureAuthenticateUserUseCase {
  execute({ token }: IRequest): boolean {
    if (!token) {
      throw new Unauthorized('Token de autenticação não informado.');
    }

    const authToken = token.split(' ')[1];

    try {
      verify(authToken, process.env.TOKEN_PRIVATE_KEY);
      return true;
    } catch (e) {
      throw new Unauthorized('Token inválido.');
    }
  }
}
