import { Request, Response } from 'express';
import { GetWalletUseCase } from '../../use-cases/wallets/GetWalletUseCase';

export class GetWalletController {
  constructor(private getWalletUseCase: GetWalletUseCase) {}

  async handle(request: Request, response: Response) {
    const id = parseInt(request.params.id, 10);
    const wallet = await this.getWalletUseCase.execute(request.currentUser, id);
    response.json(wallet);
  }
}
