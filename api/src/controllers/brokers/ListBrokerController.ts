import { Request, Response } from 'express';
import { ListBrokerUseCase } from '../../use-cases/brokers/ListBrokerUseCase';

export class ListBrokerController {
  constructor(private listBrokerUseCase: ListBrokerUseCase) {}

  async handle(request: Request, response: Response) {
    const brokers = await this.listBrokerUseCase.execute(request.currentUser);
    response.json(brokers.map(broker => ({
      id: broker.id,
      name: broker.name,
      legalName: broker.legalName,
      cnpj: broker.cnpj
    })));
  }
}
