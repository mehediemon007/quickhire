import React from 'react'
import Link from 'next/link';
import JobListCard from '../common/JobListCard';

import { Job } from '@/types';

import { ArrowRight } from 'lucide-react';

const jobs = [
    {
        id: 1,
        title: "Social Media Assistant",
        jobType: "Full Time",
        companyName: "Nomad",
        logo: "/assets/images/nomad.svg",
        location: "Paris, France",
        jobDesc: "Revolut is looking for Email Marketing to help team ma ...",
        salary: 25000,
        tags: ["Marketing", "Design"]
    },
    {
        id: 2,
        title: "Social Media Assistant",
        jobType: "Full Time",
        companyName: "Netlify",
        logo: "/assets/images/netlify.svg",
        location: "Paris, France",
        jobDesc: "Dropbox is looking for Brand Designer to help the team t ...",
        salary: 25000,
        tags: ["Design", "Business"]
    },
    {
        id: 3,
        title: "Brand Designer",
        jobType: "Full Time",
        companyName: "Dropbox",
        logo: "/assets/images/dropbox.svg",
        location: "San Fransisco, USA",
        jobDesc: "Pitch is looking for Customer Manager to join marketing t ...",
        salary: 25000,
        tags: ["Marketing", "Design"]
    },
    {
        id: 4,
        title: "Brand Designer",
        jobType: "Full Time",
        companyName: "Maze",
        logo: "/assets/images/binklist.svg",
        location: "San Fransisco, USA",
        jobDesc: "Blinkist is looking for Visual Designer to help team desi ...",
        salary: 25000,
        tags: ["Design",]
    },
    {
        id: 5,
        title: "Interactive Developer",
        jobType: "Full Time",
        companyName: "Terraform",
        logo: "/assets/images/terraform.svg",
        location: "Hamburg, Germany",
        jobDesc: "ClassPass is looking for Product Designer to help us...",
        salary: 25000,
        tags: ["Marketing", "Design",]
    },
    {
        id: 6,
        title: "Interactive Developer",
        jobType: "Full Time",
        companyName: "Udacity",
        logo: "/assets/images/udacity.svg",
        location: "Hamburg, Germany",
        jobDesc: "Canva is looking for Lead Engineer to help develop n ...",
        salary: 25000,
        tags: ["Design", "Business"]
    },
    {
        id: 7,
        title: "HR Manager",
        jobType: "Full Time",
        companyName: "Packer",
        logo: "/assets/images/packer.svg",
        location: "Lucern, Switzerland",
        jobDesc: "GoDaddy is looking for Brand Strategist to join the team...",
        salary: 25000,
        tags: ["Marketing", "Design"]
    },
    {
        id: 8,
        title: "HR Manager",
        jobType: "Full Time",
        companyName: "Webflow",
        logo: "/assets/images/webflow.svg",
        location: "Lucern, Switzerland",
        jobDesc: "Twitter is looking for Data Analyst to help team desi ...",
        salary: 25000,
        tags: ["Marketing", "Design"]
    },
]

const LatestJobs = () => {
    return (
        <section className="relative py-18 bg-[#F8F8FD] bg-[url('/assets/images/pattern.svg')] bg-contain bg-right bg-no-repeat">
            <div className='absolute top-0 left-0 w-0 h-0 border-t-80 border-t-white border-r-120 border-r-transparent'></div>
            <div className="container">
                <div className='flex justify-between items-end gap-4 mb-12'>
                    <h2>Latest <span className='text-accent'>jobs open</span></h2>
                    <Link href={'#'} className='inline-flex gap-4 text-primary font-semibold transition-colors duration-300 ease-in hover:text-black'>
                        <span>Show all jobs</span>
                        <ArrowRight />
                    </Link>
                </div>
                <div>
                    <div className="grid grid-cols-2 gap-8">
                        {
                            jobs.map((job: Job) => (
                                <div key={job.id} className='grid-cols-1'>
                                    <JobListCard job={job}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LatestJobs;