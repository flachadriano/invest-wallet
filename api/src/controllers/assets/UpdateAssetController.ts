import { Request, Response } from 'express';
import { UpdateAssetUseCase } from '../../use-cases/assets/UpdateAssetUseCase';

export class UpdateAssetController {
  constructor(private updateAssetUseCase: UpdateAssetUseCase) {}

  async handle(request: Request, response: Response) {
    const id = parseInt(request.params.id, 10);
    const { name, category, subcategory, legalName, cnpj } = request.body;

    const asset = await this.updateAssetUseCase.execute(request.currentUser, id, {
      name, category: category || 'Geral', subcategory: subcategory || 'Não informado', legalName, cnpj
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
