import { useState } from "react";

import Picket from "@picketapi/picket-js";

import { useAccount, useSigner } from "wagmi";

import { LockClosedIcon } from "@heroicons/react/20/solid";

enum State {
  Sign = "Sign",
  Signature = "Signature",
  Auth = "Auth",
  Success = "Success",
  Error = "Error",
}

const picket = new Picket(process.env.NEXT_PUBLIC_PICKET_API_KEY || "");

export default function LoginButton() {
  const { isConnected, address } = useAccount();
  const { data: signer } = useSigner();
  const [state, setState] = useState(State.Sign);

  const login = async () => {
    if (!(isConnected && address && signer)) return;

    setState(State.Signature);
    try {
      const { nonce, statement, format } = await picket.nonce({
        walletAddress: address,
        chain: "ethereum",
        locale: navigator?.language,
      });

      const domain = window.location.host;
      const uri = window.location.origin;
      const issuedAt = new Date().toISOString();

      const context = {
        domain,
        uri,
        issuedAt,
        chainId: 1,
        chainType: "ethereum",
        locale: navigator?.language,
      };

      const message = Picket.createSigningMessage({
        nonce,
        walletAddress: address,
        statement,
        format,
        ...context,
      });

      const signature = await signer.signMessage(message);
      setState(State.Auth);

      const { accessToken } = await picket.auth({
        walletAddress: address,
        signature,
        context,
      });
      setState(State.Success);

      // Now you can use the access token to authenticate with your backend
    } catch (err) {
      console.error(err);
      setState(State.Error);
    }
  };

  return (
    <>
      <button
        onClick={login}
        className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#3496ff] py-2.5 px-4 text-sm font-medium text-white hover:bg-[#0f7df2] focus:outline-none focus:ring-2 focus:ring-[#0f7df2] focus:ring-offset-2"
      >
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <LockClosedIcon
            className="h-5 w-5 text-[white] group-hover:text-gray-50"
            aria-hidden="true"
          />
        </span>
        {(state === State.Sign || state === State.Error) &&
          "Sign in with Ethereum"}
        {state === State.Signature && "Waiting for Signature..."}
        {state === State.Auth && "Authenticating..."}
        {state === State.Success && "You are logged in!"}
      </button>
      {state === State.Error && (
        <div className="text-red-500">Something went wrong</div>
      )}
    </>
  );
}
