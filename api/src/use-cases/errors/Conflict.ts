export class Conflict extends Error {
  constructor(fieldLabel: string) {
    super(`${fieldLabel} já está sendo utilizado.`);
  }
}
