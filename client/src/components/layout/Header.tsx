"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";

import { HamburgerIcon } from "../common/Icons";

export default function Header() {

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(()=>{

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100)
        }

        window.addEventListener('scroll', handleScroll, {passive: true})
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    },[])

    return (
        <header className={`fixed w-full top-0 pt-2 pb-4 sm:py-3.5 z-50 transition-all duration-300  
            ${isScrolled 
                ? "bg-white animate-fadeInDown shadow-[0_10px_15px_rgba(25,25,25,0.1)]" 
                : "bg-[#F8F8FD]"
            }`}
        >
            <div className="container">
                <div className="flex justify-between items-center">
                    <div className="flex justify-start items-end gap-12">
                        <Link href={'/'}>
                            <Image src={'/assets/images/logo.svg'} alt="Quick Hire" width={152} height={36}/>
                        </Link>
                        <nav className="hidden xl:block">
                            <ul className="flex justify-start items-center gap-4">
                                <li>
                                    <Link href={'#'} className="font-medium text-neutral-800 leading-[1.6]">Find Jobs</Link>
                                </li>
                                <li>
                                    <Link href={'#'} className="font-medium text-neutral-800 leading-[1.6]">Browse Companies</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div>
                        <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="inline-flex justify-center items-center w-8 h-8 bg-white border border-neutral-200 rounded-full">
                            <HamburgerIcon/>
                        </button>
                        <MobileMenu isMobileOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)}/>
                    </div>
                    <div className="hidden xl:flex divide-x divide-neutral-200">
                        
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
