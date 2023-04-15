import { Request, Response } from 'express';
import { UpdateTransactionUseCase } from '../../use-cases/transactions/UpdateTransactionUseCase';
import { GetWalletUseCase } from '../../use-cases/wallets/GetWalletUseCase';

export class UpdateTransactionController {
  constructor(
    private updateTransactionUseCase: UpdateTransactionUseCase,
    private getWalletUseCase: GetWalletUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const { walletId, id } = request.params;
    const {
      brokerId, assetId, operation, transactionDate, unitPrice, quantity, total, comment
    } = request.body;

    const wallet = await this.getWalletUseCase.execute(request.currentUser, parseInt(walletId, 10));

    const transaction = await this.updateTransactionUseCase
      .execute(request.currentUser, wallet, parseInt(id, 10), {
        brokerId, assetId, operation, transactionDate, unitPrice, quantity, total, comment
      });

    response.json(transaction);
  }
}
