import { createContext, useState, ReactNode } from "react";

export interface WalletState {
    address: string;
    encrypted: string;
    balance: string;
}

interface WalletContextType {
    wallet: WalletState | null;
    setWallet: (wallet: WalletState | null) => void;
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
    const [wallet, setWallet] = useState<WalletState | null>(null);

    return (
        <WalletContext.Provider value={{ wallet, setWallet }}>
            {children}
        </WalletContext.Provider>
    );
}
