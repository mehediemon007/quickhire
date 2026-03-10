import Hero from "@/components/home/Hero";
import Clients from "@/components/home/Clients";
import Categories from "@/components/home/Categories";
import EmployerCTA from "@/components/home/EmployerCTA";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import LatestJobs from "@/components/home/LatestJobs";

export default function Home() {
    return (
        <>
            <Hero />
            <Clients />
            <Categories/>
            <EmployerCTA/>
            <FeaturedJobs/>
            <LatestJobs/>
            {/* <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-10">
                    <h2 className="text-3xl font-bold text-slate-900">Latest Opportunities</h2>
                    <p className="text-slate-500 mt-2">Discover the perfect role for your next career move.</p>
                    </div>
                    <JobListings />
                </div>
            </section> */}
        </>
    );
}
