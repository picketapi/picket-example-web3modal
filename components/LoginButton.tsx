import { LockClosedIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import { useAccount } from "wagmi";

import { useWagmiAuth, LoginStatus } from "@/lib/hooks";

export default function LoginButton() {
  const { isConnected } = useAccount();
  const { login, status, logout } = useWagmiAuth({
    autoLogout: true,
  });

  if (!isConnected) return null;

  return (
    <div className="w-full">
      <p className="pb-2 text-center text-sm text-gray-600">
        {status !== LoginStatus.Success && (
          <span>You&apos;re connected. Click the button below to sign in.</span>
        )}
        {status === LoginStatus.Success && (
          <span>
            You&apos;re signed in. Click{" "}
            <button className="underline" onClick={logout}>
              here
            </button>{" "}
            to log out.
          </span>
        )}
      </p>
      <button
        onClick={login}
        disabled={status !== LoginStatus.None && status !== LoginStatus.Error}
        className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#3496ff] py-2.5 px-4 text-sm font-medium text-white hover:bg-[#0f7df2] focus:outline-none focus:ring-2 focus:ring-[#0f7df2] focus:ring-offset-2"
      >
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          {status !== LoginStatus.Success && (
            <LockClosedIcon
              className="h-5 w-5 text-[white] group-hover:text-gray-50"
              aria-hidden="true"
            />
          )}
          {status === LoginStatus.Success && (
            <CheckCircleIcon
              className="h-5 w-5 text-[white] group-hover:text-gray-50"
              aria-hidden="true"
            />
          )}
        </span>
        {(status === LoginStatus.None || status === LoginStatus.Error) &&
          "Sign in with Ethereum"}
        {status === LoginStatus.Signature && "Waiting for Signature..."}
        {status === LoginStatus.Auth && "Authenticating..."}
        {status === LoginStatus.Success && "You are logged in!"}
      </button>
      {status === LoginStatus.Error && (
        <div className="pt-2 text-red-500">Something went wrong</div>
      )}
    </div>
  );
}
