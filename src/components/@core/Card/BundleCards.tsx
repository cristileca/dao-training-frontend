"use client";

import {motion} from "framer-motion";

interface BundleCardProps {
    title: string;
    price: string;
    benefits: string[];
}

export default function BundleCard({ title, price, benefits }: BundleCardProps) {
    return (
        <div className="w-[250px] h-[350px] bg-gradient-to-b from-[#0c2539] to-[#11314a] rounded-2xl shadow-lg p-4 border border-[#1e3a57] hover:scale-105 hover:overflow-visible transition-transform duration-200 flex flex-col">
            <h2 className="text-[22px] font-semibold text-[#ffeaa5] text-center mb-3">{title}</h2>
            <p className="text-[36px] font-bold text-white text-center mb-4">{price}</p>
            <ul className="space-y-2 flex-1">
                {benefits.map((item, i) => (
                    <li key={i} className="text-sm text-blue-200">• {item}</li>
                ))}
            </ul>
            <motion.button
                whileTap={{ scale: 0.999 }}  // shrink when finger/mouse is pressed
                whileHover={{ scale: 1.02 }} // hover zoom
                transition={{ type: "spring", stiffness: 300, damping: 10 }} // springy bounce
                className="
                mt-auto w-full border border-amber-200 h-[48px] bg-gradient-to-r cursor-pointer
                from-[#11314a] to-[#0c2539] text-white text-sm rounded-lg
                overflow-visible
              "
            >
                Buy Now
            </motion.button>        </div>
    );
}
