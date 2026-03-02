import Link from "next/link";
import Hero from "@/components/Hero";
import Clients from "../../public/assets/images/Clients";
import JobListings from "@/components/JobListings";
import Categories from "@/components/Categories";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <Hero />
            <Clients />
            <Categories/>
            <section>
                <div className="container">
                    <div className="flex justify-between gap-32 px-19.75 pt-17 bg-[url('/assets/images/dashboard-bg.svg')] bg-cover bg-left bg-no-repeat">
                        <div className="max-w-91 space-y-6">
                            <h2 className="text-white">Start posting jobs today</h2>
                            <p className="text-white">Start posting jobs for only $10.</p>
                            <Link href={'/signup'} className='btn bg-white'>Sign Up For Free</Link>
                        </div>
                        <div className="flex-1 min-w-0">
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
            <FeaturedJobs/>
            
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10">
                    <h2 className="text-3xl font-bold text-slate-900">Latest Opportunities</h2>
                    <p className="text-slate-500 mt-2">Discover the perfect role for your next career move.</p>
                    </div>
                    <JobListings />
                </div>
            </section>
        </>
    );
}
