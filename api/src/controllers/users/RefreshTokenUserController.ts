import { Request, Response } from 'express';
import { RefreshTokenUserUseCase } from '../../use-cases/users/RefreshTokenUserUseCase';

export class RefreshTokenUserController {
  constructor(private useCase: RefreshTokenUserUseCase) {}

  async handle(request: Request, response: Response) {
    const { refreshToken, temporary } = request.body;
    const tokenData = await this.useCase.execute({ temporary, refreshToken });
    response.json({ token: tokenData.token, refreshToken: tokenData.refreshToken });
  }
}
