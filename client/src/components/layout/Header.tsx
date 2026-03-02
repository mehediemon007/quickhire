"use client";

import Link from "next/link";
import Image from "next/image";

export default function Header() {

    return (
        <header className="fixed w-full top-0 py-3.5 z-50">
            <div className="container">
                <div className="flex justify-between items-center">
                    <div className="flex justify-start items-end gap-12">
                        <Link href={'/'}>
                            <Image src={'/assets/images/logo.svg'} alt="Quick Hire" width={152} height={36}/>
                        </Link>
                        <nav>
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
                    <div className="flex divide-x divide-neutral-200">
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
