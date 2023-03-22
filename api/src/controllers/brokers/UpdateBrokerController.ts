import { Request, Response } from 'express';
import { UpdateBrokerUseCase } from '../../use-cases/brokers/UpdateBrokeUseCase';

export class UpdateBrokerController {
  constructor(private updateBrokerUseCase: UpdateBrokerUseCase) {}

  async handle(request: Request, response: Response) {
    const id = parseInt(request.params.id, 10);
    const { name, acronym, cnpj } = request.body;

    const broker = await this.updateBrokerUseCase.execute(request.currentUser, id, {
      name, acronym, cnpj
    });

    response.json({
      id: broker.id,
      name: broker.name,
      acronym: broker.acronym,
      cnpj: broker.cnpj
    });
  }
}
