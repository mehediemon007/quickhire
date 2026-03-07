import React from 'react'
import Link from 'next/link';
import CatehoryCard from '../common/CatehoryCard';

import { ArrowRight } from 'lucide-react';

import { JobCategory } from '@/types';

const categories: JobCategory[] = [
    {
        _id: 1,
        icon: "/assets/images/icons/icon-design.svg",
        name: "Design",
        totalJobs: 426
    },
    {
        _id: 2,
        icon: "/assets/images/icons/icon-sales.svg",
        name: "Sales",
        totalJobs: 756
    },
    {
        _id: 3,
        icon: "/assets/images/icons/icon-marketing.svg",
        name: "Marketing",
        totalJobs: 140
    },
    {
        _id: 4,
        icon: "/assets/images/icons/icon-wallet.svg",
        name: "Finance",
        totalJobs: 325
    },
    {
        _id: 5,
        icon: "/assets/images/icons/icon-monitor.svg",
        name: "Technology",
        totalJobs: 436
    },
    {
        _id: 6,
        icon: "/assets/images/icons/icon-bracket.svg",
        name: "Engineering",
        totalJobs: 542
    },
    {
        _id: 7,
        icon: "/assets/images/icons/icon-briefcase.svg",
        name: "Business",
        totalJobs: 211
    },
    {
        _id: 8,
        icon: "/assets/images/icons/icon-humans.svg",
        name: "Human Resource",
        totalJobs: 346
    },
]

function Categories() {
    return (
        <section className='pb-10 lg:py-18'>
            <div className="container">
                <div className='flex justify-between items-end gap-4 mb-6 sm:mb-12'>
                    <h2>Explore by <span className='text-accent'>category</span></h2>
                    <Link href={'#'} className='hidden sm:inline-flex gap-4 text-primary font-semibold transition-colors duration-300 ease-in hover:text-black'>
                        <span>Show all jobs</span>
                        <ArrowRight />
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {
                        categories.map((category: JobCategory) => (
                            <div key={category._id} className="col-span-1">
                                <CatehoryCard category={category}/>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Categories;