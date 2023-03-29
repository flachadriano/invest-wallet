import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../use-cases/users/CreateUserUseCase';
import { CreateWalletUseCase } from '../../use-cases/wallets/CreateWalletUseCase';

export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private createWalletUseCase: CreateWalletUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const { name, email, login, password } = request.body;

    const user = await this.createUserUseCase.execute({ name, email, login, password });

    await this.createWalletUseCase.execute({ user, name: 'Carteira' });

    response.json({
      id: user.id,
      name: user.name,
      email: user.email,
      login: user.login,
      createdAt: user.createdAt
    });
  }
}
