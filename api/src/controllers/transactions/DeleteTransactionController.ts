import { Request, Response } from 'express';
import { DeleteTransactionUseCase } from '../../use-cases/transactions/DeleteTransactionUseCase';
import { GetWalletUseCase } from '../../use-cases/wallets/GetWalletUseCase';

export class DeleteTransactionController {
  constructor(
    private useCase: DeleteTransactionUseCase,
    private getWalletUseCase: GetWalletUseCase
  ) {}

  async handle(req: Request, res: Response) {
    const { walletId, id } = req.params;
    const wallet = await this.getWalletUseCase.execute(req.currentUser, parseInt(walletId, 10));
    await this.useCase.execute(req.currentUser, wallet, parseInt(id, 10));
    res.json({ success: true });
  }
}
