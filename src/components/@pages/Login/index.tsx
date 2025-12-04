"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

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
            // Optional: ensure loading is visible for at least 300ms
            await new Promise((resolve) => setTimeout(resolve, 3000));

            await login(form.email, form.password);
        } catch (err: any) {
            setError(err.message);
        }

        setLoading(false);
    };

    return (
        <div className="min-h-screen w-screen font-roboto bg-[#0a2037] flex items-center justify-center bg-[url(/login-background.webp)] bg-cover bg-center">
            <div className="relative w-[652px] h-[620px]  flex justify-center ">
                <div className={"border-mask w-[602px] h-[66px] absolute rounded-[10px] -top-3"}/>
                <div className="relative w-full h-full mask  shadow-md">
                    <div className="absolute inset-0 bg-[url(/smart-microchip-bg.webp)] bg-contain bg-no-repeat bg-center"></div>

                    <div className="relative z-10 flex flex-col items-center">
                        <Image
                            width={148}
                            height={40}
                            className="m-auto mt-[63px] "
                            src="./logo-dao-1.svg"
                            alt="logo"
                        />

                        <h1 className="text-4xl mt-[42px] font-semibold text-center mb-4">Login</h1>
                        <p className="text-sm  leading-tight mb-9 ">Please inputs the details below</p>

                        {error && (
                            <p className="bg-red-100 text-red-700 p-2 rounded text-sm mb-3">
                                {error}
                            </p>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-3 m-auto w-[379px]">
                            <label htmlFor="email" className="text-[14px] m-2">
                                Email Address
                            </label>
                            <input
                                className="w-full border-1 border-[#2a5577] p-2 rounded bg-[#0b273c] h-14 m-2 text-sm"
                                placeholder="Type here..."
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                            <label htmlFor="password" className="text-[14px] m-2">
                                Password
                            </label>
                            <input
                                className="w-full border-1 border-[#2a5577]  p-2 rounded m-2 bg-[#0b273c] h-14 text-sm"
                                placeholder="Type here..."
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                            <div className="btn-gold-border w-full m-2">
                                <button
                                    disabled={loading}
                                    className="w-full  h-[56px] bg-gradient-to-r from-[#11314a] to-[#0c2539] text-white rounded p-2 text-sm disabled:opacity-50 flex items-center justify-center hover:h-15">
                                    {loading ? "Signing in..." : "Plug in"}
                                </button>
                            </div>
                        </form>

                        <p className="text-blue-300 text-sm flex justify-center mt-3">
                            Don&apos;t have an account?{" "}
                            <a href="/register" className="text-blue-500 ml-1">
                                Register
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
