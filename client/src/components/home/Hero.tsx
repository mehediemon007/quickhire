import Image from "next/image";
import SearchFilter from "../SearchFilter";

export default function Hero() {
    return (
        <section className="relative bg-[#F8F8FD] pt-15 lg:pt-19.5 overflow-hidden z-10">
            <div className="absolute bottom-0 right-0 w-full lg:w-[60%] h-full bg-[url('/assets/images/hero-bg-pattern-sm.svg')] xl:bg-[url('/assets/images/hero-bg-pattern.svg')] bg-right bg-contain lg:bg-auto bg-no-repeat -z-1"></div>
            <div className="container">
                <div className="flex gap-14.5">
                    <div className="max-w-157.5 h-max py-8 lg:py-0 lg:mt-20.5">
                        <h1 className="max-w-133.25 text-5xl/[1.10] sm:text-[72px]/[1.10] font-semibold font-title text-neutral-100">
                            Discover more than <span className="text-primary">5000+ Jobs</span>
                        </h1>
                        <Image src={'/assets/images/line.svg'} alt="line" width={455} height={40}/>
                        <p className="max-w-130.25 text-lg/relaxed sm:text-xl/[1.6] text-[#515b6fb3] my-5.75 sm:my-6">Great platform for the job seeker that searching for new career heights and passionate about startups.</p>
                        <SearchFilter className="z-10"/>
                    </div>
                    <div className="hidden lg:block">
                        <div className="relative w-125.25 h-176.75 aspect-501/7071">
                            <Image src={'/assets/images/hero.avif'} alt='Hero Image' fill sizes="100vw" priority fetchPriority="high" className="object-cover"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden xl:block absolute -bottom-87.5 right-0 w-70 h-179 bg-white rotate-[64rad]"></div>
        </section>
    );
}
