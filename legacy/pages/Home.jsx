import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const heroRef = useRef(null);
    const philosophyRef = useRef(null);
    const worksRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.from('.hero-content > *', {
                y: 60,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power4.out',
            });

            // Philosophy Animation
            gsap.from(philosophyRef.current, {
                scrollTrigger: {
                    trigger: philosophyRef.current,
                    start: 'top 80%',
                },
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
            });

            // Works Animation
            gsap.from('.project-card', {
                scrollTrigger: {
                    trigger: worksRef.current,
                    start: 'top 70%',
                },
                y: 60,
                opacity: 0,
                duration: 1,
                stagger: 0.3,
                ease: 'power3.out',
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section ref={heroRef} className="relative h-[90vh] flex items-center px-8 overflow-hidden bg-background-dark text-white">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxTU3eR0UFLAMqRe9RBZSNC5lzAcM6tXXsJAoBIW8lDGVX3PrbjJWngCvAnYGAQQa-YXzZxuNWV9ujAeY1OEIIKHS4MUmiBseqFxKTulkiqksxsLl4_r0D7k0uqQ9uogm9eXZghp0tYyzj46mmqohX4No4HbQ5HrYkBEQjuDyE_TdJ_8UCHrsCNnAuTi0eUA32o0B1sh373RkEHTB6SLClGbS-fDOFpiDilLbKVBb_8LPgsicpbXWKx2eq5W0MJsju4-7BoHE5"
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>

                <div className="relative z-10 max-w-4xl hero-content space-y-8">
                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tighter">
                        Architecture shaped by idea, context, and precision.
                    </h1>
                    <p className="text-lg lg:text-xl font-light text-gray-300 max-w-2xl">
                        I design residential, commercial, and hospitality projects—moving from concept development and visualization to construction-ready technical documentation.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 pt-4">
                        <Link to="/portfolio" className="bg-primary text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all text-center">
                            View Selected Works
                        </Link>
                        <Link to="/contact" className="border border-white text-white px-8 py-4 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all text-center">
                            Start a Project
                        </Link>
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">
                        Independent practice · Nigeria-based · Available for remote collaborations
                    </p>
                </div>
            </section>

            {/* Philosophy Section */}
            <section ref={philosophyRef} className="px-8 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-16 border-b border-gray-100 dark:border-gray-800">
                <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter leading-none">
                    Design begins long before construction.
                </h2>
                <p className="text-xl font-light leading-relaxed text-gray-600 dark:text-gray-400">
                    Every project starts with understanding: the site, the brief, the budget, and the experience you want the space to create. My role is to translate that into a clear concept—then deliver the drawings and models that make it buildable.
                </p>
            </section>

            {/* Selected Works Section */}
            <section ref={worksRef} className="px-8 py-24 lg:py-32 space-y-16">
                <div className="flex flex-col md:flex-row justify-between items-end gap-6">
                    <div className="space-y-4">
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter uppercase">Selected Works</h2>
                        <p className="text-lg font-light text-gray-500 max-w-md">
                            A focused selection of built, collaborative, and conceptual projects—presented as design intent, not just imagery.
                        </p>
                    </div>
                    <Link to="/portfolio" className="text-xs font-bold uppercase tracking-widest border-b border-black dark:border-white pb-2">
                        View Full Portfolio
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                    {projects.slice(0, 4).map((project) => (
                        <div key={project.id} className="project-card group flex flex-col gap-6">
                            <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 dark:bg-gray-900">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                                />
                            </div>
                            <div className="space-y-3">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
                                        <p className="text-xs uppercase tracking-widest text-gray-400 mt-1 font-mono">
                                            {project.location} · {project.year}
                                        </p>
                                    </div>
                                    <span className="text-[10px] font-mono border border-gray-200 dark:border-gray-800 px-2 py-0.5 uppercase">
                                        {project.category}
                                    </span>
                                </div>
                                <p className="text-base font-light text-gray-600 dark:text-gray-400 line-clamp-2">
                                    {project.intent}
                                </p>
                                <Link to={`/project/${project.id}`} className="inline-block text-[10px] font-bold uppercase tracking-widest border-b border-transparent hover:border-black dark:hover:border-white pb-1 transition-all">
                                    View Case Study
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Capabilities Section */}
            <section className="px-8 py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/50 border-y border-gray-100 dark:border-gray-800">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    <div className="lg:col-span-4 space-y-6">
                        <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter uppercase leading-none">Capabilities</h2>
                        <p className="text-lg font-light text-gray-500">
                            A complete workflow—from early concept to technical execution.
                        </p>
                        <Link to="/services" className="inline-block bg-black dark:bg-white text-white dark:text-black px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all">
                            Explore Services
                        </Link>
                    </div>
                    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Architecture</h3>
                            <p className="text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
                                Concept development, site analysis, planning, façade studies, design coordination.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Interior Design</h3>
                            <p className="text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
                                Space planning, material logic, mood + detailing aligned with architectural intent.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">Technical Design</h3>
                            <p className="text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
                                CAD/BIM drawings, schedules, and documentation prepared for construction accuracy.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold">3D Visualization</h3>
                            <p className="text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
                                High-fidelity renders and walkthroughs to validate decisions before site work.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="px-8 py-24 lg:py-32 space-y-16">
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter uppercase text-center">Process</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
                    <div className="space-y-6 relative group">
                        <span className="text-6xl font-bold text-gray-100 dark:text-gray-800 absolute -top-10 -left-4 z-0 group-hover:text-primary/10 transition-colors">01</span>
                        <div className="relative z-10 space-y-4">
                            <h3 className="text-xl font-bold">Discovery</h3>
                            <p className="text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
                                Clarify requirements, site constraints, and project goals through consultation.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6 relative group">
                        <span className="text-6xl font-bold text-gray-100 dark:text-gray-800 absolute -top-10 -left-4 z-0 group-hover:text-primary/10 transition-colors">02</span>
                        <div className="relative z-10 space-y-4">
                            <h3 className="text-xl font-bold">Conceptualization</h3>
                            <p className="text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
                                Sketches, diagrams, and 3D massing to test spatial logic and design intent.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-6 relative group">
                        <span className="text-6xl font-bold text-gray-100 dark:text-gray-800 absolute -top-10 -left-4 z-0 group-hover:text-primary/10 transition-colors">03</span>
                        <div className="relative z-10 space-y-4">
                            <h3 className="text-xl font-bold">Technical Execution</h3>
                            <p className="text-sm font-light leading-relaxed text-gray-600 dark:text-gray-400">
                                Precise CAD/BIM drawings and visualizations prepared for construction.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center pt-8">
                    <Link to="/contact" className="border border-black dark:border-white px-10 py-4 text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                        Schedule a Consultation
                    </Link>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="px-8 py-24 lg:py-40 bg-background-dark text-white text-center space-y-10">
                <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter uppercase">Ready to begin?</h2>
                <p className="text-xl font-light text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    Share your brief, site location, and timeline. I’ll respond with next steps.
                </p>
                <Link to="/contact" className="inline-block bg-primary text-white border border-primary px-12 py-5 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all">
                    Start a Project
                </Link>
            </section>
        </div>
    );
};

export default Home;
