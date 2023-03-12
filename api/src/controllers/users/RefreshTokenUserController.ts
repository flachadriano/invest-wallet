import { Request, Response } from 'express';
import { RefreshTokenUserUseCase } from '../../use-cases/users/RefreshTokenUserUseCase';

export class RefreshTokenUserController {
  constructor(private refreshTokenUserUseCase: RefreshTokenUserUseCase) {}

  async handle(request: Request, response: Response) {
    const { refreshToken } = request.body;

    const token = await this.refreshTokenUserUseCase.execute({ refreshToken });

    response.json(token);
  }
}
