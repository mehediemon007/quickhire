"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilters, RootState } from "@/lib/store";
import { Search, MapPin, Briefcase } from "lucide-react";

export default function SearchFilter() {
    const dispatch = useDispatch();
    const filters = useSelector((state: RootState) => state.filters);

    const [localSearch, setLocalSearch] = useState(filters.search);
    const [localLocation, setLocalLocation] = useState(filters.location);
    const [localCategory, setLocalCategory] = useState(filters.category);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setFilters({ search: localSearch, location: localLocation, category: localCategory }));
    };

    return (
        <div className="max-w-5xl mx-auto -mt-8 relative z-10 px-4 sm:px-6 lg:px-8">
            <form
                onSubmit={handleSearch}
                className="bg-white p-4 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row gap-4"
            >
                <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border-0 bg-slate-50 text-slate-900 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                        placeholder="Job title or company..."
                        value={localSearch}
                        onChange={(e) => setLocalSearch(e.target.value)}
                    />
                </div>

                <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-slate-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-3 border-0 bg-slate-50 text-slate-900 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                        placeholder="Location..."
                        value={localLocation}
                        onChange={(e) => setLocalLocation(e.target.value)}
                    />
                </div>

                <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Briefcase className="h-5 w-5 text-slate-400" />
                    </div>
                    <select
                        className="block w-full pl-10 pr-3 py-3 border-0 bg-slate-50 text-slate-900 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all outline-none appearance-none"
                        value={localCategory}
                        onChange={(e) => setLocalCategory(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Software Development">Software Development</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                        <option value="Operations">Operations</option>
                        <option value="Product">Product</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-medium transition-colors duration-200 shadow-md shadow-primary-500/30"
                >
                    Search Jobs
                </button>
            </form>
        </div>
    );
}
