import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Job } from "@/types";

export const useJobs = (filters: { search?: string; location?: string; category?: string }) => {
    return useQuery({
        queryKey: ["jobs", filters],
        queryFn: async () => {
            const { data } = await api.get<Job[]>("/api/jobs", { params: filters });
            return data;
        },
    });
};

export const useJob = (id: string) => {
    return useQuery({
        queryKey: ["job", id],
        queryFn: async () => {
            const { data } = await api.get<Job>(`/jobs/${id}`);
            return data;
        },
        enabled: !!id,
    });
};
