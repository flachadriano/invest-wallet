import { Request, Response } from 'express';
import { DeleteBrokerUseCase } from '../../use-cases/brokers/DeleteBrokerUseCase';

export class DeleteBrokerController {
  constructor(private deleteBrokerUseCase: DeleteBrokerUseCase) {}

  async handle(request: Request, response: Response) {
    const id = parseInt(request.params.id, 10);

    await this.deleteBrokerUseCase.execute(request.currentUser, id);

    response.json({ success: true });
  }
}
