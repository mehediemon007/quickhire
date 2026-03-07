"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

const LOGOS = [
    { src: "/assets/images/vodafone-logo.svg", alt: "Vodafone" },
    { src: "/assets/images/intel-logo.svg", alt: "Intel" },
    { src: "/assets/images/tesla-logo.svg", alt: "Tesla" },
    { src: "/assets/images/amd-logo.svg", alt: "AMD" },
    { src: "/assets/images/talkit-logo.svg", alt: "Talkit" },
];

export default function Clients() {

    const [isScroll, setIsScroll] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsScroll(window.innerWidth >= 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    const displayLogos = useMemo(() => (
        isScroll ? [...LOGOS, ...LOGOS] : LOGOS
    ),[isScroll])

    return (
        <section className="py-10 lg:py-12">
            <div className="container">
                <div className="mb-8">
                    <p className="text-black-500">Companies we helped grow</p>
                </div>

                <div className={cn(
                    "relative w-full",
                    isScroll && "flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                )}>
                    <motion.div
                        key={isScroll ? "scrolling-logos" : "static-logos"}
                        className={cn("flex justify-between gap-10 lg:gap-32",
                            isScroll ? "flex-nowrap w-max" : "flex-wrap justify-start"
                        )}
                        animate={isScroll ? { x: ["0%", "-50%"] } : { x: 0 }}
                        transition={{ ease: "linear", duration: 25, repeat: isScroll ? Infinity : 0 }}
                    >
                        {displayLogos.map((logo, index) => (
                            <div key={index} className="w-max">
                                <Image src={logo.src} alt={logo.alt} width={150} height={40} className="w-auto h-auto object-contain"/>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
