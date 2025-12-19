"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useGetcommissions } from "../../../../hooks/useGetCommissions";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { DaoTrainingService } from "@/services/dao-training-service";
import { User } from "@/types";
import {
  useGetWallet,
} from "../../../../hooks/useCreateWallet";
import { useQueryClient } from "@tanstack/react-query";
import Card from "@/components/@core/Card/Card";
import PaymentCard from "@/components/@core/Card/PaymentCard";
import {useWallet} from "@/lib/useWallet";
import WalletCard from "@/components/@core/Card/WalletCard";
import {WalletContext} from "@/context/WalletContext";



export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [creatingWallet, setWalletCreated] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const wallet = useGetWallet({ user: user! });
  const comm = useGetcommissions({
      user: user!,
  });
  const [display, setDisplay] = useState(false)
  const closeAllModals = () => {
        setDisplay(false);
  };

  const {...walletData} = useWallet();


  type Commission = {
    id: string;
    date: string;
    amount: string | number;
    created_at: string;
  };

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
      return;
    }
  }, [user, loading, router]);

  const list = comm?.data?.map(
    (commission: Commission, index: number) => ({id:commission.id,
      date: new Date(commission.created_at).toLocaleDateString("en-US"),
      amount: commission.amount,
      totalVolume: 961,
      received: commission.amount,
    }),
  );

  const initWallet = async () => {
    // setWalletCreated(true);
    // await DaoTrainingService.createWallet(user?.id).then(() => {
    //   setWalletCreated(false);
    // });
    // await queryClient.invalidateQueries({ queryKey: ["GET_WALLET"] });
      setDisplay(true);
  };

  const claimCommission = async (commissionId: string) => {
      await DaoTrainingService.claimCommission(commissionId);
      await queryClient.invalidateQueries({ queryKey: ["GET_COMMISSIONS"] });
      await queryClient.invalidateQueries({ queryKey: ["GET_WALLET", user?.id] });
      await wallet.refetch();
      await comm.refetch();
  }


  return (
    <div className="min-h-screen bg-[#0a2037] p-6">
      <div className="flex justify-between items-center mb-6 text-white">
        <h1 className="text-2xl font-bold">DAO Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>{user?.name}</span>

          {/*{wallet.data?.id? wallet.data?.id :*/}
          {!wallet?.data?.id && (
            <button
              onClick={() => {
                initWallet();
              }}
              className={
                "bg-[#11314a] px-3 py-1 rounded hover:bg-[#224765] transition"
              }
            >
              Create Wallet
            </button>
          )}

          {creatingWallet ? (
            <span>...Loading...</span>
          ) : (
            <span>{wallet?.data?.id}</span>
          )}

          <button
            onClick={logout}
            className="bg-[#11314a] px-3 py-1 rounded hover:bg-[#224765] transition"
          >
            Logout
          </button>
        </div>
      </div>
        {walletData?.wallet?.address && (
            <div className="flex flex-col items-center bg-gradient-to-br from-[#0e2a45] to-[#143b5c] text-white p-6 rounded-2xl shadow-lg w-[380px] m-auto mb-7 border border-[#1f4d6d]/50">

                <h3 className="text-xl font-bold mb-3 tracking-wide flex items-center gap-2">
                    <span className="text-[#ffeaa5]"> Wallet</span>
                </h3>

                <div className="w-full text-left space-y-3">

                    <div className="bg-[#102c47] border border-[#1f4d6d] p-3 rounded-lg">
                        <p className="text-xs text-gray-300 uppercase">Address</p>
                        <p className="font-mono text-sm break-all mt-1 text-[#e2f1ff]">{walletData.wallet.address}</p>
                    </div>

                    <div className="bg-[#102c47] border border-[#1f4d6d] p-3 rounded-lg">
                        <p className="text-xs text-gray-300 uppercase">Balance</p>
                        <p className="text-lg font-semibold text-[#79ffb7] mt-1">
                            {walletData.wallet.balance ?? "0"} ETH
                        </p>
                    </div>

                    <div className="flex justify-between gap-3 mt-4">
                        <button className="flex-1 bg-[#1f5e85] hover:bg-[#2b7ba8] py-2 rounded-lg text-sm font-semibold transition">
                            Deposit
                        </button>
                        <button className="flex-1 bg-[#1f5e85] hover:bg-[#2b7ba8] py-2 rounded-lg text-sm font-semibold transition">
                            Withdraw
                        </button>
                    </div>
                </div>
            </div>
        )}

        {display &&
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">

        <button
            className="absolute top-3 right-3 text-white hover:text-red-400"
            onClick={() => {closeAllModals()}}
        >
            ✕
        </button>
            <WalletCard
                name={wallet?.data?.id}
                value={wallet?.data?.balance}
                display={display}
                closeAllModals={closeAllModals}
            />
        </div>
        }

      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          <div className="bg-[#11314a] rounded-xl p-4 text-white">
            <h2 className="font-bold mb-4">Latest Commissions</h2>
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="w-[102px] pb-2">Date</th>
                  <th className="w-[132px] pb-2">Amount</th>
                  <th className="pb-2">Total Volume</th>
                  <th className="pb-2">Commissions Received</th>
                  <th className="pb-2">TX Link</th>
                </tr>
              </thead>

              <tbody>
                {comm.isPending || comm.isFetching && (
                  <tr>
                    <td colSpan={5} className="py-2">
                      <Skeleton
                        height={43}
                        count={6}
                        baseColor="#1f3b57"
                        highlightColor="#2f5d80"
                      />
                    </td>
                  </tr>
                )}

                {comm.isSuccess && (
                  <>
                    {list.map((c: Commission, idx: number) => (
                      <tr key={idx} className="border-b border-gray-700">
                        <td className="py-2">{c.date}</td>
                        <td className="py-2">{c.amount}</td>
                        <td className="py-2">{c.totalVolume}</td>
                        <td className="py-2">{c.received}</td>
                        <td className="py-2">
                          <button onClick={() => claimCommission(c.id)} className="bg-[#224765] px-2 py-1 rounded hover:bg-[#477e9e] transition">
                            Claim
                          </button>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
