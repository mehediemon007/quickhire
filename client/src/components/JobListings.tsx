"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useJobs } from "@/hooks/useJobs";
import JobCard from "./JobCard";
import { Loader2, AlertCircle } from "lucide-react";

export default function JobListings() {
    const filters = useSelector((state: RootState) => state.filters);
    const { data: jobs, isLoading, isError } = useJobs(filters);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-primary-500 animate-spin mb-4" />
                <p className="text-slate-500">Finding opportunities...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <h3 className="text-red-800 font-semibold mb-1">Failed to load jobs</h3>
                <p className="text-red-600 text-sm">Please check your connection or try again later.</p>
            </div>
        );
    }

    if (!jobs?.length) {
        return (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🔍</span>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No jobs found</h3>
                <p className="text-slate-500">We couldn't find any positions matching your current filters.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
            ))}
        </div>
    );
}
