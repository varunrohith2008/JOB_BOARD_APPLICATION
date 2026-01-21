import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { jobs } from '../data/jobs';
import { FaArrowLeft, FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaCheckCircle, FaBriefcase } from 'react-icons/fa';

const JobDetails = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const job = jobs.find(j => j.id === parseInt(jobId));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!job) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-slate-700">Job not found</h2>
                <button
                    onClick={() => navigate('/')}
                    className="mt-4 text-indigo-600 hover:text-indigo-800 font-medium"
                >
                    &larr; Back to Jobs
                </button>
            </div>
        );
    }

    const handleBack = () => {
        // Navigate back to home, preserving the filter state
        navigate('/', { state: location.state });
    };

    const handleApply = () => {
        // Navigate to apply page, passing along the previous state (filters) so we can eventually go back to listings
        navigate(`/apply/${jobId}`, { state: location.state });
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
            {/* Back Button */}
            <button
                onClick={handleBack}
                className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-medium group"
            >
                <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Jobs
            </button>

            {/* Header Card */}
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
                <div className="bg-gradient-to-r from-indigo-600 to-violet-600 h-32 md:h-48 relative">
                    <div className="absolute -bottom-10 left-8 md:left-12 bg-white p-4 rounded-2xl shadow-lg border border-slate-50">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 text-3xl font-bold border border-indigo-100">
                            {job.company.charAt(0)}
                        </div>
                    </div>
                </div>

                <div className="pt-16 pb-8 px-8 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">{job.title}</h1>
                            <div className="flex items-center mt-2 text-lg text-slate-600 font-medium">
                                {job.company}
                                <span className="mx-2 text-slate-300">•</span>
                                <span className="text-indigo-600 bg-indigo-50 px-3 py-0.5 rounded-full text-sm">{job.type}</span>
                            </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                            <div className="text-2xl font-bold text-slate-900">₹ {job.salary}</div>
                            <div className="text-sm text-slate-500 font-medium">per month</div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-8 border-t border-slate-100">
                        <div className="flex items-center text-slate-700">
                            <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600 mr-4">
                                <FaMapMarkerAlt size={20} />
                            </div>
                            <div>
                                <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Location</div>
                                <div className="font-semibold">{job.location}</div>
                            </div>
                        </div>
                        <div className="flex items-center text-slate-700">
                            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600 mr-4">
                                <FaBriefcase size={20} />
                            </div>
                            <div>
                                <div className="text-xs text-slate-400 uppercase tracking-wider font-bold">Job Type</div>
                                <div className="font-semibold">{job.type}</div>
                            </div>
                        </div>
                        {/* Add more meta info if needed */}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    <section className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Job Description</h3>
                        <p className="text-slate-600 leading-relaxed text-lg">
                            {job.description}
                        </p>
                    </section>

                    <section className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Key Requirements</h3>
                        <ul className="space-y-3">
                            {job.requirements.map((req, i) => (
                                <li key={i} className="flex items-start text-slate-700">
                                    <FaCheckCircle className="mt-1 mr-3 text-emerald-500 flex-shrink-0" />
                                    <span className="leading-relaxed">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                    <section className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
                        <h3 className="text-xl font-bold text-slate-900 mb-4">Benefits</h3>
                        <ul className="space-y-3">
                            {job.benefits.map((benefit, i) => (
                                <li key={i} className="flex items-center text-slate-700">
                                    <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </section>

                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-xl text-white text-center space-y-4">
                        <h3 className="text-xl font-bold">Interested in this role?</h3>
                        <p className="text-slate-300 text-sm">Make sure you read the requirements before applying.</p>
                        <button
                            onClick={handleApply}
                            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-1"
                        >
                            Apply Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
