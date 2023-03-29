import { Request, Response } from 'express';
import { ListWalletUseCase } from '../../use-cases/wallets/ListWalletUseCase';

export class ListWalletController {
  constructor(private listWalletUseCase: ListWalletUseCase) {}

  async handle(request: Request, response: Response) {
    const wallets = await this.listWalletUseCase.execute({ user: request.currentUser });
    response.json(wallets);
  }
}
