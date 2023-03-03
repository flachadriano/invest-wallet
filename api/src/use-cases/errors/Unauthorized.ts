export class Unauthorized extends Error {

  constructor(message?: string) {
    super(message || 'Usuário não autorizado.');
  }
}
