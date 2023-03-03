import { User } from '../../entities/User';
import { EncryptPasswordProvider } from '../../providers/EncryptPasswordProvider';
import { IUserRepository } from '../../repositories/IUserRepository';
import { Conflict } from '../errors/Conflict';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';

interface IRequest {
  name: string;
  email: string;
  login: string;
  password: string;
}

export class CreateUserUseCase {
  constructor(private repository: IUserRepository) {}

  async execute({ name, email, login, password }: IRequest): Promise<User> {
    if (!name) {
      throw new UnprocessableEntity('Nome');
    }
    if (!email) {
      throw new UnprocessableEntity('E-mail');
    }
    if (!login) {
      throw new UnprocessableEntity('Login');
    }
    if (!password) {
      throw new UnprocessableEntity('Senha');
    }

    const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    if (!isValidEmail) {
      throw new UnprocessableEntity('E-mail', 'é inválido');
    }

    let foundUser = await this.repository.findByEmail(email);
    if (foundUser) {
      throw new Conflict('E-mail');
    }
    foundUser = await this.repository.findByLogin(login);
    if (foundUser) {
      throw new Conflict('Login');
    }

    const passwordHash = new EncryptPasswordProvider().execute(password);
    const user = await this.repository.create({ name, email, login, password: passwordHash });
    return user;
  }
}
