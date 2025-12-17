"use client";

import React from "react";
import Form from "next/form";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useFormStatus } from "react-dom";

function SubmitButton({ idleText }: { idleText: string }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full h-[56px] bg-gradient-to-r from-[#11314a] to-[#0c2539] text-white rounded text-sm disabled:opacity-50 flex items-center justify-center">
            {pending ? "Plugging in..." : idleText}
        </button>
    );
}

export default function RegisterPage() {
    const { register } = useAuth();
    const [error, setError] = React.useState("");

    const handleSubmit = async (formData: FormData) => {
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirm = formData.get("confirm") as string;
        const referralId = formData.get("referralId") as string;


        setError("");

        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }
        await fetch("http://localhost:8000/sanctum/csrf-cookie", {
            credentials: "include",
        });

        try {
            await register(name, email, password, referralId );
        } catch (err: unknown) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen w-screen bg-[#0a2037] flex items-center justify-center bg-[url(/login-background.webp)]  bg-center">
            <div className="relative w-[652px]  flex justify-center">
                <div className="border-mask w-[602px] h-[66px] absolute rounded-[10px] overflow-hidden -top-3"></div>

                <div className="relative w-full h-full mask shadow-md overflow-hidden rounded-[10px]">
                    <div className="absolute inset-0 bg-[url(/smart-microchip-bg.webp)] bg-cover  bg-no-repeat bg-center"></div>

                    {/* form content */}
                    <div className="relative z-10 flex flex-col  items-center">
                        <Image width={148} height={40} className="mt-[63px]" src="./logo-dao-1.svg" alt="logo"/>
                        <h1 className="text-4xl mt-[42px] font-semibold text-center mb-6">Register</h1>

                        {error && (
                            <p className="bg-red-100 text-red-700 p-2 rounded text-sm mb-3 w-[379px] text-center">
                                {error}
                            </p>
                        )}

                        <Form action={handleSubmit} className="space-y-3 w-[379px]">

                            <input
                                className="w-full border border-[#2a5577] text-blue-100 px-4 rounded bg-[#0b273c] h-14 text-sm"
                                placeholder="Type name here..."
                                name="name"
                                required
                            />

                            <input
                                className="w-full border border-[#2a5577] text-blue-100 px-4 rounded bg-[#0b273c] h-14 text-sm"
                                placeholder="Type email here..."
                                name="email"
                                type="email"
                                required
                            />

                            <input
                                className="w-full border border-[#2a5577] text-blue-100 px-4 rounded bg-[#0b273c] h-14 text-sm"
                                placeholder="Type password..."
                                name="password"
                                type="password"
                                required
                            />

                            <input
                                className="w-full border border-[#2a5577] text-blue-100 px-4 rounded bg-[#0b273c] h-14 text-sm"
                                placeholder="Confirm password..."
                                name="confirm"
                                type="password"
                                required
                            />

                            <input
                                className="w-full border border-[#2a5577] text-blue-100 px-4 rounded bg-[#0b273c] h-14 text-sm"
                                placeholder="Referral code here..."
                                name="referralId"
                                type="referralId"
                                required
                            />

                            <div className="btn-gold-border w-full">
                                <SubmitButton idleText="Plug in" />
                            </div>

                        </Form>

                        <p className="text-blue-300 text-sm flex justify-center my-4">
                            Already have an account?{" "}
                            <a href="/login" className="text-blue-500 ml-1">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
