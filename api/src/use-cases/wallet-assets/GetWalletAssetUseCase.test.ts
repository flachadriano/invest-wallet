import { beforeEach, describe, expect, test } from 'vitest';
import { WalletAssetRepositoryInMemory } from '../../repositories/in-memory/WalletAssetRepositoryInMemory';
import { GetWalletAssetUseCase } from './GetWalletAssetUseCase';
import { createUserFactory, createUserFactoryAnother } from '../users/CreateUserUseCase.factory';
import { createWalletAnotherFactory, createWalletFactory } from '../wallets/CreateWalletUseCase.factory';
import { createWalletAssetFactory } from './CreateWalletAssetUseCase.factory';
import { Wallet } from '../../entities/Wallet';
import { WalletAsset } from '../../entities/WalletAsset';
import { NotFound } from '../errors/NotFound';
import { IWalletAssetRepository } from '../../repositories/interfaces/IWalletAssetRepository';

describe('WHEN get an Wallet Asset', () => {
  let useCase: GetWalletAssetUseCase;
  let repo: IWalletAssetRepository;
  let wallet: Wallet;
  let walletAsset: WalletAsset;

  beforeEach(async () => {
    repo = new WalletAssetRepositoryInMemory();
    wallet = await createWalletFactory();
    walletAsset = await createWalletAssetFactory(repo, await createUserFactory(), wallet);
    useCase = new GetWalletAssetUseCase(repo);
  });

  test('WITH valid data', () => {
    expect(useCase.execute(wallet, walletAsset.id)).resolves.toBeInstanceOf(WalletAsset);
  });

  test('WITH invalid data', () => {
    expect(useCase.execute(wallet, 999999)).rejects.toBeInstanceOf(NotFound);
  });

  test('WITH another user valid data', async () => {
    const anotherWallet = await createWalletAnotherFactory();
    walletAsset = await createWalletAssetFactory(
      repo,
      await createUserFactoryAnother(),
      anotherWallet
    );
    expect(useCase.execute(wallet, 999999)).rejects.toBeInstanceOf(NotFound);
  });
});
