import { Request, Response } from 'express';
import { GetBrokerUseCase } from '../../use-cases/brokers/GetBrokerUseCase';

export class GetBrokerController {
  constructor(private getBrokerUseCase: GetBrokerUseCase) {}

  async handle(request: Request, response: Response) {
    const id = parseInt(request.params.id, 10);
    const broker = await this.getBrokerUseCase.execute(request.currentUser, id);
    response.json(broker);
  }
}
