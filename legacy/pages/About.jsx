import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="about-container">
            {/* Header Section */}
            <section className="px-8 py-24 lg:py-40 space-y-8 max-w-5xl">
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-none mb-6">
                    Architecture guided by clarity, culture, and climate.
                </h1>
                <p className="text-xl lg:text-2xl font-light text-gray-500 leading-relaxed">
                    I approach design as a disciplined process—where concept, context, and technical precision meet.
                </p>
            </section>

            {/* Main Content */}
            <section className="px-8 py-20 grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-gray-100 dark:border-gray-800">
                <div className="lg:col-span-7 space-y-12">
                    <div className="space-y-6 text-xl font-light leading-relaxed text-gray-700 dark:text-gray-300">
                        <p>
                            I began my architectural journey at the University of Nigeria, Enugu Campus, where I learned the discipline of functional design. I later advanced to the University of Lagos, deepening my understanding of architectural concepts and their cultural influence.
                        </p>
                        <p>
                            VARTEX Architects is an independent practice built around one principle: strong ideas deserve strong execution. I focus on creating spaces that are practical, cost-aware, and grounded in identity—while responding intelligently to climate and context.
                        </p>
                        <p>
                            Every project is treated as a guided journey. I listen carefully to your vision, translate it into a clear design direction, and develop it into documentation that supports confident construction.
                        </p>
                        <p>
                            I work with advanced CAD and BIM workflows, using tools such as Revit, SketchUp, Rhino, D5 Render, and Unreal Engine—allowing ideas to be tested early and communicated with clarity through immersive visualization.
                        </p>
                    </div>

                    <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
                        <h3 className="text-xl font-bold">Michael Mbah</h3>
                        <p className="text-xs uppercase tracking-widest text-gray-400 font-mono mt-1">Founder, VARTEX Architects</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 pt-12">
                        <Link to="/contact" className="bg-black dark:bg-white text-white dark:text-black px-10 py-5 text-xs font-bold uppercase tracking-widest text-center transition-all">
                            Schedule a Consultation
                        </Link>
                        <Link to="/portfolio" className="border border-black dark:border-white text-black dark:text-white px-10 py-5 text-xs font-bold uppercase tracking-widest text-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                            View Selected Works
                        </Link>
                    </div>
                </div>

                <div className="lg:col-span-5 hidden lg:block">
                    <div className="sticky top-32 aspect-[4/5] bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden">
                        {/* Placeholder for Michael Mbah or studio image */}
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-d8rHcalWlJi9FBjSPmMTmEOiV-Zh5CxleTsHpohl-MSUkiM9bYzoCLnvNSN3m-OicaY0bq4jPdUBKTBqJdJtA1nc4eUBhenQzipU7JY5Z0bnz1RMdDN44Ovh6tlp7CLrpjKsIziEl8jGRuTkF_YUABwemR96CdZMUr-mHPLKvgt_NshXXS1mTCqV3z1tG5J1Q6iS_fRpRg30Vu_Ry1VbdvaX1XxaClKOqkuC0JAIaxCyaEEL7RwlRWoyEnbHHspEb4Ji8_kr"
                            className="w-full h-full object-cover grayscale"
                            alt="Vartex Architects"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
