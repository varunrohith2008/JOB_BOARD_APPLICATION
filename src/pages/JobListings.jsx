import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jobs } from '../data/jobs';
import { FaMapMarkerAlt, FaMoneyBillWave, FaBriefcase, FaSearch } from 'react-icons/fa';

const JobListings = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // Initialize state from location state (if returning from details) or defaults
    const [searchTerm, setSearchTerm] = useState(location.state?.searchTerm || '');
    const [filters, setFilters] = useState(location.state?.filters || {
        location: '',
        minSalary: '',
        jobTypes: [] // array of selected job types
    });

    const uniqueLocations = [...new Set(jobs.map(job => job.location))];
    const uniqueJobTypes = [...new Set(jobs.map(job => job.type))];

    const handleJobClick = (job) => {
        navigate(`/jobs/${job.id}`, {
            state: {
                filters,
                searchTerm
            }
        });
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const handleCheckboxChange = (type) => {
        setFilters(prev => {
            const types = prev.jobTypes.includes(type)
                ? prev.jobTypes.filter(t => t !== type)
                : [...prev.jobTypes, type];
            return { ...prev, jobTypes: types };
        });
    };

    const parseSalary = (str) => parseInt(str.replace(/,/g, ''), 10);

    const filteredJobs = jobs.filter(job => {
        const matchesSearch =
            job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesLocation = filters.location ? job.location === filters.location : true;

        // Simple salary filter logic: check if job salary is >= filter min salary
        // We treat "Above X" values as just numbers
        const jobSalary = parseSalary(job.salary);
        const filterSalary = filters.minSalary ? parseInt(filters.minSalary, 10) : 0;
        const matchesSalary = jobSalary >= filterSalary;

        const matchesType = filters.jobTypes.length > 0 ? filters.jobTypes.includes(job.type) : true;

        return matchesSearch && matchesLocation && matchesSalary && matchesType;
    });

    return (
        <div className="space-y-8 animate-fade-in-up">
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
                    Find Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Dream Job</span>
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Explore the latest opportunities from top companies and startups.
                </p>
            </div>

            {/* Search and Filters Section */}
            <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 space-y-6">
                {/* Search Bar */}
                <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search by job title or company..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 transition-all outline-none text-slate-700 placeholder-slate-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Filters Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Location Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Location</label>
                        <select
                            className="w-full p-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 outline-none transition-all"
                            value={filters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                        >
                            <option value="">All Locations</option>
                            {uniqueLocations.map(loc => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>

                    {/* Salary Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Min Salary</label>
                        <select
                            className="w-full p-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-50 outline-none transition-all"
                            value={filters.minSalary}
                            onChange={(e) => handleFilterChange('minSalary', e.target.value)}
                        >
                            <option value="">Any Salary</option>
                            <option value="20000">₹ 20,000+</option>
                            <option value="25000">₹ 25,000+</option>
                            <option value="27000">₹ 27,000+</option>
                            <option value="28000">₹ 28,000+</option>
                        </select>
                    </div>

                    {/* Job Type Filter */}
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700">Job Type</label>
                        <div className="flex flex-wrap gap-3 pt-2">
                            {uniqueJobTypes.map(type => (
                                <label key={type} className="flex items-center space-x-2 cursor-pointer group">
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filters.jobTypes.includes(type)
                                            ? 'bg-indigo-600 border-indigo-600'
                                            : 'border-slate-300 bg-white group-hover:border-indigo-400'
                                        }`}>
                                        {filters.jobTypes.includes(type) && (
                                            <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 20 20"><path d="M0 11l2-2 5 5L18 3l2 2L7 18z" /></svg>
                                        )}
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={filters.jobTypes.includes(type)}
                                        onChange={() => handleCheckboxChange(type)}
                                        className="hidden"
                                    />
                                    <span className={`text-sm ${filters.jobTypes.includes(type) ? 'text-indigo-700 font-medium' : 'text-slate-600'}`}>
                                        {type}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="flex justify-between items-center text-slate-500 text-sm font-medium px-1">
                <span>Showing {filteredJobs.length} jobs</span>
                {Object.keys(filters).some(k => filters[k] && (Array.isArray(filters[k]) ? filters[k].length > 0 : true)) && (
                    <button
                        onClick={() => setFilters({ location: '', minSalary: '', jobTypes: [] })}
                        className="text-indigo-600 hover:text-indigo-800 transition-colors"
                    >
                        Clear All Filters
                    </button>
                )}
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map(job => (
                    <div
                        key={job.id}
                        onClick={() => handleJobClick(job)}
                        className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 cursor-pointer relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                                <p className="text-slate-500 text-sm font-medium mt-1">{job.company}</p>
                            </div>
                            <span className="bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
                                {job.type}
                            </span>
                        </div>

                        <div className="space-y-3 mt-4">
                            <div className="flex items-center text-slate-600 text-sm">
                                <FaMapMarkerAlt className="mr-2 text-indigo-400" />
                                {job.location}
                            </div>
                            <div className="flex items-center text-slate-600 text-sm">
                                <FaMoneyBillWave className="mr-2 text-emerald-500" />
                                ₹ {job.salary}
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
                            <span className="text-xs text-slate-400 font-medium">Posted recently</span>
                            <span className="text-indigo-600 text-sm font-bold group-hover:translate-x-1 transition-transform inline-flex items-center">
                                View Details &rarr;
                            </span>
                        </div>
                    </div>
                ))}

                {filteredJobs.length === 0 && (
                    <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                        <div className="text-slate-300 text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-bold text-slate-900 mb-2">No jobs found</h3>
                        <p className="text-slate-500">Try adjusting your filters or search terms.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobListings;
