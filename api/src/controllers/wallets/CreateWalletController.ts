import { Request, Response } from 'express';
import { CreateWalletUseCase } from '../../use-cases/wallets/CreateWalletUseCase';

export class CreateWalletController {
  constructor(private createWalletUseCase: CreateWalletUseCase) {}

  async handle(request: Request, response: Response) {
    const { name } = request.body;

    const wallet = await this.createWalletUseCase.execute({ user: request.currentUser, name });

    response.json({
      id: wallet.id,
      name: wallet.name
    });
  }
}
