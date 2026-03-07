import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { ArrowRight } from 'lucide-react';

import { JobCategory } from '@/types';

function CatehoryCard({ category } : {category: JobCategory }) {
    return (
        <div className="col-span-1 flex xl:flex-col items-center xl:items-start gap-8 border border-neutral-200 p-4 sm:p-6 lg:gap-8 transition-colors duration-200 ease-in group hover:bg-primary hover:border-transparent">
            <div className='relative w-10 sm:w-12 h-10 sm:h-12 aspect-square'>
                <Image src={category.icon} alt={category.name} fill sizes='100vw' className='transition-colors duration-200 ease-in group-hover:brightness-0 group-hover:invert'/>
            </div>
            <div>
                <h3 className='text-xl/[1.2] sm:text-2xl/[1.2] font-semibold font-title text-neutral-100 transition-colors duration-200 ease-in group-hover:text-white'>
                    <Link href={'#'}>{category.name}</Link>
                </h3>
                <div className='flex items-center gap-4 mt-0.5 sm:mt-3'>
                    <p className='text-base sm:text-lg/[1.6] text-neutral-600 transition-colors duration-200 ease-in group-hover:text-white'>{category.totalJobs} jobs available</p>
                    <Link href={'#'} aria-label='See Job Category' className='transition-colors duration-200 ease-in group-hover:text-white'><ArrowRight /></Link>
                </div>
            </div>
        </div>
    )
}

export default CatehoryCard;