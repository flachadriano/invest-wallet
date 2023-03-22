import { Request, Response } from 'express';
import { CreateBrokerUseCase } from '../../use-cases/brokers/CreateBrokerUseCase';

export class CreateBrokerController {
  constructor(private createBrokerUseCase: CreateBrokerUseCase) {}

  async handle(request: Request, response: Response) {
    const { name, acronym, cnpj } = request.body;

    const broker = await this.createBrokerUseCase.execute({
      user: request.currentUser, name, acronym, cnpj
    });

    response.json({
      id: broker.id,
      name: broker.name,
      acronym: broker.acronym,
      cnpj: broker.cnpj
    });
  }
}
