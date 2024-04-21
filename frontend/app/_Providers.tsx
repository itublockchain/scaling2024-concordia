"use client";
// Replace this with any of the networks listed at https://viem.sh/docs/clients/chains.html
import {
  base,
  baseGoerli,
  mainnet,
  sepolia,
  polygon,
  polygonMumbai,
} from "viem/chains";

import { PrivyProvider } from "@privy-io/react-auth";
import { createContext } from "react";

export const LoadingContext = createContext(null);

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId="clv2imcvj0cibq4ygimrot8a4"
      config={{
        appearance: {
          theme: "light",
          accentColor: "#676FFF",
          logo: "https://your-logo-url",
        },
        defaultChain: sepolia,
        supportedChains: [sepolia],
        embeddedWallets: {
          createOnLogin: "off",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
