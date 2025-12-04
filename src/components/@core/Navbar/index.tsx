import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
        return (
            <nav className="w-full h-[64px] bg-[#0c2539] border-b border-[#477e9e] flex items-center px-6 shadow-md">
                <div className="w-20% h-10 content-center m-2"><Image width={"100"} height={"100"}  src={"/logo-dao-1.svg"} alt={"logo"} /></div>
                <div className="ml-auto flex gap-2 text-[15px]">
                    <Link
                        href="/"
                        className="inline-block overflow-visible text-[#ffeaa5] text-sm rounded bg-blue-900 px-3 py-2 hover:text-white hover:scale-110 transition-transform duration-200"
                    >
                        Home
                    </Link>
                    <Link
                        href="/dashboard"
                        className="inline-block overflow-visible text-[#ffeaa5] text-sm rounded bg-blue-900 px-3 py-2 hover:text-white hover:scale-110 transition-transform duration-200"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/store"
                        className="inline-block overflow-visible text-[#ffeaa5] text-sm rounded bg-blue-900 px-3 py-2 hover:text-white hover:scale-110 transition-transform duration-200"
                    >
                        Store
                    </Link>
                </div>

            </nav>
        );

}