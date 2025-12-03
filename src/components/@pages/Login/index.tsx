"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();

    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await login(form.email, form.password);
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
                <h1 className="text-4xl text-zinc-900 font-semibold text-center mb-4">Login</h1>

                {error && <p className="bg-red-100 text-red-700 p-2 rounded text-sm mb-3">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input className="w-full border p-2 rounded text-black  text-sm" placeholder="Email" name="email" type="email"
                           value={form.email} onChange={handleChange} required />

                    <input className="w-full border p-2 rounded text-black text-sm" placeholder="Password" name="password" type="password"
                           value={form.password} onChange={handleChange} required />

                    <button disabled={loading} className="w-full bg-black text-white p-2 rounded text-sm disabled:opacity-50">
                        {loading ? "Signing in..." : "Login"}
                    </button>
                </form>
                <p className={"text-zinc-900 flex justify-center "} >Don't have an account? <a href={"/register"} className={"text-blue-500 "}>Register</a></p>
            </div>
        </div>
    );
}
