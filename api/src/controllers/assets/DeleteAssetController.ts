import { Request, Response } from 'express';
import { DeleteAssetUseCase } from '../../use-cases/assets/DeleteAssetUseCase';

export class DeleteAssetController {
  constructor(private deleteAssetUseCase: DeleteAssetUseCase) {}

  async handle(request: Request, response: Response) {
    const id = parseInt(request.params.id, 10);

    await this.deleteAssetUseCase.execute(request.currentUser, id);

    response.json({ success: true });
  }
}
