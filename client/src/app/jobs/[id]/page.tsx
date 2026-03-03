"use client";

import { useParams } from "next/navigation";
import { useJob } from "@/hooks/useJobs";
import { Loader2, MapPin, Building, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ApplyForm from "@/components/ApplyForm";
import { formatDistanceToNow } from "date-fns";

export default function JobDetailPage() {
    const params = useParams();
    const id = params.id as string;
    const { data: job, isLoading, isError } = useJob(id);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
            </div>
        );
    }

    if (isError || !job) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-red-50 text-red-800 p-6 rounded-2xl max-w-md text-center">
                    <h2 className="text-xl font-bold mb-2">Job Not Found</h2>
                    <p className="mb-6">The job you are looking for does not exist or has been removed.</p>
                    <Link href="/" className="text-primary-600 hover:underline font-medium">
                        ← Back to Jobs
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <Link href="/" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to all jobs
                </Link>

                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-100 mb-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{job.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 text-slate-600">
                                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full text-sm font-medium">
                                    <Building className="w-4 h-4" />
                                    {job.company}
                                </div>
                                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full text-sm font-medium">
                                    <MapPin className="w-4 h-4" />
                                    {job.location}
                                </div>
                                <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full text-sm font-medium">
                                    <Calendar className="w-4 h-4" />
                                    {/* Posted {formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })} */}
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="inline-block px-4 py-2 bg-primary-50 text-primary-700 rounded-full font-semibold border border-primary-100">
                                {/* {job.category} */}
                            </span>
                        </div>
                    </div>

                    <hr className="border-slate-100 mb-8" />

                    <div className="prose prose-slate max-w-none">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">About the Role</h3>
                        {/* <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{job.description}</p> */}
                    </div>
                </div>

                {/* Application Section */}
                <div className="bg-slate-100 rounded-3xl p-8 md:p-12 border border-slate-200">
                    <div className="max-w-2xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Apply for this Position</h2>
                        <p className="text-slate-500 text-center mb-8">Please fill out the form below to submit your application to {job.company}.</p>
                        <ApplyForm jobId={job._id} />
                    </div>
                </div>
            </div>
        </div>
    );
}
