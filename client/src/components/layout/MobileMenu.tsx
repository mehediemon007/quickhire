import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Overlay } from '../common/Overlay';

import { cn } from '@/lib/utils';

import { X } from 'lucide-react';

type Props = {
    isMobileOpen: boolean,
    onClose: () => void,
    className?: string
}

function MobileMenu({ isMobileOpen, onClose, className }: Props) {

    return (
        <Overlay isOpen={isMobileOpen} onClose={onClose}>

            <Overlay.Backdrop/>

            <Overlay.Content className={cn("top-0 left-0 w-[80dvw] h-dvh bg-white", className)}>
                <div className='flex justify-between items-center p-4 border-b border-b-neutral-200'>
                    <Link href={'/'}>
                        <Image src={'/assets/images/logo.svg'} alt="Quick Hire" width={152} height={36}/>
                    </Link>
                    <button className='' onClick={onClose}>
                        <X />
                    </button>
                </div>
                <div className='p-4'>
                    <ul className="flex flex-col gap-4">
                        <li>
                            <Link href={'#'} className="block font-medium text-neutral-800 leading-[1.6]">Find Jobs</Link>
                        </li>
                        <li>
                            <Link href={'#'} className="block font-medium text-neutral-800 leading-[1.6]">Browse Companies</Link>
                        </li>
                        <li>
                            <Link href={'/login'} className='btn btn-primary w-full'>
                                Login/SignUp
                            </Link>
                        </li>
                    </ul>
                </div>
            </Overlay.Content>

        </Overlay>
    )
}

export default MobileMenu;