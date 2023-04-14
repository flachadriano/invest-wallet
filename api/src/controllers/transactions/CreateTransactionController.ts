import { Request, Response } from 'express';
import { CreateTransactionUseCase } from '../../use-cases/transactions/CreateTransactionUseCase';
import { GetWalletUseCase } from '../../use-cases/wallets/GetWalletUseCase';

export class CreateTransactionController {
  constructor(
    private createTransactionUseCase: CreateTransactionUseCase,
    private getWalletUseCase: GetWalletUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const { walletId } = request.params;
    const {
      brokerId, assetId, operation, transactionDate, unitPrice, quantity, total, comment
    } = request.body;

    const wallet = await this.getWalletUseCase.execute(request.currentUser, parseInt(walletId, 10));

    const transaction = await this.createTransactionUseCase.execute(request.currentUser, wallet, {
      brokerId, assetId, operation, transactionDate, unitPrice, quantity, total, comment
    });

    response.json(transaction);
  }
}
