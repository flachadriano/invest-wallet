import { Transaction } from '../../entities/Transaction';
import { User } from '../../entities/User';
import { IAssetRepository } from '../../repositories/interfaces/IAsset';
import { IBrokerRepository } from '../../repositories/interfaces/IBrokerRepository';
import { ITransactionRepository } from '../../repositories/interfaces/ITransaction';
import { IWalletRepository } from '../../repositories/interfaces/IWalletRepository';
import { NotFound } from '../errors/NotFound';
import { UnprocessableEntity } from '../errors/UnprocessableEntity';

interface IRequest {
  walletId: number;
  brokerId: number;
  assetId: number;
  operation: number;
  transactionDate: Date;
  unitPrice: number;
  quantity: number;
  total: number;
  comment: string;
}

export class CreateTransactionUseCase {
  constructor(
    private repository: ITransactionRepository,
    private walletRepo: IWalletRepository,
    private brokerRepo: IBrokerRepository,
    private assetRepo: IAssetRepository
  ) {}

  async execute(user: User, {
    walletId, brokerId, assetId, operation, transactionDate, unitPrice, quantity, total, comment
  }: IRequest): Promise<Transaction> {
    if (!walletId) {
      throw new UnprocessableEntity('Carteira');
    }
    if (!brokerId) {
      throw new UnprocessableEntity('Corretora');
    }
    if (!assetId) {
      throw new UnprocessableEntity('Ativo');
    }
    if (!operation) {
      throw new UnprocessableEntity('Operação');
    }
    if (!transactionDate) {
      throw new UnprocessableEntity('Data');
    }
    if (!unitPrice) {
      throw new UnprocessableEntity('Preço unitário');
    }
    if (!quantity) {
      throw new UnprocessableEntity('Quantidade');
    }
    if (!total) {
      throw new UnprocessableEntity('Total');
    }

    if (operation < 1 || operation > 9) {
      throw new UnprocessableEntity('Operação', 'inválida, deve ser informado um valor entre 1 e 9');
    }

    const wallet = await this.walletRepo.get(user, walletId);
    if (!wallet) {
      throw new NotFound('Carteira');
    }
    const broker = await this.brokerRepo.get(user, brokerId);
    if (!broker) {
      throw new NotFound('Corretora');
    }
    const asset = await this.assetRepo.get(user, assetId);
    if (!asset) {
      throw new NotFound('Ativo');
    }

    return this.repository.create({
      wallet, broker, asset, operation, transactionDate, unitPrice, quantity, total, comment
    });
  }
}
