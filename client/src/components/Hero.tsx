import Image from "next/image";
import SearchFilter from "./SearchFilter";

export default function Hero() {
    return (
        <section className="relative bg-[#F8F8FD]">
            <div className="container">
                <div className="flex items-center gap-14.5">
                    <div className="max-w-157.5">
                        <h1 className="max-w-133.25 text-[72px]/[1.10] font-semibold font-title text-neutral-100">
                            Discover more than <span className="text-primary">5000+ Jobs</span>
                        </h1>
                        <Image src={'/assets/images/line.svg'} alt="line" width={455} height={40}/>
                        <p className="text-xl/[1.6] text-[#515b6fb3] my-6">Great platform for the job seeker that searching for new career heights and passionate about startups.</p>
                        <SearchFilter className="z-10"/>
                    </div>
                    <div>
                        <div className="relative w-125.25 h-176.75 aspect-501/7071">
                            <Image src={'/assets/images/hero.png'} alt='Hero Image' fill className="object-cover"/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
