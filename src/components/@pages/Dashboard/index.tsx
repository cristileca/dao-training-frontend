"use client";

import { useEffect, useState } from "react";
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

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();
  const [creatingWallet, setWalletCreated] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const wallet = useGetWallet({ user: user! });
  const comm = useGetcommissions({
      user: user!,
  });


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
    setWalletCreated(true);
    await DaoTrainingService.createWallet(user?.id).then(() => {
      setWalletCreated(false);
    });
    await queryClient.invalidateQueries({ queryKey: ["GET_WALLET"] });
  };
    console.log(wallet);

  const claimCommission = async (commissionId: string) => {
      await DaoTrainingService.claimCommission(commissionId);
      await queryClient.invalidateQueries({ queryKey: ["GET_COMMISSIONS"] });
      await queryClient.invalidateQueries({ queryKey: ["GET_WALLET", user?.id] });
      await wallet.refetch();
      await comm.refetch();
      console.log(comm.data);
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
        {wallet ?
        <div className="flex items-center bg-[#10314a] flex-col  m-auto w-[30%] mb-7 rounded-md ">
            <h3 className={"m-2"}>Wallet</h3>
            <Card name={wallet?.data?.id} value={wallet?.data?.balance} />
        </div> : ""
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
