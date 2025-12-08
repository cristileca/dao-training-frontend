"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/types";

type AuthContextType = {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch user on page load to persist session
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch("http://localhost:8000/api/user", {
                    credentials: "include",
                });
                if (res.ok) {
                    const data: User = await res.json();
                    setUser(data);
                } else {
                    setUser(null);
                }
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const login = async (email: string, password: string) => {
        // Get CSRF cookie first
        const xsrfToken = decodeURIComponent(
            document.cookie
                .split("; ")
                .find(row => row.startsWith("XSRF-TOKEN="))
                ?.split("=")[1] || ""
        );

        const res = await fetch("http://localhost:8000/api/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-XSRF-TOKEN": xsrfToken,
            },
            body: JSON.stringify({ email, password }),
        });

        if (!res.ok) throw new Error("Invalid credentials");

        const userRes = await fetch("http://localhost:8000/api/user", {
            credentials: "include",
        });

        if (!userRes.ok) throw new Error("Failed to fetch user");

        const userData: User = await userRes.json();
        setUser(userData);
        router.push("/dashboard");
    };

    const logout = async () => {
        const xsrfToken = decodeURIComponent(
            document.cookie
                .split("; ")
                .find(row => row.startsWith("XSRF-TOKEN="))
                ?.split("=")[1] || ""
        );

        await fetch("http://localhost:8000/api/logout", {
            method: "POST",
            credentials: "include",
            headers: {
                "X-XSRF-TOKEN": xsrfToken, // Laravel expects this header
                "Content-Type": "application/json",
            },
        });

        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};
