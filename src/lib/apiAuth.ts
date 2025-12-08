import {LoginResponse, User} from "@/types";

const API_URL = "http://localhost:8000";

export const apiRegister = async (name: string, email: string, password: string, referral_id?: string) => {
    const body = { name, email, password, referral_id };
    const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Registration failed");
    }

    return await res.json() as Promise<{ message: string; user: User }>;
};

export const apiLogin = async (email: string, password: string): Promise<LoginResponse> => {
    try {
        await fetch(`${API_URL}/sanctum/csrf-cookie`)
    } catch (e: unknown) {
        throw new Error("Login failed");
    }
    function getXsrfToken() {
        const match = document.cookie.match(new RegExp('(^| )XSRF-TOKEN=([^;]+)'));
        return match ? decodeURIComponent(match[2]) : null;
    }
    try {
        const apiRes = await fetch(`${API_URL}/api/login`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" ,
                "XSRF-TOKEN": getXsrfToken()!,},
            body: JSON.stringify({ email, password }),
        });

        const res = await apiRes.json() as LoginResponse;

        return res
    } catch (e: unknown) {
        throw(e);
    }
};
