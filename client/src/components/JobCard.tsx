"use client";

import { Job } from "@/types";
import { motion } from "framer-motion";
import { MapPin, Building, Clock } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function JobCard({ job }: { job: Job }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="bg-white rounded-2xl p-6 shadow-sm shadow-slate-200/50 border border-slate-100 hover:shadow-xl hover:shadow-slate-200 transition-all group"
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                        {job.title}
                    </h3>
                    <div className="flex items-center gap-2 text-slate-500 mt-1">
                        <Building className="w-4 h-4" />
                        <span className="font-medium">{job.company}</span>
                    </div>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100 whitespace-nowrap">
                    {/* {job.category} */}
                </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {/* {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })} */}
                </div>
            </div>

            <Link
                href={`/jobs/${job._id}`}
                className="block w-full text-center bg-slate-50 hover:bg-primary-50 text-slate-700 hover:text-primary-700 font-medium py-2.5 rounded-xl border border-slate-200 hover:border-primary-200 transition-colors"
            >
                View Details
            </Link>
        </motion.div>
    );
}
