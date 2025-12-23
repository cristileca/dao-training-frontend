"use client";

import React, { useState, useEffect } from "react";
import { useWallet } from "@/lib/useWallet";
import { DaoTrainingService } from "@/services/dao-training-service";
import { useAuth } from "@/context/AuthContext";

interface ConnectWalletProps {
    closeAllModals?: () => void;
    onCreate?: () => void;
}

export default function ConnectWalletMnemonic({
                                                  closeAllModals,
                                                  onCreate,
                                              }: ConnectWalletProps) {
    const [password, setPassword] = useState("");
    const [mnemonic, setMnemonic] = useState("");
    const [err, setErr] = useState("");
    const [connected, setConnected] = useState(false);

    const { connectWalletWithMnemonic } = useWallet();
    const { user } = useAuth();

    const connectWallet = async () => {
        if (!password || !mnemonic) {
            setErr("Password and mnemonic are required!");
            return;
        }

        try {
            const wallet = await connectWalletWithMnemonic(mnemonic, password);

            if (!wallet?.address) {
                throw new Error("Wallet address missing");
            }

            await DaoTrainingService.createWallet(
                user?.id,
                wallet.address,
                Number(wallet.balance ?? 0)
            );

            setMnemonic("");
            setPassword("");
            setConnected(true);
            onCreate?.();
        } catch (e) {
            setErr("Failed to connect to wallet");
            console.error(e);
        }
    };

    useEffect(() => {
        if (connected) {
            closeAllModals?.();
        }
    }, [connected]);

    return (
        <div className="relative bg-[#11314a] rounded-xl shadow-lg p-6 flex flex-col items-center justify-center max-w-xl">
            {err && <p className="text-red-400 text-sm">{err}</p>}

            <label className="mt-2">Wallet password:</label>
            <input
                type="password"
                value={password}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                className="text-center my-2 mx-auto rounded border border-gray-600 px-2 py-1 w-full max-w-xs"
            />

            <label className="mt-2">Mnemonic Phrase</label>
            <input
                type="password"
                value={mnemonic}
                placeholder="Mnemonic Phrase"
                onChange={(e) => setMnemonic(e.target.value)}
                className="text-center my-2 h-10 mx-auto rounded border border-gray-600 px-2 py-1 w-full max-w-xs"
            />

            <button
                onClick={connectWallet}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600 transition-transform active:scale-95"
            >
                Connect Wallet
            </button>
        </div>
    );
}
