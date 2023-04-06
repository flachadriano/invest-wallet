import Asset from './Asset';
import Broker from './Broker';
import Wallet from './Wallet';

export default interface Transaction {
  id: number;
  wallet: Wallet;
  asset: Asset;
  broker: Broker;
  operation: number;
  transactionDate: string;
  quantity: number;
  unitPrice: number;
  total: number;
  comment: string;
}
