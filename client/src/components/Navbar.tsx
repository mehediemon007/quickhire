"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Briefcase, LogOut, User as UserIcon } from "lucide-react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { logout } from "@/lib/features/auth/authSlice";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Briefcase className="w-8 h-8 text-blue-600" />
            </motion.div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              QuickHire
            </span>
          </Link>

          <nav className="flex items-center space-x-8">
            <Link
              href="/"
              className={`${pathname === "/" ? "text-blue-600 font-semibold" : "text-slate-600 hover:text-blue-500"
                } transition-colors duration-200`}
            >
              Home
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-slate-700 font-medium">
                  <UserIcon className="w-4 h-4" />
                  <span>{user?.fullname || (user?.role === 'employer' ? 'Employer' : 'Employee')}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
