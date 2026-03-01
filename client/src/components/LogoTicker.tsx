"use client";

import { motion } from "framer-motion";

const logos = [
    "Microsoft",
    "Google",
    "Amazon",
    "Apple",
    "Meta",
    "Netflix",
    "Tesla",
    "Adobe",
    "Spotify",
    "Airbnb",
];

export default function LogoTicker() {
    return (
        <section className="py-10 bg-white border-y border-slate-200 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
                <p className="text-center text-sm font-medium text-slate-500 uppercase tracking-wider">
                    Trusted by innovative companies worldwide
                </p>
            </div>

            <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                <motion.div
                    className="flex gap-16 min-w-full items-center whitespace-nowrap pr-16"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ ease: "linear", duration: 25, repeat: Infinity }}
                >
                    {/* Duplicate the array to create seamless loop */}
                    {[...logos, ...logos].map((logo, index) => (
                        <div key={index} className="text-2xl font-bold text-slate-400 opacity-60 hover:opacity-100 transition-opacity">
                            {logo}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
