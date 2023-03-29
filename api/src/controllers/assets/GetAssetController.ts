import { Request, Response } from 'express';
import { GetAssetUseCase } from '../../use-cases/assets/GetAssetUseCase';

export class GetAssetController {
  constructor(private getAssetUseCase: GetAssetUseCase) {}

  async handle(request: Request, response: Response) {
    const id = parseInt(request.params.id, 10);
    const asset = await this.getAssetUseCase.execute(request.currentUser, id);
    response.json(asset);
  }
}
