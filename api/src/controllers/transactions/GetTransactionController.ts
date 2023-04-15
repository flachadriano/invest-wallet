import { Request, Response } from 'express';
import { GetTransactionUseCase } from '../../use-cases/transactions/GetTransactionUseCase';
import { GetWalletUseCase } from '../../use-cases/wallets/GetWalletUseCase';

export class GetTransactionController {
  constructor(
    private getTransactionUseCase: GetTransactionUseCase,
    private getWalletUseCase: GetWalletUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const { walletId, id } = request.params;
    const wallet = await this.getWalletUseCase.execute(request.currentUser, parseInt(walletId, 10));
    const transaction = await this.getTransactionUseCase
      .execute(request.currentUser, wallet, parseInt(id, 10));
    response.json(transaction);
  }
}
