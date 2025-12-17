"use client";

import BundleCard from "@/components/@core/Card/BundleCards";
import {DaoTrainingService} from "@/services/dao-training-service";
import {useEffect, useState} from "react";

export interface Bundle {
    id: string;
    name: string;
    price: number;
    benefits:string;
    active: boolean;
}

export default function StorePage() {
    const [bundles, setBundles] = useState<Bundle[]>([])


    useEffect(() => {
        DaoTrainingService.getBundles().then((bundles) => setBundles(bundles));
    }, []);

    return (
        <div className="min-h-screen w-full bg-[#0a2037] font-roboto px-6 py-10">

            <h1 className="text-4xl font-bold text-center text-white mb-10">
                Store Bundles
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 justify-items-center">
                {bundles.map((b,i) => (
                    <BundleCard key={i} title={b.name} price={`${b.price}`} benefits={`${b.benefits}`} id={b.id}  />
                ))}
            </div>

        </div>
    );
}
