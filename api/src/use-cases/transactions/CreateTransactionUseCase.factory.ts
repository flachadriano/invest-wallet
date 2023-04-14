import { Asset } from '../../entities/Asset';
import { Broker } from '../../entities/Broker';

export const getNewTransactionData = (broker: Broker, asset: Asset) => ({
  brokerId: broker.id,
  assetId: asset.id,
  operation: 1,
  transactionDate: new Date(),
  unitPrice: 2.34,
  quantity: 10,
  total: 23.4,
  comment: undefined
});
