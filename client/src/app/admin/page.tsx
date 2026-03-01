"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Job } from "@/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Trash2, Plus, Briefcase, MapPin, Building, AlertCircle } from "lucide-react";
import { useState } from "react";
import { formatDistanceToNow } from "date-fns";

const jobSchema = z.object({
    title: z.string().min(1, "Job title is required"),
    company: z.string().min(1, "Company name is required"),
    location: z.string().min(1, "Location is required"),
    category: z.string().min(1, "Category is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
});

type JobFormValues = z.infer<typeof jobSchema>;

export default function AdminPage() {
    const queryClient = useQueryClient();
    const [showForm, setShowForm] = useState(false);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    // Fetch all jobs
    const { data: jobs, isLoading, isError: isJobsError } = useQuery({
        queryKey: ["admin-jobs"],
        queryFn: async () => {
            const { data } = await api.get<Job[]>("/jobs");
            return data;
        },
        retry: 1,
    });

    // Create job mutation
    const createMutation = useMutation({
        mutationFn: async (data: JobFormValues) => {
            await api.post("/jobs", data);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
            setShowForm(false);
            reset();
        },
    });

    // Delete job mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            setDeletingId(id);
            await api.delete(`/jobs/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-jobs"] });
            setDeletingId(null);
        },
        onError: () => {
            setDeletingId(null);
        },
    });

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<JobFormValues>({ resolver: zodResolver(jobSchema) });

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
                        <p className="text-slate-500 mt-1">Manage all job listings</p>
                    </div>
                    <button
                        onClick={() => setShowForm((v) => !v)}
                        className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-5 py-3 rounded-xl transition-colors shadow-md shadow-primary-500/20"
                    >
                        <Plus className="w-5 h-5" />
                        {showForm ? "Cancel" : "Add New Job"}
                    </button>
                </div>

                {/* Create Job Form */}
                {showForm && (
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 mb-8">
                        <h2 className="text-xl font-bold text-slate-900 mb-6">Create New Job Listing</h2>
                        <form
                            onSubmit={handleSubmit((d) => createMutation.mutate(d))}
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                                <input
                                    {...register("title")}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-slate-50"
                                    placeholder="e.g. Senior React Developer"
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                                <input
                                    {...register("company")}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-slate-50"
                                    placeholder="e.g. TechNova Inc."
                                />
                                {errors.company && <p className="mt-1 text-sm text-red-500">{errors.company.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                                <input
                                    {...register("location")}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-slate-50"
                                    placeholder="e.g. Remote or New York, NY"
                                />
                                {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                                <select
                                    {...register("category")}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-slate-50"
                                >
                                    <option value="">Select Category</option>
                                    <option value="Software Development">Software Development</option>
                                    <option value="Design">Design</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Operations">Operations</option>
                                    <option value="Product">Product</option>
                                </select>
                                {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>}
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                                <textarea
                                    {...register("description")}
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 outline-none bg-slate-50 resize-none"
                                    placeholder="Describe the role, responsibilities and requirements..."
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
                            </div>

                            <div className="md:col-span-2 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => { setShowForm(false); reset(); }}
                                    className="px-6 py-3 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={createMutation.isPending}
                                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-medium px-6 py-3 rounded-xl transition-colors disabled:opacity-70"
                                >
                                    {createMutation.isPending ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Posting...</>
                                    ) : (
                                        <><Plus className="w-4 h-4" /> Post Job</>
                                    )}
                                </button>
                            </div>

                            {createMutation.isError && (
                                <div className="md:col-span-2 bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4" />
                                    Failed to create job. Please try again.
                                </div>
                            )}
                        </form>
                    </div>
                )}

                {/* Job List */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-primary-500 animate-spin" />
          </div>
        ) : isJobsError ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-red-800 mb-2">Server unreachable</h3>
            <p className="text-red-600 text-sm mb-4">Please make sure MongoDB is running and start the backend server:</p>
            <div className="bg-white rounded-xl p-4 text-left font-mono text-sm text-slate-700 border border-red-100 inline-block text-left w-full max-w-sm mx-auto">
              <p className="text-slate-500 mb-1"># In a new terminal:</p>
              <p>cd server</p>
              <p>npm run dev</p>
            </div>
          </div>
        ) : !jobs?.length ? (
                    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
                        <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">No jobs yet</h3>
                        <p className="text-slate-500">Click "Add New Job" to create your first listing.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm text-slate-500">{jobs.length} job{jobs.length !== 1 ? "s" : ""} listed</p>
                        {jobs.map((job) => (
                            <div
                                key={job._id}
                                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                            >
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-slate-900 text-lg truncate">{job.title}</h3>
                                    <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-slate-500">
                                        <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5" />{job.company}</span>
                                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700 border border-primary-100">
                                            {job.category}
                                        </span>
                                        <span className="text-slate-400">{formatDistanceToNow(new Date(job.createdAt), { addSuffix: true })}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => deleteMutation.mutate(job._id)}
                                    disabled={deletingId === job._id}
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium whitespace-nowrap"
                                >
                                    {deletingId === job._id ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Trash2 className="w-4 h-4" />
                                    )}
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
