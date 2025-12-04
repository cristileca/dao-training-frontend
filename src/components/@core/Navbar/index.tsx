import Link from "next/link";

export default function Navbar() {
        return (
            <nav className="w-full h-[64px] bg-[#0c2539] border-b border-[#477e9e] flex items-center px-6 shadow-md">
                <div className="text-white text-xl font-semibold">DAO Training</div>

                <div className="ml-auto flex gap-4 text-[15px]">
                    <Link href="/" className="text-[#ffeaa5] hover:text-white transition">Home</Link>
                    <Link href="/dashboard" className="text-[#ffeaa5] hover:text-white transition">Dashboard</Link>
                </div>
            </nav>
        );

}