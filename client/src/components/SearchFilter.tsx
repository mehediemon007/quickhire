"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, RootState } from "@/lib/store";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface Props {
    className?: string
}

export default function SearchFilter({ className } : Props) {
    const dispatch = useDispatch();
    const router = useRouter();
    const filters = useSelector((state: RootState) => state.filters);

    const [localSearch, setLocalSearch] = useState(filters.search);
    const [localLocation, setLocalLocation] = useState(filters.location);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setFilters({ search: localSearch, location: localLocation,}));
        router.push(`/jobs?search=${localSearch}&location=${localLocation}`);
    };

    return (
        <>
            <div className={cn("relative w-full sm:w-213 bg-white p-4 shadow-[0px_2.71px_4.4px_0px_#C0C0C007,0px_6.86px_11.12px_0px_#C0C0C00A,0px_14px_22.68px_0px_#C0C0C00C,0px_28.84px_46.72px_0px_#C0C0C00F,0px_79px_128px_0px_#C0C0C017]", className)}>
                <form
                    onSubmit={handleSearch}
                    className="flex flex-col sm:flex-row justify-between"
                >
                    <div className="flex-1 flex items-center pr-4">
                        <span className="inline-flex items-center justify-center w-12">
                            <Search className="text-neutral-100"/>
                        </span>
                        
                        <input
                            type="text"
                            className="h-full border-b border-b-neutral-200 placeholder:text-neutral-600 placeholder:opacity-50"
                            placeholder="Job title or keyword"
                            value={localSearch}
                            onChange={(e) => setLocalSearch(e.target.value)}
                        />
                    </div>

                    <div className="flex-1 flex items-center pr-4">
                        <div className="inline-flex items-center justify-center w-12">
                            <MapPin className="text-neutral-100"/>
                        </div>
                        <div className="w-full h-full relative">
                            <select
                                className={`h-full border-b border-neutral-200 bg-transparent appearance-none ${
                                    !localLocation ? 'text-neutral-600 opacity-50' : 'text-inherit'
                                }`}
                                value={localLocation}
                                onChange={(e) => setLocalLocation(e.target.value)}
                            >
                                <option value="" disabled>Select Location</option>
                                <option value="Remote" className="text-black">Remote</option>
                                <option value="New York" className="text-black">New York</option>
                                <option value="San Francisco" className="text-black">San Francisco</option>
                                <option value="London" className="text-black">London</option>
                                <option value="Berlin" className="text-black">Berlin</option>
                            </select>
                            <span className="absolute top-1/2 right-0 -translate-y-1/2">
                                <ChevronDown className="text-neutral-600"/>
                            </span>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary w-52.25 h-14.25 leading-14.25"
                    >
                        Search Jobs
                    </button>
                </form>
            </div>
            <p className="text-[#202430b3] font-medium mt-4 leading-[1.6]"><span className="font-normal">Popular :</span> UI Designer, UX Researcher, Android, Admin</p>
        </>
    );
}
