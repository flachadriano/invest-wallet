import { Request, Response } from 'express';
import { CreateBrokerUseCase } from '../../use-cases/brokers/CreateBrokerUseCase';

export class CreateBrokerController {
  constructor(private createBrokerUseCase: CreateBrokerUseCase) {}

  async handle(request: Request, response: Response) {
    const { name, legalName, cnpj } = request.body;

    const broker = await this.createBrokerUseCase.execute({
      user: request.currentUser, name, legalName, cnpj
    });

    response.json({
      id: broker.id,
      name: broker.name,
      legalName: broker.legalName,
      cnpj: broker.cnpj
    });
  }
}
