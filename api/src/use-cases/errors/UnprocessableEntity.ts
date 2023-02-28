export class UnprocessableEntity extends Error {

  constructor(fieldLabel: string, customMessage?: string) {
    super(`${fieldLabel} ${customMessage || 'não pode ser nulo.'}`);
  }

}
