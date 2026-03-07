import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

function EmployerCTA() {
    return (
        <section>
            <div className="container px-0">
                <div className="flex flex-col lg:flex-row justify-between gap-6.5 lg:gap-32 lg:px-19.75 pt-22 lg:pt-17 pb-24 lg:pb-0 bg-[url('/assets/images/dashboard-bg-sm.svg')] lg:bg-[url('/assets/images/dashboard-bg.svg')] bg-cover bg-left bg-no-repeat">
                    <div className="w-full lg:max-w-91 space-y-4 lg:space-y-6 text-center lg:text-left px-4 lg:px-0">
                        <h2 className="text-white">Start posting jobs today</h2>
                        <p className="text-white">Start posting jobs for only $10.</p>
                        <Link href={'/signup'} className='btn bg-white w-full lg:w-auto'>Sign Up For Free</Link>
                    </div>
                    <div className="flex-1 min-w-0 pl-4 lg:pl-0">
                        <Image 
                            src={'/assets/images/dashboard.jpg'} 
                            alt="Dashboard" 
                            width={564}
                            height={346}
                            sizes="(max-width: 768px) 100vw, 50vw" 
                            className="object-cover object-left"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EmployerCTA;