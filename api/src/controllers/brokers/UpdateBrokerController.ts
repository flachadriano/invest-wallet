import { Request, Response } from 'express';
import { UpdateBrokerUseCase } from '../../use-cases/brokers/UpdateBrokerUseCase';

export class UpdateBrokerController {
  constructor(private updateBrokerUseCase: UpdateBrokerUseCase) {}

  async handle(request: Request, response: Response) {
    const id = parseInt(request.params.id, 10);
    const { name, legalName, cnpj } = request.body;

    const broker = await this.updateBrokerUseCase.execute(request.currentUser, id, {
      name, legalName, cnpj
    });

    response.json({
      id: broker.id,
      name: broker.name,
      legalName: broker.legalName,
      cnpj: broker.cnpj
    });
  }
}
