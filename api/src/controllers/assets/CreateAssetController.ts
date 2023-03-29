import { Request, Response } from 'express';
import { CreateAssetUseCase } from '../../use-cases/assets/CreateAssetUseCase';

export class CreateAssetController {
  constructor(private createAssetUseCase: CreateAssetUseCase) {}

  async handle(request: Request, response: Response) {
    const { name, category, subcategory, legalName, cnpj } = request.body;

    const asset = await this.createAssetUseCase.execute({
      user: request.currentUser, name, category, subcategory, legalName, cnpj
    });

    response.json({
      id: asset.id,
      name: asset.name,
      category: asset.category,
      subcategory: asset.subcategory,
      legalName: asset.legalName,
      cnpj: asset.cnpj
    });
  }
}
