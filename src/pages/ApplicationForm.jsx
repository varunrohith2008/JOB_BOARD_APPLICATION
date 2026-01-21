import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { jobs } from '../data/jobs';
import { FaArrowLeft, FaPaperPlane, FaFileUpload } from 'react-icons/fa';

const ApplicationForm = () => {
    const { jobId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const job = jobs.find(j => j.id === parseInt(jobId));

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        coverLetter: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleBack = () => {
        // Navigate back to job details, preserving filters
        navigate(`/jobs/${jobId}`, { state: location.state });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate submission
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };

    if (!job) return <div>Job not found</div>;

    if (submitted) {
        return (
            <div className="max-w-xl mx-auto py-20 text-center animate-fade-in-up">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaPaperPlane size={40} />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Application Sent!</h2>
                <p className="text-lg text-slate-600 mb-8">
                    Thank you for applying to <strong>{job.company}</strong>. We will review your application and get back to you soon.
                </p>
                <button
                    onClick={() => navigate('/', { state: location.state })}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/30"
                >
                    Explore More Jobs
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-fade-in-up">
            <button
                onClick={handleBack}
                className="flex items-center text-slate-500 hover:text-indigo-600 transition-colors font-medium group"
            >
                <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Job Details
            </button>

            <div className="text-center space-y-2">
                <h1 className="text-3xl font-extrabold text-slate-900">Apply for {job.title}</h1>
                <p className="text-slate-500 text-lg">at {job.company}</p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-slate-100">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Varun Rohith"
                                className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                placeholder="+91 98765 43210"
                                className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            required
                            placeholder="you@example.com"
                            className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Resume / CV</label>
                        <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:border-indigo-400 hover:bg-slate-50 transition-all cursor-pointer group">
                            <FaFileUpload className="mx-auto text-3xl text-slate-400 group-hover:text-indigo-500 mb-2 transition-colors" />
                            <p className="text-slate-500 group-hover:text-slate-700 text-sm">
                                <span className="text-indigo-600 font-bold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-slate-400 mt-1">PDF, DOCX up to 10MB</p>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Cover Letter</label>
                        <textarea
                            name="coverLetter"
                            rows="4"
                            placeholder="Tell us why you're a great fit..."
                            className="w-full p-4 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50 outline-none transition-all resize-none"
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-1 transition-all"
                    >
                        Submit Application
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ApplicationForm;
