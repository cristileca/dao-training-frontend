"use client";

import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const { user, logout, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    const commissions = [
        { date: "22 Oct 2024", amount: "20 USDT", totalVolume: 961, received: "280 USDT" },
        { date: "22 Oct 2024", amount: "20 USDT", totalVolume: 961, received: "280 USDT" },
        { date: "22 Oct 2024", amount: "20 USDT", totalVolume: 961, received: "280 USDT" },
        { date: "22 Oct 2024", amount: "20 USDT", totalVolume: 961, received: "280 USDT" },
        { date: "22 Oct 2024", amount: "20 USDT", totalVolume: 961, received: "280 USDT" },
    ];

    if (loading || !user) return <div className="text-white p-6">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#0a2037] p-6">
            <div className="flex justify-between items-center mb-6 text-white">
                <h1 className="text-2xl font-bold">DAO Dashboard</h1>
                <div className="flex items-center gap-4">
                    <span>{user.name}</span>
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
                                <th className="pb-2">Date</th>
                                <th className="pb-2">Amount</th>
                                <th className="pb-2">Total Volume</th>
                                <th className="pb-2">Commissions Received</th>
                                <th className="pb-2">TX Link</th>
                            </tr>
                            </thead>
                            <tbody>
                            {commissions.map((c, idx) => (
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
