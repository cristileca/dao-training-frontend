"use client";

import BundleCard from "@/components/@core/Card/BundleCards";
const bundles = [
    {
        title: "51K Bundle",
        price: "51,000 USDT",
        benefits: ["3× Nebula Membership", "3× 10K Galactic Tiers", "Exclusive Pool Share"],
    },
    {
        title: "1K Bundle",
        price: "1,000 USDT",
        benefits: ["500 Solar Membership", "500 Nebula Tier", "Access to Structure"],
    },
    {
        title: "150 Bundle",
        price: "150 USDT",
        benefits: ["50 Lunar Membership", "50 Nebula Tier", "Starter Pack"],
    },
];

export default function StorePage() {
    return (
        <div className="min-h-screen w-full bg-[#0a2037] font-roboto px-6 py-10">

            <h1 className="text-4xl font-bold text-center text-white mb-10">
                Store Bundles
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 justify-items-center">
                {bundles.map((b, i) => (
                    <BundleCard key={i} title={b.title} price={b.price} benefits={b.benefits} />
                ))}
            </div>

        </div>
    );
}
