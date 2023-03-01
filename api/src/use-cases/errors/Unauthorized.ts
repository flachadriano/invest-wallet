export class Unauthorized extends Error {

  constructor() {
    super('Usuário não autorizado.');
  }
}