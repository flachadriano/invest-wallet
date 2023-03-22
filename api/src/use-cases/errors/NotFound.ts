export class NotFound extends Error {
  constructor(entityName?: string) {
    super(`${entityName || 'Registro'} não localizado(a).`);
  }
}
