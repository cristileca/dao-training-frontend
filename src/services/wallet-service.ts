import {Wallet} from "ethers";

export const WalletService = {
    createRandomWallet: () => Wallet.createRandom(),

    fromMnemonic: (mnemonic: string) => Wallet.fromPhrase(mnemonic),

    fromPrivateKey: (pk) => new Wallet(pk),

    encrypt: (wallet: Wallet, password: string) => wallet.encrypt(password),

    decrypt: async (encryptedJson: string, password: string) =>
        Wallet.fromEncryptedJson(encryptedJson, password),
}