"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { mockLogin, mockRegister, MockUser } from "@/lib/mockAuth";
import { useRouter } from "next/navigation";

type AuthContextType = {
    user: { name: string; email: string } | null;
    token: string | null;
    register: (name: string, email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [token, setToken] = useState<string | null>(null);

    // load persistent mock session
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedToken = localStorage.getItem("token");

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
        }
    }, []);

    // mock register
    const register = async (name: string, email: string, password: string) => {
        const res = await mockRegister(name, email, password);
        // automatically login after register
        const loginRes = await mockLogin(email, password);

        localStorage.setItem("user", JSON.stringify(loginRes.user));
        localStorage.setItem("token", loginRes.token);

        setUser(loginRes.user);
        setToken(loginRes.token);

        router.push("/dashboard");
    };

    // mock login
    const login = async (email: string, password: string) => {
        const res = await mockLogin(email, password);

        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("token", res.token);

        setUser(res.user);
        setToken(res.token);

        router.push("/dashboard");
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, token, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// custom hook
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used inside AuthProvider");
    return context;
};

