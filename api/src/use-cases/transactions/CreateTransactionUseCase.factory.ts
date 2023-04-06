import { Asset } from '../../entities/Asset';
import { Broker } from '../../entities/Broker';
import { Wallet } from '../../entities/Wallet';

export const getNewTransactionData = (wallet: Wallet, broker: Broker, asset: Asset) => ({
  walletId: wallet.id,
  brokerId: broker.id,
  assetId: asset.id,
  operation: 1,
  transactionDate: new Date(),
  unitPrice: 2.34,
  quantity: 10,
  total: 23.4,
  comment: undefined
});
