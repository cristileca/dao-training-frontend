"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
    const router = useRouter();
    const token = localStorage.getItem("token");

    return (
        <main className="min-h-screen grid place-items-center bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold">Mai Centralized DAO</h1>
                <p className="text-sm opacity-80">Mock login enabled — backend coming soon</p>

                {token ? (
                    <button onClick={() => router.push("/dashboard")} className="bg-white text-black px-5 py-2 rounded-lg text-sm font-medium">
                        Open Dashboard
                    </button>
                ) : (
                    <button onClick={() => router.push("/login")} className="bg-white text-black px-5 py-2 rounded-lg text-sm font-medium">
                        Login / Register
                    </button>
                )}
            </div>
        </main>
    );
}
