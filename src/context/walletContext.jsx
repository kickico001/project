import React, { createContext, useContext, useEffect, useState } from 'react';
import { Lucid, Blockfrost } from "https://unpkg.com/lucid-cardano/web/mod.js"
import axios from 'axios';
import { toast } from 'react-toastify';
const WalletContext = createContext({});

const { cardano } = window;
export const WalletProvider = ({ children }) => {
    const [account, setAccount] = useState(false);
    const [address, setAddress] = useState('');
    const [balance, setBalance] = useState(0);
    const [lucid, setLucid] = useState(null);
    useEffect(() => {
        initWallet();
    }, [])
    const initWallet = () => {
        if (cardano && cardano.nami) {
            connectToNami();
        } else {
            window.alert('Install Nami Wallet');
        }
    }
    const connectToNami = async () => {
        try {
            const lucid = await Lucid.new(
                new Blockfrost("https://cardano-mainnet.blockfrost.io/api/v0/", "mainnetuE7K083WTQTQXf6N8OdK9cJmWkxCY2jH"),
                "Mainnet",
            );
            const account = await cardano.nami.enable();
            lucid.selectWallet(account);
            setLucid(lucid);
            const address = await lucid.wallet.address()
            setAccount(account);
            setAddress(address);
            getBalance(address);
        } catch (error) {
            toast.error(`Error connecting to wallet: ${error}`);
        }
    };
    const getBalance = async (address) => {
        try {
            const response = await axios.get(`https://api.cardanoscan.io/api/v1/address/balance?address=${address}`, {
                headers: {
                    "Accept": "application/json",
                    "apiKey": "a9e67956-693a-4a29-8236-b161b1335de4"
                }
            });
            const data = response.data.balance;
            setBalance(data);
        } catch (error) {
            console.log(error);
        }

    }
    const sendTransaction = async (receiveAddress, tokenAmount) => {
        try {
            const tx = await lucid.newTx()
                .payToAddress(receiveAddress, { lovelace: Number(tokenAmount) * 1000000 }).complete();
            const signedTx = await tx.sign().complete();
            await signedTx.submit();
            toast.success('Successfully sent!');
            getBalance(address);
        } catch (error) {
            console.log(error);
           toast.error(error);
        }
    }
    const DisconnectWallet = () => {
        setAccount(false);
        setAddress(false);
        setBalance(0);
    }
    return (
        <WalletContext.Provider value={{
            initWallet,
            account,
            balance,
            address,
            DisconnectWallet,
            sendTransaction
        }}>
            {children}
        </WalletContext.Provider>
    )
}

export const WALLETCONTEXT = () => useContext(WalletContext);