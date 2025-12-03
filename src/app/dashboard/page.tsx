"use client";

import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
            <div className="bg-white p-4 rounded-xl shadow text-center space-y-2">
                <h1 className="text-2xl font-bold">🎉 Welcome!</h1>

                {user && <p className="text-sm text-gray-700"><b>User:</b> {user.name} ({user.email})</p>}

                <button onClick={logout} className="mt-3 bg-black text-white px-4 py-2 rounded-lg text-xs">
                    Logout
                </button>
            </div>
        </div>
    );
}
