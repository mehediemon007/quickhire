"use client";

import SearchFilter from "@/components/SearchFilter";
import JobListings from "@/components/JobListings";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

function JobsContent() {
    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4 text-center">
                        Find Your Next Career Move
                    </h1>
                    <p className="text-lg text-slate-600 text-center max-w-2xl mx-auto">
                        Browse through thousands of job opportunities from top companies around the world.
                    </p>
                </div>

                <div className="mb-12">
                    <SearchFilter />
                </div>

                <JobListings />
            </div>
        </div>
    );
}

export default function JobsPage() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
            </div>
        }>
            <JobsContent />
        </Suspense>
    );
}
