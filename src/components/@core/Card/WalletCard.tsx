'use client'

import React, {useState} from "react";
import {useWallet} from "@/lib/useWallet";
import {WalletService} from "@/services/wallet-service";
import {
    GenerateWalletMnemonic
} from "@/components/@core/Card/CreateWallet/GenerateWalletMnemonic";
import ConnectWalletMnemonic from "@/components/@core/Card/CreateWallet/ConnectWalletMnemonic";
import ConnectWalletPk from "@/components/@core/Card/CreateWallet/ConnectWalletPk";

interface CardProps {
    name: string;
    value: string | number;
    display:boolean
    children?: React.ReactNode;
    closeAllModals?: () => void;
    onCreate: () => void;
}

export default function WalletCard({ name, value, children, closeAllModals, onCreate }: CardProps) {
    const [step, setStep]= useState(0);

    if(step === 0) {
    return (
        <div className="relative bg-[#11314a] rounded-xl shadow-lg p-6 flex flex-col items-center justify-center w-[80%] max-w-xl">

            <div className="flex flex-col gap-4 w-full text-white">

                <button
                    onClick={() => setStep(1)}
                    className="w-full bg-[#1c4d6d] hover:bg-[#1f5e85] text-white font-semibold py-2 px-4 rounded-lg shadow transition-all duration-200"
                >
                    Create New Wallet
                </button>

                <button
                    onClick={() => setStep(2)}
                    className="w-full bg-[#1c4d6d] hover:bg-[#1f5e85] text-white font-semibold py-2 px-4 rounded-lg shadow transition-all duration-200"
                >
                    Import Wallet using Mnemonic phrase
                </button>

                <button
                    onClick={() => setStep(3)}
                    className="w-full bg-[#1c4d6d] hover:bg-[#1f5e85] text-white font-semibold py-2 px-4 rounded-lg shadow transition-all duration-200"
                >
                    Import Wallet using Private Key
                </button>

            </div>

            {children}
        </div>

    );}

    if(step === 1) {
        return (
           <GenerateWalletMnemonic onCreate={onCreate} closeAllModals={closeAllModals}/>
        )
    }

    if(step === 2) {
        return (
            <ConnectWalletMnemonic onCreate={onCreate} closeAllModals={closeAllModals}/>
        )
    }

    if(step === 3) {
        return (
            <ConnectWalletPk onCreate={onCreate} closeAllModals={closeAllModals}/>
        )
    }
}
