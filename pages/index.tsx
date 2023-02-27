import Head from "next/head";
import Image from "next/image";

import { Web3Button } from "@web3modal/react";
import { useAccount } from "wagmi";

import LoginButton from "@/components/LoginButton";

export default function Home() {
  const { isConnected } = useAccount();

  return (
    <>
      <Head>
        <title>Web3Modal + Picket </title>
        <meta
          name="description"
          content="An example app using Picket and Web3Modal"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen bg-gray-50">
        <div className="flex min-h-full items-center justify-center py-20 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-sm space-y-8">
            <div className="flex flex-col items-center">
              <a href="https://walletconnect.com">
                <Image
                  alt="WalletConnect logotype"
                  src="https://cloud.walletconnect.com/images/walletconnect-logo.svg"
                  width="215"
                  height="35"
                  decoding="async"
                  data-nimg="1"
                  loading="lazy"
                  style={{
                    color: "transparent",
                  }}
                />
              </a>
              <h2 className="mt-12 text-center text-3xl font-bold tracking-tight text-gray-900">
                {!isConnected && "Connect Wallet"}
                {isConnected && "Sign In"}
              </h2>
            </div>

            <div className="flex flex-col items-center space-y-8">
              <Web3Button />
              <LoginButton />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
