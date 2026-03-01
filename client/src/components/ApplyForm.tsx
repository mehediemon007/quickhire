"use client";

import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, CheckCircle2 } from "lucide-react";

const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  resume_link: z.string().url("Must be a valid URL"),
  cover_note: z.string().min(10, "Cover note must be at least 10 characters"),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

export default function ApplyForm({ jobId }: { jobId: string }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: ApplicationFormValues) => {
      const payload = { ...data, job_id: jobId };
      await api.post("/applications", payload);
    },
    onSuccess: () => {
      reset();
    },
  });

  if (mutation.isSuccess) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
        <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-green-900 mb-2">Application Submitted!</h3>
        <p className="text-green-700">
          Thank you for applying. The employer will review your application shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit((d) => mutation.mutate(d))} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
        <input
          {...register("name")}
          type="text"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
          placeholder="John Doe"
        />
        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
        <input
          {...register("email")}
          type="email"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
          placeholder="john@example.com"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Resume Link (URL)</label>
        <input
          {...register("resume_link")}
          type="url"
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white"
          placeholder="https://linkedin.com/in/johndoe"
        />
        {errors.resume_link && <p className="mt-1 text-sm text-red-500">{errors.resume_link.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Cover Note</label>
        <textarea
          {...register("cover_note")}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all bg-white resize-none"
          placeholder="Why are you a great fit for this role?"
        />
        {errors.cover_note && <p className="mt-1 text-sm text-red-500">{errors.cover_note.message}</p>}
      </div>

      {mutation.isError && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          Failed to submit application. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={mutation.isPending}
        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {mutation.isPending ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Application"
        )}
      </button>
    </form>
  );
}
