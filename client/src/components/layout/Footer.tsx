import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

import { FacebookIcon, InstagramIcon, DribbleIcon, LinkedinIcon, TwitterIcon } from '../common/Icons';

function Footer() {
    return (
        <footer className='bg-black'>
            <div className="container">
                <div className='border-b-2 border-[#ffffff1a] pt-10 sm:pt-14 pb-6 sm:pb-20'>
                    <div className='flex flex-col sm:flex-row justify-between gap-6 flex-wrap'>
                        <div className='footer-widget'>
                            <Link href={'/'}>
                                <Image src={'/assets/images/logo-white.svg'} alt="Quick Hire" width={152} height={36}/>
                            </Link>
                            <p className='sm:max-w-94 text-neutral-200 mt-8'>Great platform for the job seeker that passionate about startups. Find your dream job easier.</p>
                        </div>
                        <div className='w-full sm:max-w-73.75 flex sm:justify-between gap-24 sm:gap-0 footer-widget'>
                            <div className=''>
                                <h5 className='text-white mb-4.5'>About</h5>
                                <ul className='space-y-4'>
                                    <li>
                                        <Link href={'#'}>Companies</Link>
                                    </li>
                                    <li>
                                        <Link href={'#'}>Pricing</Link>
                                    </li>
                                    <li>
                                        <Link href={'#'}>Terms</Link>
                                    </li>
                                    <li>
                                        <Link href={'#'}>Advice</Link>
                                    </li>
                                    <li>
                                        <Link href={'#'}>Privacy Policy</Link>
                                    </li>
                                </ul>
                            </div>
                            <div className=''>
                                <h5 className='text-white mb-4.5'>Resources</h5>
                                <ul className='space-y-4'>
                                    <li>
                                        <Link href={'#'}>Help Docs</Link>
                                    </li>
                                    <li>
                                        <Link href={'#'}>Guide</Link>
                                    </li>
                                    <li>
                                        <Link href={'#'}>Updates</Link>
                                    </li>
                                    <li>
                                        <Link href={'#'}>Contact Us</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='footer-widget'>
                            <h5 className='text-white mb-2 sm:mb-4.5'>Get job notifications</h5>
                            <p className='sm:max-w-76.5 text-neutral-200'>The latest job news, articles, sent to your inbox weekly.</p>
                            <form className='flex flex-col sm:flex-row gap-2 mt-4 sm:mt-10'>
                                <input placeholder='Email address' className='h-12.5 bg-white px-4 placeholder:text-neutral-400'/>
                                <button className='btn btn-primary'>Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col sm:flex-row justify-between items-center gap-6 pt-6 sm:pt-10 pb-10'>
                    <p className='text-[#ffffff80]'>2021 &copy; QuickHire. All rights reserved.</p>
                    <ul className='flex justify-start lg:justify-between items-center gap-4 sm:gap-6'>
                        <li>
                            <a href='https://www.facebook.com/' target='_blank' aria-label='facebook' className='inline-flex justify-center items-center w-8 h-8 text-white bg-[#ffffff1a] rounded-full transition-colors duration-300 ease-in hover:bg-white hover:text-primary'><FacebookIcon/></a>
                        </li>
                        <li>
                            <a href='https://www.instagram.com/' target='_blank' aria-label='instagram' className='inline-flex justify-center items-center w-8 h-8 text-white bg-[#ffffff1a] rounded-full transition-colors duration-300 ease-in hover:bg-white hover:text-primary'><InstagramIcon /></a>
                        </li>
                        <li>
                            <a href='https://dribbble.com/' target='_blank' aria-label='instagram' className='inline-flex justify-center items-center w-8 h-8 text-white bg-[#ffffff1a] rounded-full transition-colors duration-300 ease-in hover:bg-white hover:text-primary'><DribbleIcon /></a>
                        </li>
                        <li>
                            <a href='https://www.linkedin.com/' target='_blank' aria-label='instagram' className='inline-flex justify-center items-center w-8 h-8 text-white bg-[#ffffff1a] rounded-full transition-colors duration-300 ease-in hover:bg-white hover:text-primary'><LinkedinIcon /></a>
                        </li>
                        <li>
                            <a href='https://x.com/' target='_blank' aria-label='twitter' className='inline-flex justify-center items-center w-8 h-8 text-white bg-[#ffffff1a] rounded-full transition-colors duration-300 ease-in hover:bg-white hover:text-primary'><TwitterIcon/></a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer;