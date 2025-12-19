"use client";

import React, {useState} from "react";
import {useWallet} from "@/lib/useWallet";




interface ConnectWalletProps {
    closeAllModals?: () => void;
}

export default function ConnectWalletPk({closeAllModals}:ConnectWalletProps) {
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [privateKey, setPrivateKey] = useState("");

    const {connectWalletWithPk} = useWallet();


    const connectWallet = async () => {
        if (!password) {
            setErr("Password field is required!");
            return;
        }

        try {
            await connectWalletWithPk(privateKey, password);
            setPrivateKey("");
            if (closeAllModals) {
                closeAllModals();
            }
        } catch (e) {
            setErr("Failed to connect to wallet");
            console.error(e);
        }
    };

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
                <label className="mt-2">PrivateKey</label>
                <input
                    type="password"
                    value={privateKey}
                    placeholder="Private Key"
                    onChange={(e) => setPrivateKey(e.target.value)}
                    className="text-center my-2 h-10 mx-auto rounded border border-gray-600 px-2 py-1 w-full max-w-xs"
                />

                <button
                    onClick={async () => connectWallet()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600 transition-transform active:scale-95"
                >
                    Connect Wallet
                </button>
            </div>
        </>
    );
}
