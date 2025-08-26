'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileMenuOpen(window.innerWidth < 768 ? false : isMobileMenuOpen);
        };
        window.addEventListener('resize', handleResize);
        handleResize();
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="fixed rounded-md left-1/2 transform -translate-x-1/2 w-full bg-white text-white shadow-xl z-10">
            <nav className="flex items-center justify-between px-6">
                <Link href="/" className="">
                    <div className="text-xl text-[#214469] hover:text-[#2596be] font-bold p-4">Data & AI Integrations</div>
                </Link>
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <svg className="w-6 h-6 text-[#214469]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
                    </svg>
                </button>
                <ul className={`flex space-x-6 md:items-center ${isMobileMenuOpen ? 'flex flex-col absolute top-full left-0 w-full bg-white rounded-b-lg py-4' : 'hidden md:flex'}`}>
                    <li>
                        <Link href="#apps">
                            <div className="block text-[#214469] font-bold pl-4 py-2 hover:text-[#2596be]">Apps</div>
                        </Link>
                    </li>
                    <li>
                        <Link href="#calculators">
                            <div className="block text-[#214469] font-bold pl-4 md:pl-0 py-2 hover:text-[#2596be]">Calcs</div>
                        </Link>
                    </li>
                    <li>
                        <Link href="#about">
                            <div className="block text-[#214469] font-bold pl-4 md:pl-0 py-2 hover:text-[#2596be]">About</div>
                        </Link>
                    </li>
                    <li>
                        <Link href="#contact">
                            <div className="block text-[#214469] font-bold pl-4 md:pl-0 py-2 hover:text-[#2596be]">Contact</div>
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}