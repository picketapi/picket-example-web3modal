import "@/styles/globals.css";
import type { AppProps } from "next/app";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";

import { Web3Modal } from "@web3modal/react";

import { configureChains, createClient, WagmiConfig } from "wagmi";

import { arbitrum, mainnet, polygon } from "wagmi/chains";

import { PicketProvider } from "@picketapi/picket-react";

const chains = [arbitrum, mainnet, polygon];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
  }),
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID || "",
    version: "1", // or "2"
    appName: "web3Modal",
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <PicketProvider apiKey={process.env.NEXT_PUBLIC_PICKET_API_KEY || ""}>
        <WagmiConfig client={wagmiClient}>
          <Component {...pageProps} />
        </WagmiConfig>
      </PicketProvider>
      <Web3Modal
        projectId={process.env.NEXT_PUBLIC_PROJECT_ID || ""}
        ethereumClient={ethereumClient}
      />
    </>
  );
}
