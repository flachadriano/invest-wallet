import { Request, Response } from 'express';
import { DeleteWalletUseCase } from '../../use-cases/wallets/DeleteWalletUseCase';

export class DeleteWalletController {
  constructor(private deleteWalletUseCase: DeleteWalletUseCase) {}

  async handle(request: Request, response: Response) {
    const id = parseInt(request.params.id, 10);

    await this.deleteWalletUseCase.execute(request.currentUser, id);

    response.json({ success: true });
  }
}
