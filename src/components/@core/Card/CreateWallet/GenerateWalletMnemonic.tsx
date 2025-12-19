"use client";

import React, {useState} from "react";
import {useWallet} from "@/lib/useWallet";



interface GenerateWalletProps {
    closeAllModals?: () => void;
}

export default function GenerateWalletMnemonic({closeAllModals}:GenerateWalletProps) {
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [mnemonic, setMnemonic] = useState("");
    const [displayMnemonic, setDisplayMnemonic] = useState(false);
    const [countdown, setCountdown] = useState(10);
    const [mnemonicCopied, setMnemonicCopied] = useState(false);

    const {create} = useWallet();


    const createWallet = async (password: string) => {
        if (!password) {
            setErr("Password field is required!");
            return;
        }

        try {
            const response = await create(password);

            if (response?.mnemonic) {
                setMnemonic(response.mnemonic);
                setDisplayMnemonic(true);
                setCountdown(10);

                const interval = setInterval(() => {
                    setCountdown((prev) => {
                        if (prev <= 1) {
                            clearInterval(interval);
                            setDisplayMnemonic(false);
                            if (closeAllModals) {
                                closeAllModals();
                                setMnemonic("")
                            }
                            return 0;
                        }
                        return prev - 1;
                    });
                }, 1000);
            }
        } catch (e) {
            setErr("Failed to create wallet");
            console.error(e);
        }
    };
    const copyMnemonic = async (mnemonic: string) => {
        navigator.clipboard.writeText(mnemonic);
        setMnemonicCopied(true);
    }
    return (
        <>
                <div
                    className="relative bg-[#11314a] rounded-xl shadow-lg p-6 flex flex-col items-center justify-center  max-w-xl">

                    {err && <p className="text-red-400 text-sm">{err}</p>}

                    <label className="mt-2">Wallet password:</label>
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="text-center my-2 mx-auto rounded border border-gray-600 px-2 py-1 w-full max-w-xs"
                    />

                    <button
                        onClick={async () => createWallet(password)}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600 transition-transform active:scale-95"
                    >
                        Create New Wallet
                    </button>
                </div>
            {displayMnemonic && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
                    <div
                        className="relative bg-[#11314a] rounded-xl shadow-lg p-6 flex flex-col items-center justify-center w-[80%] max-w-md text-center">
                        <button
                            className="absolute top-3 right-3 text-white hover:text-red-400 text-2xl"
                            onClick={() => {
                                if (closeAllModals) {
                                    closeAllModals();
                                } setMnemonic("")}}
                        >
                            ✕
                        </button>

                        <p className="text-[#ffeaa5] mb-2">Your Mnemonic Phrase</p>
                        <div onClick={() => copyMnemonic(mnemonic)} className="flex flex-col items-center justify-center my-5 rounded-md p-5 bg-gray-600  max-w-xl">
                            <h2 className="text-white font-bold text-lg break-words">{mnemonic}</h2>
                        </div>
                        <p className="text-sm text-white/70 mt-4">
                            This will disappear in {countdown} second{countdown !== 1 ? "s" : ""}
                        </p>
                        {mnemonicCopied &&
                            <span className="text-[14px] font-bold text-slate-400">Mnemonic Copied to clipboard</span>
                        }
                        <button
                            onClick={() => navigator.clipboard.writeText(mnemonic)}
                            className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white"
                        >
                            Copy to Clipboard
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
