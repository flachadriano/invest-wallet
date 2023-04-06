import { Request, Response } from 'express';
import { ListTransactionUseCase } from '../../use-cases/transactions/ListTransactionUseCase';
import { GetWalletUseCase } from '../../use-cases/wallets/GetWalletUseCase';

export class ListTransactionController {
  constructor(
    private listTransactionUseCase: ListTransactionUseCase,
    private getWalletUseCase: GetWalletUseCase
  ) {}

  async handle(request: Request, response: Response) {
    const { walletId } = request.params;

    const wallet = await this.getWalletUseCase.execute(request.currentUser, parseInt(walletId, 10));

    const transactions = await this.listTransactionUseCase.execute(wallet);
    response.json(transactions);
  }
}
