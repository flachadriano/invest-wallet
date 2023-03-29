import { Request, Response } from 'express';
import { UpdateWalletUseCase } from '../../use-cases/wallets/UpdateWalletUseCase';

export class UpdateWalletController {
  constructor(private updateWalletUseCase: UpdateWalletUseCase) {}

  async handle(request: Request, response: Response) {
    const id = parseInt(request.params.id, 10);
    const { name } = request.body;

    const Wallet = await this.updateWalletUseCase.execute(request.currentUser, id, { name });

    response.json({
      id: Wallet.id,
      name: Wallet.name
    });
  }
}
