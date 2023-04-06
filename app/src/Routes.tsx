import React from 'react';
import { RoutePath } from './RoutePath';
import Home from './pages/Home';
import AssetList from './pages/assets/List';
import AssetEdit from './pages/assets/Edit';
import AssetNew from './pages/assets/New';
import BrokerList from './pages/brokers/List';
import BrokerEdit from './pages/brokers/Edit';
import BrokerNew from './pages/brokers/New';
import TransactionNew from './pages/transactions/New';
import TransactionList from './pages/transactions/List';

export function getRoutes(): { path: string, render: () => JSX.Element }[] {
  return [
    { path: RoutePath.HOME, render: () => <Home /> },
    { path: RoutePath.ASSETS, render: () => <AssetList /> },
    { path: RoutePath.ASSET_EDIT, render: () => <AssetEdit /> },
    { path: RoutePath.ASSET_NEW, render: () => <AssetNew /> },
    { path: RoutePath.BROKERS, render: () => <BrokerList /> },
    { path: RoutePath.BROKER_EDIT, render: () => <BrokerEdit /> },
    { path: RoutePath.BROKER_NEW, render: () => <BrokerNew /> },
    { path: RoutePath.TRANSACTIONS, render: () => <TransactionList /> },
    { path: RoutePath.TRANSACTION_NEW, render: () => <TransactionNew /> }
  ];
}
