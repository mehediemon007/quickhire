"use client";

import { motion } from "framer-motion";

export default function HeroBanner() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl">
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary-100 text-primary-700 text-sm font-semibold mb-6">
                        Over 10,000+ jobs available
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                        Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">Dream Job</span> Today
                    </h1>
                    <p className="max-w-2xl mx-auto text-xl text-slate-600 mb-10">
                        Connect with top employers and discover opportunities that match your skills, passion, and career goals.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
