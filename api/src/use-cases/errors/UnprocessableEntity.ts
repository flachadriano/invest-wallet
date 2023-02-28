export class UnprocessableEntity extends Error {

  constructor(fieldLabel: string) {
    super(`${fieldLabel} não pode ser nulo.`);
  }

}
