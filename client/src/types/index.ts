export interface JobCategory {
    _id: string | number;
    icon: string;
    name: string;
    totalJobs: number;
}

export interface Job {
    _id: number | string;
    title: string;
    jobType: string; 
    company: string;
    logo: string;
    location: string;
    jobDesc: string;
    salary: number | string;
    tags: string[];
}

export interface Application {
    _id: string;
    job_id: string;
    name: string;
    email: string;
    resume_link: string;
    cover_note: string;
    createdAt: string;
}