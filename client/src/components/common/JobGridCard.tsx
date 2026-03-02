import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Job } from '@/types';
import { tagStyles } from '@/constants/tag-colors';

function JobGridCard({ job }: { job: Job }) {
    return (
        <Link href={`/jobs/${job.id}`} className="relative block h-full border border-neutral-200 p-6">
            <div className='relative w-12 h-12 aspect-square mb-4'>
                <Image src={job.logo} alt={job.companyName} fill sizes='100vw' className='object-contain'/>
            </div>
            <div>
                <h5>{job.title}</h5>
                <div className='flex items-center gap-2'>
                    <p className='text-neutral-800'>{job.companyName}</p>
                    <span className='inline-block w-1 h-1 rounded-full bg-neutral-800 opacity-30'></span>
                    <p className='text-neutral-800'>{job.location}</p>
                </div>
                <p className='line-clamp-2 text-neutral-600 font-inter my-4'>{job.jobDesc}</p>
                {!!job.tags.length && (
                    <div className='flex flex-wrap gap-2'>
                        {job.tags.map((tag)=> {
                            const baseColor = tagStyles[tag.toLowerCase()] || tagStyles["default"];
                            return (
                                <span 
                                    key={tag} 
                                    className='inline-flex justify-center items-center text-sm font-semibold px-4 py-2 rounded-[80px]'
                                    style={{color: baseColor, backgroundColor: `${baseColor}1A`}}
                                >{tag}</span>
                            )
                        })}
                    </div>
                )}
            </div>
            <span className='absolute top-6 right-6 border border-primary px-3 py-1'>
                {job.jobType}
            </span>
        </Link>
    )
}

export default JobGridCard;