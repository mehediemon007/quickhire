import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Job } from '@/types';
import { tagStyles } from '@/constants/tag-colors';

function JobListCard({ job }: { job: Job }) {
    return (
        <Link href={`/jobs/${job._id}`} className="relative flex flex-col sm:flex-row md:flex-col lg:flex-row gap-6 bg-white p-4 lg:px-10 lg:py-6">
            <div className='relative w-14 h-14 aspect-square'>
                <Image src={job.logo} alt={job.company} fill sizes='100vw' className='object-contain'/>
            </div>
            <div>
                <h3>{job.title}</h3>
                <div className='flex items-center gap-2 my-2'>
                    <p className='text-neutral-800'>{job.company}</p>
                    <span className='inline-block w-1 h-1 rounded-full bg-neutral-800'></span>
                    <p className='text-neutral-800'>{job.location}</p>
                </div>
                <div className='flex items-center gap-2'>
                    <span className='inline-flex justify-center items-center text-sm font-semibold text-[#56CDAD] bg-[#56CDAD1A] px-4 py-2 rounded-[80px]'>{job.jobType}</span>
                    <span className='inline-block w-px h-8 bg-neutral-200'></span>
                    {!!job.tags.length && (
                        job.tags.map((tag)=> {
                            const baseColor = tagStyles[tag.toLowerCase()] || tagStyles["default"];
                            return (
                                <span 
                                    key={tag} 
                                    className='inline-flex justify-center items-center text-sm font-semibold px-2.5 py-1.5 rounded-[80px]'
                                    style={{color: baseColor, border: `1px solid ${baseColor}`}}
                                >{tag}</span>
                            )
                        })
                    )}
                </div>
            </div>
        </Link>
    )
}

export default JobListCard;