import Image from '@/components/ui/image';
import metamaskLogo from '@/assets/images/metamask.svg';
import trustLogo from '@/assets/images/TWT.svg';
import { useModal } from '@/components/modal-views/context';

import { useContext, useEffect } from 'react';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { useAccount, useConnect, useSignMessage, useDisconnect } from 'wagmi';
import { useRouter } from 'next/router';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { InjectedConnector } from 'wagmi/connectors/injected';

export default function SelectWallet({ ...props }) {
  const { address, isConnected, isConnecting } = useAccount();
  const { closeModal } = useModal();

  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const { signMessageAsync } = useSignMessage();
  const { push } = useRouter();
  useEffect(() => {
    if (address) closeModal();
  }, [address, closeModal]);

  const metamask = async () => {
    if (isConnected) {
      await disconnectAsync();
     
    }

    const { account, chain } = await connectAsync({
      connector: new MetaMaskConnector(),
    });
  };

  const walletConnect = async () => {
    if (isConnected) {
      await disconnectAsync();
    }

    const { account, chain } = await connectAsync({
      connector: new InjectedConnector(),
    });
  };

  return (
    <div
      className="relative z-50 mx-auto w-[440px] max-w-full rounded-lg bg-white px-9 py-16 dark:bg-light-dark"
      {...props}
    >
      <h2 className="mb-4 text-center text-2xl font-medium uppercase text-gray-900 dark:text-white">
        Connect Wallet
      </h2>
      <p className="text-center text-sm leading-loose tracking-tight text-gray-600 dark:text-gray-400">
        By connecting your wallet, you agree to our Terms of Service and our
        Privacy Policy.
      </p>

      <div
        className="mt-12 flex h-14 w-full cursor-pointer items-center justify-between rounded-lg bg-gradient-to-l from-[#ffdc24] to-[#ff5c00] px-4 text-base text-white transition-all hover:-translate-y-0.5"
        onClick={() => metamask()}
      >
        <span>MetaMask</span>
        <span className="h-auto w-9">
          <Image src={metamaskLogo} alt="metamask" />
        </span>
      </div>

      <div
        className="mt-12 flex h-14 w-full cursor-pointer items-center justify-between rounded-lg bg-gradient-to-l from-[#094a8f] to-[#196ed4] px-4 text-base text-white transition-all hover:-translate-y-0.5"
        onClick={() => walletConnect()}
      >
        <span>Trust Wallet</span>
        <span className="h-auto w-9">
          <Image src={trustLogo} alt="metamask" />
        </span>
      </div>
    </div>
  );
}
