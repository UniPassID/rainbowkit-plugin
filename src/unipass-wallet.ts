import { Chain, Wallet } from '@rainbow-me/rainbowkit';
import { UniPassProviderOptions } from '@unipasswallet/ethereum-provider';
import { UniPassConnector } from './unipass-connector';

export interface MyWalletOptions {
  chains: Chain[];
  options: UniPassProviderOptions;
}

export const unipassWallet = ({ chains, options }: MyWalletOptions): Wallet => ({
  id: 'unipass',
  name: 'UniPass',
  iconUrl: 'https://lay2-wallet-frontend.s3.ap-southeast-1.amazonaws.com/images/icon.svg',
  iconBackground: '#fff',
  downloadUrls: {
    browserExtension: 'https://unipass.id',
  },
  createConnector: () => {
    const connector = new UniPassConnector({
      chains,
      options,
    });

    return {
      connector,
      mobile: {
        getUri: async () => {
          try {
            await connector.connect();
          } catch (e) {
            console.error('Failed to connect');
          }
          return '';
        },
      },
      desktop: {
        getUri: async () => {
          try {
            await connector.connect();
          } catch (e) {
            console.error('Failed to connect');
          }
          return '';
        },
      },
    };
  },
});
