import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { projects } from '../data/projects';

const CaseStudy = () => {
    const { id } = useParams();
    const project = projects.find((p) => p.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!project) {
        return (
            <div className="py-40 text-center space-y-6">
                <h1 className="text-4xl font-bold uppercase">Project Not Found</h1>
                <Link to="/portfolio" className="text-primary font-mono text-xs uppercase tracking-widest border-b border-primary pb-1">
                    Back to Portfolio
                </Link>
            </div>
        );
    }

    return (
        <div className="case-study-container">
            {/* Project Hero */}
            <section className="px-8 py-20 lg:py-32 space-y-12 border-b border-gray-100 dark:border-gray-800">
                <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="space-y-4 flex-1">
                        <span className="font-mono text-[10px] text-primary tracking-widest uppercase font-bold">Case Study // {project.id}</span>
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase leading-none truncate">
                            {project.title}
                        </h1>
                    </div>
                    <div className="flex flex-col md:text-right font-mono text-[10px] uppercase tracking-widest space-y-2 text-gray-400 font-bold">
                        <p>{project.location}</p>
                        <p>Year: {project.year}</p>
                        <p>Role: {project.role.split('·')[0]}</p>
                    </div>
                </div>
            </section>

            {/* Main Image */}
            <section className="w-full aspect-video bg-gray-100 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale" />
            </section>

            {/* Split Grid Content */}
            <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-gray-100 dark:border-gray-800">
                {/* Left: Quick Facts Strip */}
                <aside className="lg:col-span-4 lg:border-r border-gray-100 dark:border-gray-800 p-8 lg:p-12 space-y-12">
                    <div>
                        <h4 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary mb-10 font-bold">Specifications</h4>
                        <div className="space-y-6">
                            <div className="flex flex-col border-b border-gray-100 dark:border-gray-800 pb-4">
                                <span className="text-[10px] uppercase font-mono text-gray-400 mb-1">Project Type</span>
                                <span className="text-lg font-light tracking-tight">{project.category}</span>
                            </div>
                            <div className="flex flex-col border-b border-gray-100 dark:border-gray-800 pb-4">
                                <span className="text-[10px] uppercase font-mono text-gray-400 mb-1">Location</span>
                                <span className="text-lg font-light tracking-tight">{project.location}</span>
                            </div>
                            <div className="flex flex-col border-b border-gray-100 dark:border-gray-800 pb-4">
                                <span className="text-[10px] uppercase font-mono text-gray-400 mb-1">Role</span>
                                <span className="text-lg font-light tracking-tight">{project.role}</span>
                            </div>
                            <div className="flex flex-col border-b border-gray-100 dark:border-gray-800 pb-4">
                                <span className="text-[10px] uppercase font-mono text-gray-400 mb-1">Year</span>
                                <span className="text-lg font-light tracking-tight">{project.year}</span>
                            </div>
                        </div>
                    </div>

                    <div className="pt-8">
                        <button className="w-full border border-primary text-primary hover:bg-primary hover:text-white py-4 px-6 font-mono text-[10px] uppercase tracking-widest transition-all font-bold">
                            Download Portfolio PDF
                        </button>
                    </div>
                </aside>

                {/* Right: Narrative sections */}
                <article className="lg:col-span-8 p-8 lg:p-12 space-y-20">
                    {/* Section 1 - Intent */}
                    <div className="space-y-8">
                        <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold">01 — Intent</h3>
                        <div className="space-y-6 max-w-2xl">
                            <p className="text-2xl lg:text-3xl font-light leading-snug tracking-tight">
                                {project.intent}
                            </p>
                            <p className="text-lg font-light leading-relaxed text-gray-500">
                                {project.fullIntent}
                            </p>
                        </div>
                    </div>

                    {/* Section 2 - Constraints */}
                    <div className="space-y-8">
                        <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold">02 — Constraints</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
                            {project.constraints.map((c, i) => (
                                <li key={i} className="flex items-start gap-3 text-sm font-light text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50 p-4 border border-gray-100 dark:border-gray-800">
                                    <span className="w-1.5 h-1.5 mt-1.5 bg-primary rounded-full shrink-0"></span>
                                    {c}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Section 3 - Solution */}
                    <div className="space-y-8">
                        <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold">03 — Solution</h3>
                        <p className="text-lg font-light leading-relaxed text-gray-500 max-w-2xl">
                            {project.solution}
                        </p>
                        {/* Diagram/Sketch area placeholder */}
                        <div className="aspect-[16/7] bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center p-10 grayscale opacity-40">
                            <img src={project.image} alt="Technical Diagram" className="h-full object-contain opacity-20" />
                            <span className="absolute font-mono text-[10px] uppercase tracking-widest">Structural Logic // Diagram</span>
                        </div>
                    </div>

                    {/* Section 4 - Technical */}
                    <div className="space-y-8">
                        <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold">04 — Technical</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
                            <div className="space-y-4">
                                <p className="text-sm font-light leading-relaxed text-gray-500">
                                    Plans, elevations, details, schedules, BIM notes (even if simplified).
                                </p>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900 aspect-square flex items-center justify-center border border-gray-100 dark:border-gray-800 grayscale opacity-20">
                                <span className="font-mono text-[8px] uppercase tracking-widest">BIM Package // CAD.DWG</span>
                            </div>
                        </div>
                    </div>

                    {/* Section 5 - Outcome */}
                    <div className="space-y-8 pb-10">
                        <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary font-bold">05 — Outcome</h3>
                        <p className="text-lg font-light leading-relaxed text-gray-500 max-w-2xl">
                            {project.spatialStrategy}
                        </p>
                    </div>
                </article>
            </section>

            {/* Footer CTA */}
            <section className="px-8 py-24 lg:py-40 bg-background-dark text-white space-y-12 border-t border-gray-800">
                <div className="max-w-2xl mx-auto text-center space-y-8">
                    <h2 className="text-4xl lg:text-5xl font-bold uppercase tracking-tighter">Have a similar project?</h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link to="/contact" className="bg-primary px-10 py-5 text-xs font-bold uppercase tracking-widest transition-all">
                            Start a Project
                        </Link>
                        <Link to="/portfolio" className="border border-gray-600 px-10 py-5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                            All Works
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CaseStudy;
