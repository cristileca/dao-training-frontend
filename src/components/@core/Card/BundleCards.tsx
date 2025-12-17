"use client";

import {motion} from "framer-motion";
import {useState} from "react";
import {DaoTrainingService} from "@/services/dao-training-service";

interface BundleCardProps {
    id: string;
    title: string;
    price: string;
    benefits: string;
}

export default function BundleCard({ title, price, benefits, id }: BundleCardProps) {
    const [loading, setLoading] = useState<boolean>(false);


    const buy = (async() =>{
        await DaoTrainingService.buyBundle(id);
    })

    return (
        <div className="w-[250px] h-[300px] bg-gradient-to-b from-[#0c2539] to-[#11314a] rounded-2xl shadow-lg p-4 border border-[#1e3a57] hover:scale-105 hover:overflow-visible transition-transform duration-200 flex flex-col">
            <h2 className="text-[22px] font-semibold text-[#ffeaa5] text-center mb-3">{title}</h2>
            <p className="text-[36px] font-bold text-white text-center mb-4">{price} $</p>
            <ul className="space-y-2 flex-1">
                    <li className="text-sm text-blue-200">• {benefits}</li>
            </ul>
            <motion.button
                whileTap={{ scale: 0.999 }}
                onClick={buy}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }} // springy bounce
                className="mt-auto w-full border border-amber-200 h-[48px] bg-gradient-to-r cursor-pointer from-[#11314a] to-[#0c2539] text-white text-sm rounded-lg overflow-visible"
            >
                Buy Now
            </motion.button>
        </div>
    );
}
