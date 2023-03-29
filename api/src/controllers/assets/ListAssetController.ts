import { Request, Response } from 'express';
import { ListAssetUseCase } from '../../use-cases/assets/ListAssetUseCase';

export class ListAssetController {
  constructor(private listAssetUseCase: ListAssetUseCase) {}

  async handle(request: Request, response: Response) {
    const assets = await this.listAssetUseCase.execute({ user: request.currentUser });
    response.json(assets);
  }
}
