import React from 'react'
import Link from 'next/link';
import JobGridCard from '../common/JobGridCard';

import { Job } from '@/types';

import { ArrowRight } from 'lucide-react';

const jobs = [
    {
        _id: 1,
        title: "Email Marketing",
        jobType: "Full Time",
        company: "Revolut",
        logo: "/assets/images/revoult.svg",
        location: "Madrid, Spain",
        jobDesc: "Revolut is looking for Email Marketing to help team ma ...",
        salary: 25000,
        tags: ["Marketing", "Design"]
    },
    {
        _id: 2,
        title: "Brand Designer",
        jobType: "Full Time",
        company: "Dropbox",
        logo: "/assets/images/dropbox.svg",
        location: "San Fransisco, US",
        jobDesc: "Dropbox is looking for Brand Designer to help the team t ...",
        salary: 25000,
        tags: ["Design", "Business"]
    },
    {
        _id: 3,
        title: "Email Marketing",
        jobType: "Full Time",
        company: "Pitch",
        logo: "/assets/images/pitch.svg",
        location: "Berlin, Germany",
        jobDesc: "Pitch is looking for Customer Manager to join marketing t ...",
        salary: 25000,
        tags: ["Marketing"]
    },
    {
        _id: 4,
        title: "Visual Designer",
        jobType: "Full Time",
        company: "Blinklist",
        logo: "/assets/images/binklist.svg",
        location: "Granada, Spain",
        jobDesc: "Blinkist is looking for Visual Designer to help team desi ...",
        salary: 25000,
        tags: ["Design",]
    },
    {
        _id: 5,
        title: "Product Designer",
        jobType: "Full Time",
        company: "ClassPass",
        logo: "/assets/images/classpass.svg",
        location: "Manchester, UK",
        jobDesc: "ClassPass is looking for Product Designer to help us...",
        salary: 25000,
        tags: ["Marketing", "Design",]
    },
    {
        _id: 6,
        title: "Lead Designer",
        jobType: "Full Time",
        company: "Canva",
        logo: "/assets/images/canva.svg",
        location: "Ontario, Canada",
        jobDesc: "Canva is looking for Lead Engineer to help develop n ...",
        salary: 25000,
        tags: ["Design", "Business"]
    },
    {
        _id: 7,
        title: "Brand Strategist",
        jobType: "Full Time",
        company: "GoDaddy",
        logo: "/assets/images/godaddy.svg",
        location: "Marseille, France",
        jobDesc: "GoDaddy is looking for Brand Strategist to join the team...",
        salary: 25000,
        tags: ["Marketing",]
    },
    {
        _id: 8,
        title: "Data Analyst",
        jobType: "Full Time",
        company: "Twitter",
        logo: "/assets/images/twitter.svg",
        location: "San Diego, US",
        jobDesc: "Twitter is looking for Data Analyst to help team desi ...",
        salary: 25000,
        tags: ["Technology",]
    },
]

const FeaturedJobs = () => {
    return (
        <section className='py-18'>
            <div className="container">
                <div className='flex justify-between items-end gap-4 mb-12'>
                    <h2>Featured <span className='text-accent'>jobs</span></h2>
                    <Link href={'#'} className='inline-flex gap-4 text-primary font-semibold transition-colors duration-300 ease-in hover:text-black'>
                        <span>Show all jobs</span>
                        <ArrowRight />
                    </Link>
                </div>
                <div>
                    <div className="grid grid-cols-4 gap-8">
                        {
                            jobs.map((job: Job) => (
                                <div key={job._id} className='grid-cols-1'>
                                    <JobGridCard job={job}/>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default FeaturedJobs;