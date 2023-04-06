import Operation from '../entities/Operation';

const operations: Operation[] = [
  { id: 1, name: 'Aluguel' },
  { id: 2, name: 'Bonificação' },
  { id: 3, name: 'Compra' },
  { id: 4, name: 'Dividendo' },
  { id: 5, name: 'Juros sobre capital proprio' },
  { id: 6, name: 'Provento' },
  { id: 7, name: 'Rendimento' },
  { id: 8, name: 'Subscrição' },
  { id: 9, name: 'Venda' }
];

export async function getOperationList(): Promise<Operation[]> {
  return Promise.resolve(operations);
}
