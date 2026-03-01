"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed w-full top-0 z-50 glass border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Briefcase className="w-8 h-8 text-primary-600" />
            </motion.div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">
              QuickHire
            </span>
          </Link>

          <nav className="flex space-x-8">
            <Link
              href="/"
              className={`${
                pathname === "/" ? "text-primary-600 font-semibold" : "text-slate-600 hover:text-primary-500"
              } transition-colors duration-200`}
            >
              Home
            </Link>
            <Link
              href="/admin"
              className={`${
                pathname === "/admin" ? "text-primary-600 font-semibold" : "text-slate-600 hover:text-primary-500"
              } transition-colors duration-200`}
            >
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
