import { useContext } from "react";
import { WalletContext, WalletState } from "@/context/WalletContext";
import { WalletService } from "@/services/wallet-service";
import { Wallet as EthersWallet, ethers } from "ethers";

export const useWallet = () => {
    const context = useContext(WalletContext);
    if (!context) throw new Error("useWallet must be used within a WalletProvider");

    const { wallet, setWallet } = context;

    const create = async (password: string) => {
        const newWallet = WalletService.createRandomWallet();
        const encrypted = await WalletService.encrypt(newWallet, password);
        const mnemonic = newWallet.mnemonic?.phrase;

        const walletState: WalletState = {
            address: newWallet.address,
            encrypted,
            balance:"0",
        };

        setWallet(walletState);

        sessionStorage.setItem("DaoTestWallet", JSON.stringify(walletState));

        return { ...walletState, mnemonic };
    };


    const signTx = async (encrypted: string, password: string) => {
        const decrypted: EthersWallet = await WalletService.decrypt(encrypted, password);

        const walletState: WalletState = {
            address: decrypted.address,
            encrypted,
        };


        setWallet(walletState);
    };

    const connectWalletWithMnemonic = async (mnemonicPhrase: string, password: string) => {
        const Wallet = WalletService.fromMnemonic(mnemonicPhrase);
        const encrypted = await WalletService.encrypt(Wallet, password);
        const mnemonic = Wallet.mnemonic?.phrase;

        getBalance(Wallet.address);

        const walletState: WalletState = {
            address: Wallet.address,
            encrypted,
        };

        await setWallet(walletState);

        sessionStorage.setItem("DaoTestWallet", JSON.stringify(walletState));

        return { ...walletState, mnemonic };
    }

    const connectWalletWithPk = async (privateKey: string, password: string) => {
        const Wallet = WalletService.fromPrivateKey(privateKey);
        const encrypted = await WalletService.encrypt(Wallet, password);
        const mnemonic = Wallet.mnemonic?.phrase;

        const balance = await getBalance(Wallet.address);

        const walletState: WalletState = {
            address: Wallet.address,
            encrypted,
            balance:balance,
        };


        setWallet(walletState);

        sessionStorage.setItem("DaoTestWallet", JSON.stringify(walletState));

        return { ...walletState, mnemonic };
    }

   const getBalance = async (address: string)=> {
        const provider = new ethers.JsonRpcProvider("https://ethereum-sepolia.rpc.subquery.network/public");
        const balance = await provider.getBalance(address);
        return ethers.formatEther(balance);
    }

    return { wallet, create, signTx, connectWalletWithMnemonic, connectWalletWithPk, getBalance };
};
