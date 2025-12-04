"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function RegisterPage() {
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
        <div className="min-h-screen w-screen font-roboto bg-[#0a2037] flex items-center justify-center bg-[url(/login-background.webp)] bg-cover bg-center">
            <div className="relative w-[652px] h-[620px] flex justify-center">

                {/* Top small decorative bar (same as login) */}
                <div className="border-mask w-[602px] h-[66px] absolute rounded-[10px] overflow-hidden -top-3" />

                {/* Main card container */}
                <div className="relative w-full h-full mask rounded-[10px] overflow-hidden shadow-md">

                    {/* Inner microchip image */}
                    <div className="absolute inset-0 bg-[url(/smart-microchip-bg.webp)] bg-contain bg-no-repeat bg-center"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <Image
                            width={148}
                            height={40}
                            className="m-auto mt-[63px]"
                            src="./logo-dao-1.svg"
                            alt="logo"
                        />

                        <h1 className="text-4xl mt-[42px] font-semibold text-center mb-9">Register</h1>

                        {error && (
                            <p className="bg-red-100 text-red-700 p-2 rounded text-sm mb-3">
                                {error}
                            </p>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-3 m-auto w-[379px]">

                            <input
                                className="w-full border border-[#2a5577] text-blue-100 p-3 rounded bg-[#0b273c] h-14 text-sm"
                                placeholder="Name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="w-full border border-[#2a5577] text-blue-100 p-3 rounded bg-[#0b273c] h-14 text-sm"
                                placeholder="Email Address"
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="w-full border border-[#2a5577] text-blue-100 p-3 rounded bg-[#0b273c] h-14 text-sm"
                                placeholder="Password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="w-full border border-[#2a5577] text-blue-100 p-3 rounded bg-[#0b273c] h-14 text-sm"
                                placeholder="Confirm Password"
                                name="confirm"
                                type="password"
                                value={form.confirm}
                                onChange={handleChange}
                                required
                            />

                            <div className="btn-gold-border w-full">
                                <button
                                    disabled={loading}
                                    className="w-full h-[56px] bg-gradient-to-r from-[#11314a] to-[#0c2539] text-white rounded p-2 text-sm disabled:opacity-50 flex items-center justify-center hover:h-15"
                                >
                                    {loading ? "Creating..." : "Plug in"}
                                </button>
                            </div>

                        </form>

                        <p className="text-blue-300 text-sm flex justify-center mt-4">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-500 ml-1">
                                Login
                            </a>
                        </p>

                    </div>
                </div>
            </div>
        </div>

    );
}
