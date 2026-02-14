import React from 'react';

const Contact = () => {
    return (
        <div className="contact-container">
            <main className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 px-8 py-16 lg:py-24">
                {/* Left Side: Information */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-16">
                    <div>
                        <h1 className="text-5xl lg:text-7xl font-bold leading-[0.9] tracking-tighter mb-16 max-w-sm uppercase">
                            Let’s build with clarity.
                        </h1>
                        <div className="space-y-12">
                            <section>
                                <p className="mono-text text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3 font-bold">Contact</p>
                                <a className="text-lg lg:text-xl font-light hover:text-primary transition-colors block" href="mailto:hello@vartexarchitects.com">
                                    hello@vartexarchitects.com
                                </a>
                                <p className="text-lg lg:text-xl font-light mt-1">+234 (0) 800 VARTEX</p>
                            </section>
                            <section>
                                <p className="mono-text text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3 font-bold">Socials</p>
                                <div className="flex flex-wrap gap-x-6 gap-y-2 mono-text text-xs uppercase tracking-widest">
                                    <a className="hover:text-primary transition-colors" href="#">LinkedIn</a>
                                    <a className="hover:text-primary transition-colors" href="#">Instagram</a>
                                    <a className="hover:text-primary transition-colors" href="#">Behance</a>
                                </div>
                            </section>
                            <section>
                                <p className="mono-text text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3 font-bold">Office</p>
                                <address className="not-italic text-lg lg:text-xl font-light leading-relaxed">
                                    Lagos, Nigeria<br />
                                    Enugu, Nigeria<br />
                                    <span className="mono-text text-xs text-gray-500 mt-2 block tracking-widest">Available for Remote Collaborations</span>
                                </address>
                            </section>
                        </div>
                    </div>
                </div>

                {/* Right Side: Inquiry Form */}
                <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-gray-800 lg:pl-24 pt-12 lg:pt-0">
                    <h2 className="mono-text text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-12 font-bold">Project Inquiry</h2>
                    <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            <div className="relative group">
                                <label className="mono-text text-[10px] uppercase tracking-widest text-gray-400 mb-2 block font-bold">Full Name</label>
                                <input className="w-full bg-transparent border-0 border-b border-gray-200 dark:border-gray-700 focus:ring-0 focus:border-primary px-0 py-2 text-lg font-light transition-all placeholder:text-gray-300" placeholder="John Doe" type="text" />
                            </div>
                            <div className="relative group">
                                <label className="mono-text text-[10px] uppercase tracking-widest text-gray-400 mb-2 block font-bold">Project Type</label>
                                <select className="w-full bg-transparent border-0 border-b border-gray-200 dark:border-gray-700 focus:ring-0 focus:border-primary px-0 py-2 text-lg font-light transition-all appearance-none">
                                    <option>Residential</option>
                                    <option>Commercial</option>
                                    <option>Interior</option>
                                    <option>Other</option>
                                </select>
                            </div>
                        </div>
                        <div className="relative group">
                            <label className="mono-text text-[10px] uppercase tracking-widest text-gray-400 mb-2 block font-bold">Site Location</label>
                            <input className="w-full bg-transparent border-0 border-b border-gray-200 dark:border-gray-700 focus:ring-0 focus:border-primary px-0 py-2 text-lg font-light transition-all placeholder:text-gray-300" placeholder="City, State" type="text" />
                        </div>
                        <div className="relative group">
                            <label className="mono-text text-[10px] uppercase tracking-widest text-gray-400 mb-2 block font-bold">Project Brief</label>
                            <textarea className="w-full bg-transparent border-0 border-b border-gray-200 dark:border-gray-700 focus:ring-0 focus:border-primary px-0 py-2 text-lg font-light transition-all placeholder:text-gray-300 resize-none" placeholder="Describe your vision and requirements..." rows="4"></textarea>
                        </div>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pt-8">
                            <p className="text-[10px] text-gray-400 max-w-xs leading-relaxed uppercase tracking-tight">
                                By sending this inquiry you agree to our privacy policy and the storage of your data for architectural consultation.
                            </p>
                            <button className="group relative flex min-w-[240px] h-14 items-center justify-center overflow-hidden border border-black dark:border-white bg-black dark:bg-white text-white dark:text-black transition-all hover:bg-transparent hover:text-black dark:hover:text-white" type="submit">
                                <span className="mono-text text-sm font-bold uppercase tracking-[0.2em] relative z-10">Send Inquiry</span>
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Contact;
