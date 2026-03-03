"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const logos = [
    {
        src: "/assets/images/vodafone-logo.svg",
        alt: "Vodaphone"
    },
    {
        src: "/assets/images/intel-logo.svg",
        alt: "Vodaphone"
    },
    {
        src: "/assets/images/tesla-logo.svg",
        alt: "Vodaphone"
    },
    {
        src: "/assets/images/amd-logo.svg",
        alt: "Vodaphone"
    },
    {
        src: "/assets/images/talkit-logo.svg",
        alt: "Vodaphone"
    },
];

export default function Clients() {
    return (
        <section className="py-12">
            <div className="container">
                <div className="mb-8">
                    <p className="text-black-500">Companies we helped grow</p>
                </div>

                <div className="relative w-full overflow-hidden flex">
                    <motion.div
                        className="flex justify-between gap-32"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
                    >
                        {[...logos, ...logos].map((logo, index) => (
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
