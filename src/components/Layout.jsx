import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            <header className="bg-white shadow-sm sticky top-0 z-50 transition-all duration-300 backdrop-blur-md bg-opacity-90 border-b border-slate-100">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                        JobBoard
                    </Link>
                    <nav>
                        <ul className="flex space-x-6">
                            <li>
                                <Link to="/" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">
                                    Find Jobs
                                </Link>
                            </li>
                            <li>
                                <a href="#" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">
                                    Companies
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-slate-600 hover:text-indigo-600 font-medium transition-colors">
                                    Salaries
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <main className="container mx-auto px-4 py-8 relative">
                {children}
            </main>
            <footer className="bg-slate-900 text-slate-400 py-8 mt-12">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; {new Date().getFullYear()} JobBoard by Varun & Team. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
