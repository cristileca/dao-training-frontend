"use client";

import React from "react";
import Form from "next/form";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import { useQueryClient } from "@tanstack/react-query";
import {GET_WALLET} from "@/lib/constants";


function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full h-[56px] bg-gradient-to-r from-[#11314a] to-[#0c2539] text-white rounded flex items-center justify-center text-sm disabled:opacity-50">
            {pending ? "Plugging in..." : "Plug in"}
        </button>
    );
}

export default function LoginPage() {
    const client = useQueryClient();

    const { login } = useAuth();
    const handleSubmit = async (formData: FormData) => {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            await login(email, password);
            await client.invalidateQueries({queryKey: [GET_WALLET]});
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="min-h-screen w-screen bg-[#0a2037] flex items-center justify-center bg-[url(/login-background.webp)] bg-cover bg-center">
            <div className="relative w-[652px] h-[620px] flex justify-center">

                <div className="absolute w-[602px] h-[66px] mask -top-3"></div>

                <div className="relative w-full h-full mask shadow-md overflow-hidden">

                    <div className="absolute inset-0 bg-[url(/smart-microchip-bg.webp)] bg-contain bg-no-repeat bg-center"></div>

                    <div className="relative z-10 flex flex-col items-center font-roboto">
                        <Image width={148} height={40} className="mt-[63px]" src="./logo-dao-1.svg" alt="logo"/>
                        <h1 className="text-4xl mt-[42px] font-semibold">Login</h1>
                        <p className="text-sm text-blue-300 mb-9">Please input the details below</p>

                        <Form action={handleSubmit} className="space-y-3 w-[379px]">
                            <label className="text-[14px]">Email Address</label>
                            <input
                                className="w-full border border-[#2a5577] bg-[#0b273c] h-14 rounded text-sm px-4"
                                placeholder="Type here..."
                                name="email"
                                type="email"
                                required
                            />

                            <label className="text-[14px]">Password</label>
                            <input
                                className="w-full border border-[#2a5577] bg-[#0b273c] h-14 rounded text-sm px-4"
                                placeholder="Type here..."
                                name="password"
                                type="password"
                                required
                            />

                            <div className="btn-gold-border w-full">
                                <SubmitButton />
                            </div>
                        </Form>

                        <p className="text-blue-300 text-sm mt-3">
                            Don&apos;t have an account?{" "}
                            <a href="/register" className="text-blue-500 ml-1">Register</a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}
