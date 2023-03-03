import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../use-cases/users/CreateUserUseCase';

export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: Request, response: Response) {
    const { name, email, login, password } = request.body;

    const user = await this.createUserUseCase.execute({ name, email, login, password });

    response.json(user);
  }
}
