"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { useScrollThreshold } from "@/hooks/use-scroll-threshold";

import { NAV_LINKS } from "@/constants/navigation";

import { cn } from "@/lib/utils";

import { HamburgerIcon } from "../common/Icons";


export default function Header() {

    const isScrolled = useScrollThreshold(100);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <header 
            className={cn(
                "fixed w-full top-0 z-50 transition-transform duration-300 py-3 sm:py-3.5",
                isScrolled 
                    ? "bg-white lg:animate-fadeInDown shadow-md"
                    : "bg-[#F8F8FD]"
            )}
        >
            <div className="container">
                <div className="flex justify-between items-center">
                    
                    <div className="flex items-end gap-12">
                        <Link href="/">
                            <Image src="/assets/images/logo.svg" alt="Quick Hire" width={152} height={36} priority />
                        </Link>
                        <nav className="hidden md:block">
                            <ul className="flex items-center gap-4">
                                {NAV_LINKS.map((link) => (
                                    <li key={link.label}>
                                        <Link href={link.href} className="font-medium text-neutral-800 hover:text-primary transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    
                    <div className="md:hidden">
                        <button 
                            onClick={() => setIsMobileOpen(true)} 
                            aria-label="Open Menu"
                            aria-expanded={isMobileOpen}
                            className="inline-flex justify-center items-center w-8 h-8 bg-white border border-neutral-200 rounded-full hover:bg-neutral-50"
                        >
                            <HamburgerIcon />
                        </button>
                        <MobileMenu isMobileOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />
                    </div>

                    
                    <div className="hidden md:flex items-center divide-x divide-neutral-200">
                        <div className="pr-4">
                            <Link href="/login" className="btn">Login</Link>
                        </div>
                        <div className="pl-4">
                            <Link href="/signup" className="btn btn-primary">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}