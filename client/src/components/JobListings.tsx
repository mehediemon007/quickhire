"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, setFilters } from "@/lib/store";
import { useJobs } from "@/hooks/useJobs";
import JobCard from "./JobCard";
import { Loader2, SearchX, AlertTriangle, RefreshCcw } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function JobListings() {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const filters = useSelector((state: RootState) => state.filters);

    // Sync URL params with Redux state on mount or URL change
    useEffect(() => {
        const search = searchParams.get("search") || "";
        const location = searchParams.get("location") || "";
        const category = searchParams.get("category") || "";

        if (search !== filters.search || location !== filters.location || category !== filters.category) {
            dispatch(setFilters({ search, location, category }));
        }
    }, [searchParams, dispatch, filters]);

    const { data: jobs, isLoading, isError, refetch } = useJobs(filters);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-24">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mb-6" />
                <p className="text-slate-500 font-medium text-lg">Curating the best opportunities for you...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="max-w-md mx-auto bg-white border border-red-100 rounded-3xl p-10 text-center shadow-xl shadow-red-500/5">
                <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Something went wrong</h3>
                <p className="text-slate-500 mb-8 leading-relaxed">
                    We encountered an error while fetching the latest jobs. Please try refreshing the results.
                </p>
                <button
                    onClick={() => refetch()}
                    className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-2xl font-semibold hover:bg-slate-800 transition-all mx-auto shadow-lg shadow-slate-900/20"
                >
                    <RefreshCcw className="w-4 h-4" />
                    Try Again
                </button>
            </div>
        );
    }

    if (!jobs?.length) {
        return (
            <div className="max-w-2xl mx-auto bg-white border border-slate-100 rounded-3xl p-16 text-center shadow-2xl shadow-slate-200/50">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
                    <SearchX className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">No matching jobs found</h3>
                <p className="text-slate-500 text-lg mb-10 leading-relaxed">
                    We couldn&apos;t find any positions matching your current search. Try adjusting your filters or search terms for better results.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4">
                    <span className="bg-slate-50 text-slate-600 px-4 py-2 rounded-full text-sm font-medium border border-slate-100 italic">
                        Try &quot;Developer&quot;
                    </span>
                    <span className="bg-slate-50 text-slate-600 px-4 py-2 rounded-full text-sm font-medium border border-slate-100 italic">
                        Try &quot;Remote&quot;
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
            ))}
        </div>
    );
}
