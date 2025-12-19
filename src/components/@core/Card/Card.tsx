'use client'
import React from "react";

interface CardProps {
    name: string;
    value: string | number;
    children?: React.ReactNode; // <-- add this
}

export default function Card({ name, value, children}: CardProps) {
    return (
        <div className="bg-[#11314a] rounded-xl shadow-md p-4 flex flex-col items-center justify-center w-48 h-32">
            <p className="text-sm text-[#ffeaa5]">{name}</p>
            <h2 className="text-2xl font-bold text-white mt-2">{value}</h2>
            {children}
        </div>
    );
}