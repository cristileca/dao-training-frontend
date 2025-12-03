"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();
    const { register } = useAuth();

    const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (form.password !== form.confirm) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            await register(form.name, form.email, form.password);
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
                <h1 className="text-4xl font-semibold text-black text-center mb-4">Register</h1>

                {error && <p className="bg-red-100 text-red-700 p-2 rounded text-sm mb-3">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-3">
                    <input className="w-full border text-black p-2 rounded text-sm" placeholder="Name" name="name"
                           value={form.name} onChange={handleChange} required />

                    <input className="w-full border p-2 text-black  rounded text-sm" placeholder="Email" name="email" type="email"
                           value={form.email} onChange={handleChange} required />

                    <input className="w-full border p-2 text-black  rounded text-sm" placeholder="Password" name="password" type="password"
                           value={form.password} onChange={handleChange} required />

                    <input className="w-full border p-2 text-black  rounded text-sm" placeholder="Confirm Password" name="confirm" type="password"
                           value={form.confirm} onChange={handleChange} required />

                    <button disabled={loading} className="w-full bg-black text-white p-2 rounded text-sm disabled:opacity-50">
                        {loading ? "Creating..." : "Register"}
                    </button>
                </form>

                <p className="text-center text-black mt-2 text-xs">
                    Already have account?{" "}
                    <span className="text-blue-600 cursor-pointer" onClick={() => router.push("/login")}>
            Login
          </span>
                </p>
            </div>
        </div>
    );
}
