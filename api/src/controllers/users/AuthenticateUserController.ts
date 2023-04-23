import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from '../../use-cases/users/AuthenticateUserUseCase';

export class AuthenticateUserController {
  constructor(private authenticateUserUseCase: AuthenticateUserUseCase) {}

  async handle(request: Request, response: Response) {
    const { loginOrEmail, password, keepConnected } = request.body;

    const { token, refreshToken } = await this.authenticateUserUseCase.execute({
      loginOrEmail, password, keepConnected
    });

    response.json({ token, refreshToken });
  }
}
