"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import {useGetcommissions} from "../../../../hooks/useGetCommissions";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {DaoTrainingService} from "@/services/dao-training-service";
import {User} from "@/types";

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  type Commission = {
    id: string;
    date: string;
    amount: string | number;
    created_at: string;
  };

    const comm = useGetcommissions({
        user: user!
    })

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.push("/login");
      return;
    }
  }, [user, loading, router])


    const list = comm?.data?.commissions?.map((commission: Commission, index: number) => ({
    date: new Date(commission.created_at).toLocaleDateString('en-US'),
    amount: commission.amount,
    totalVolume: 961,
    received: commission.amount,
  }));


  // const commissionsList = [
  //   {
  //     date: "22 Oct 2024",
  //     amount: "20 USDT",
  //     totalVolume: 961,
  //     received: "280 USDT",
  //   },
  //   {
  //     date: "22 Oct 2024",
  //     amount: "20 USDT",
  //     totalVolume: 961,
  //     received: "280 USDT",
  //   },
  //   {
  //     date: "22 Oct 2024",
  //     amount: "20 USDT",
  //     totalVolume: 961,
  //     received: "280 USDT",
  //   },
  //   {
  //     date: "22 Oct 2024",
  //     amount: "20 USDT",
  //     totalVolume: 961,
  //     received: "280 USDT",
  //   },
  //   {
  //     date: "22 Oct 2024",
  //     amount: "20 USDT",
  //     totalVolume: 961,
  //     received: "280 USDT",
  //   },
  // ];
    const initWallet = async () => {
        await DaoTrainingService.createWallet(user?.id);
    };

    const commissionsN = list?.length;
    console.log(commissionsN)
  // if (loading || !user) return <div className="text-white p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#0a2037] p-6">
      <div className="flex justify-between items-center mb-6 text-white">
        <h1 className="text-2xl font-bold">DAO Dashboard</h1>
        <div className="flex items-center gap-4">
          <span>{user?.name}</span>
          <button
            onClick={logout}
            className="bg-[#11314a] px-3 py-1 rounded hover:bg-[#224765] transition"
          >
            Logout
          </button>
        </div>
      </div>

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
                {comm.isPending && (
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
                        {list.map((c:Commission, idx:number) => (
                            <tr key={idx} className="border-b border-gray-700">
                                <td className="py-2">{c.date}</td>
                                <td className="py-2">{c.amount}</td>
                                <td className="py-2">{c.totalVolume}</td>
                                <td className="py-2">{c.received}</td>
                                <td className="py-2">
                                    <button className="bg-[#224765] px-2 py-1 rounded hover:bg-[#477e9e] transition">
                                        View
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
