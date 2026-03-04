import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { ArrowRight } from 'lucide-react';

const categories = [
    {
        id: 1,
        icon: "/assets/images/icons/icon-design.svg",
        name: "Design",
        totalJobs: 426
    },
    {
        id: 2,
        icon: "/assets/images/icons/icon-sales.svg",
        name: "Sales",
        totalJobs: 756
    },
    {
        id: 3,
        icon: "/assets/images/icons/icon-marketing.svg",
        name: "Marketing",
        totalJobs: 140
    },
    {
        id: 4,
        icon: "/assets/images/icons/icon-wallet.svg",
        name: "Finance",
        totalJobs: 325
    },
    {
        id: 5,
        icon: "/assets/images/icons/icon-monitor.svg",
        name: "Technology",
        totalJobs: 436
    },
    {
        id: 6,
        icon: "/assets/images/icons/icon-bracket.svg",
        name: "Engineering",
        totalJobs: 542
    },
    {
        id: 7,
        icon: "/assets/images/icons/icon-briefcase.svg",
        name: "Business",
        totalJobs: 211
    },
    {
        id: 8,
        icon: "/assets/images/icons/icon-humans.svg",
        name: "Human Resource",
        totalJobs: 346
    },
]

function Categories() {
    return (
        <section className='py-18'>
            <div className="container">
                <div className='flex justify-between items-end gap-4 mb-6 sm:mb-12'>
                    <h2>Explore by <span className='text-accent'>category</span></h2>
                    <Link href={'#'} className='hidden sm:inline-flex gap-4 text-primary font-semibold transition-colors duration-300 ease-in hover:text-black'>
                        <span>Show all jobs</span>
                        <ArrowRight />
                    </Link>
                </div>
                <div>
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-8">
                        {
                            categories.map((category) => (
                                <div key={category.id} className="col-span-1 flex items-center gap-8 border border-neutral-200 p-4 sm:p-8 transition-colors duration-200 ease-in group hover:bg-primary hover:border-transparent">
                                    <div className='relative w-10 sm:w-12 h-10 sm:h-12 aspect-square'>
                                        <Image src={category.icon} alt={category.name} fill sizes='100vw' className='transition-colors duration-200 ease-in group-hover:brightness-0 group-hover:invert'/>
                                    </div>
                                    <div>
                                        <h5 className='text-xl/[1.2] sm:text-2xl/[1.2] font-semibold font-title text-neutral-100 transition-colors duration-200 ease-in group-hover:text-white'>
                                            <Link href={'#'}>{category.name}</Link>
                                        </h5>
                                        <div className='flex items-center gap-4 mt-0.5 sm:mt-3'>
                                            <p className='text-base sm:text-lg/[1.6] text-neutral-600 transition-colors duration-200 ease-in group-hover:text-white'>{category.totalJobs} jobs available</p>
                                            <Link href={'#'} className='transition-colors duration-200 ease-in group-hover:text-white'><ArrowRight /></Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Categories;