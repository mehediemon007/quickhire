"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Overlay } from '../common/Overlay';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/constants/navigation';

type Props = {
    isMobileOpen: boolean;
    onClose: () => void;
    className?: string;
}

function MobileMenu({ isMobileOpen, onClose, className }: Props) {
    return (
        <Overlay isOpen={isMobileOpen} onClose={onClose}>
            <Overlay.Backdrop />

            <Overlay.Content 
                className={cn(
                    "top-0 left-0 w-[80dvw] h-full bg-white flex flex-col shadow-xl", 
                    className
                )}
            >
                
                <div className='flex justify-between items-center p-4 border-b border-b-neutral-200'>
                    <Link href='/' onClick={onClose}>
                        <Image 
                            src='/assets/images/logo.svg' 
                            alt="Quick Hire" 
                            width={152} 
                            height={36} 
                        />
                    </Link>
                    <button 
                        onClick={onClose}
                        className='p-1 hover:bg-neutral-100 rounded-full transition-colors'
                        aria-label="Close menu"
                    >
                        <X size={24} className="text-neutral-800" />
                    </button>
                </div>

                <div className='p-4 flex-1'>
                    <ul className="flex flex-col">
                        {NAV_LINKS.map((link) => (
                            <li key={link.label}>
                                <Link 
                                    href={link.href} 
                                    onClick={onClose}
                                    className="block font-medium text-neutral-800 py-1 transition-colors hover:text-primary"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className='p-4 border-t border-t-neutral-200'>
                    <Link 
                        href='/login' 
                        onClick={onClose}
                        className='btn btn-primary w-full rounded-lg'
                    >
                        Login / Sign Up
                    </Link>
                </div>

            </Overlay.Content>
        </Overlay>
    );
}

export default MobileMenu;