import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { cn } from '@/lib/utils';

import { X } from 'lucide-react';

type Props = {
    isMobileOpen: boolean,
    onClose: () => void,
    className?: string
}

function MobileMenu({ isMobileOpen, onClose, className }: Props) {
    return (
        <div className={cn(
            "fixed top-0 left-0 w-[80dvw] h-dvh bg-white transition-all duration-300 ease-in-out",
            isMobileOpen ? "left-0" : "-left-full",
            className)}>

                <div className='p-4'>
                    <div className='flex justify-between items-center'>
                        <Link href={'/'}>
                            <Image src={'/assets/images/logo.svg'} alt="Quick Hire" width={152} height={36}/>
                        </Link>
                        <button className='' onClick={onClose}>
                            <X />
                        </button>
                    </div>
                    <div>
                        <ul className="">
                            <li>
                                <Link href={'#'} className="block font-medium text-neutral-800 leading-[1.6] py-2 border-b border-b-neutral-200">Find Jobs</Link>
                            </li>
                            <li>
                                <Link href={'#'} className="block font-medium text-neutral-800 leading-[1.6] py-2 border-b border-b-neutral-200">Browse Companies</Link>
                            </li>
                        </ul>
                        <Link href={'/login'} className='btn btn-primary w-full'>
                            Login/SignUp
                        </Link>
                    </div>
                </div>
        </div>
    )
}

export default MobileMenu;