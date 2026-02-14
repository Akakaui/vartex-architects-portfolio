import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
    const location = useLocation();

    const navLinks = [
        { name: 'Projects', path: '/portfolio' },
        { name: 'About', path: '/about' },
        { name: 'Capabilities', path: '/services' },
        { name: 'Contact', path: '/contact' },
    ];

    return (
        <div className="layout-container flex flex-col min-h-screen">
            {/* Corner Axis Marks */}
            <div className="axis-mark axis-tl"></div>
            <div className="axis-mark axis-tr"></div>
            <div className="axis-mark axis-bl"></div>
            <div className="axis-mark axis-br"></div>

            {/* Top Navigation */}
            <header className="sticky top-0 flex items-center justify-between border-b border-[#f0f2f4] dark:border-gray-800 px-8 py-6 bg-white/90 dark:bg-background-dark/90 backdrop-blur-md z-50">
                <Link to="/" className="flex items-center gap-3">
                    <div className="size-6 text-primary">
                        <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold tracking-tighter uppercase font-display">VARTEX</h2>
                </Link>
                <nav className="hidden md:flex flex-1 justify-center gap-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-[10px] uppercase tracking-widest font-medium hover:text-primary transition-colors ${location.pathname === link.path ? 'border-b border-primary text-primary' : ''
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-4">
                    <Link
                        to="/contact"
                        className="flex min-w-[120px] items-center justify-center rounded border border-black dark:border-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                    >
                        Start a Project
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 w-full max-w-[1440px] mx-auto z-10">
                {children}
            </main>

            {/* Footer */}
            <footer className="px-8 py-12 border-t border-gray-100 dark:border-gray-800 flex flex-col items-center gap-10">
                <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-12 max-w-[1440px]">
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-xl font-bold uppercase tracking-tighter mb-6">VARTEX</h2>
                        <p className="text-sm text-gray-500 max-w-sm leading-relaxed">
                            VARTEX Architects is an independent practice built around one principle: strong ideas deserve strong execution.
                        </p>
                    </div>
                    <div>
                        <h4 className="mono-text text-[10px] uppercase tracking-widest text-gray-400 mb-6 font-bold">Studio</h4>
                        <div className="flex flex-col gap-3 text-sm">
                            <Link to="/portfolio" className="hover:text-primary">Projects</Link>
                            <Link to="/about" className="hover:text-primary">About</Link>
                            <Link to="/services" className="hover:text-primary">Services</Link>
                        </div>
                    </div>
                    <div>
                        <h4 className="mono-text text-[10px] uppercase tracking-widest text-gray-400 mb-6 font-bold">Social</h4>
                        <div className="flex flex-col gap-3 text-sm">
                            <a href="#" className="hover:text-primary">LinkedIn</a>
                            <a href="#" className="hover:text-primary">Instagram</a>
                            <a href="#" className="hover:text-primary">Behance</a>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-gray-50 dark:border-gray-900">
                    <p className="mono-text text-[9px] uppercase text-gray-400 tracking-widest">© 2026 VARTEX ARCHITECTS — LAGOS / ENUGU / REMOTE</p>
                    <div className="flex gap-8 mono-text text-[9px] uppercase tracking-widest text-gray-400">
                        <span className="hover:text-black dark:hover:text-white cursor-pointer">Privacy</span>
                        <span className="hover:text-black dark:hover:text-white cursor-pointer">Terms</span>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
