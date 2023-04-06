import { Request, Response } from 'express';
import { CreateTransactionUseCase } from '../../use-cases/transactions/CreateTransactionUseCase';

export class CreateTransactionController {
  constructor(private createTransactionUseCase: CreateTransactionUseCase) {}

  async handle(request: Request, response: Response) {
    const {
      walletId, brokerId, assetId, operation, transactionDate, unitPrice, quantity, total, comment
    } = request.body;

    const transaction = await this.createTransactionUseCase.execute(request.currentUser, {
      walletId, brokerId, assetId, operation, transactionDate, unitPrice, quantity, total, comment
    });

    response.json(transaction);
  }
}
