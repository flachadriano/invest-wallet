import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../use-cases/users/CreateUserUseCase';
import { UpdateUserWalletUseCase } from '../../use-cases/users/UpdateUserWalletUseCase';
import { CreateWalletUseCase } from '../../use-cases/wallets/CreateWalletUseCase';

export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private createWalletUseCase: CreateWalletUseCase,
    private updateUserWalletUseCase: UpdateUserWalletUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const { name, email, login, password } = request.body;

    const user = await this.createUserUseCase.execute({ name, email, login, password });
    const wallet = await this.createWalletUseCase.execute({ user, name: 'Carteira' });

    await this.updateUserWalletUseCase.execute(user, { selectedWalletId: wallet.id });

    response.json({
      id: user.id,
      name: user.name,
      email: user.email,
      login: user.login,
      selectedWalletId: wallet.id,
      createdAt: user.createdAt
    });
  }
}
