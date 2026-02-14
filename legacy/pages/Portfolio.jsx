import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const Portfolio = () => {
    const [filter, setFilter] = useState('All');
    const categories = ['All', 'Residential', 'Commercial / Hospitality', 'Collaboration', 'Educational'];

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => {
            if (filter === 'Commercial / Hospitality') return p.category.includes('Commercial') || p.category.includes('Hospitality');
            return p.category.includes(filter);
        });

    return (
        <div className="portfolio-container">
            {/* Header Area */}
            <section className="px-8 py-20 lg:py-32 flex flex-col gap-10 border-b border-gray-100 dark:border-gray-800">
                <div className="space-y-4">
                    <span className="font-mono text-[10px] text-gray-400 tracking-widest uppercase font-bold">Select Projects 2024—2026</span>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase leading-none">Portfolio</h1>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-4 font-mono text-[10px] tracking-widest uppercase font-bold">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`relative group cursor-pointer transition-colors ${filter === cat ? 'text-primary' : 'text-gray-400 hover:text-black dark:hover:text-white'
                                }`}
                        >
                            [ {cat} ]
                            {filter === cat && (
                                <span className="absolute -bottom-1 left-0 w-full h-px bg-primary scale-x-100"></span>
                            )}
                        </button>
                    ))}
                </div>
            </section>

            {/* Grid Area */}
            <section className="px-8 py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                    {filteredProjects.map((project) => (
                        <Link to={`/project/${project.id}`} key={project.id} className="group flex flex-col gap-5">
                            <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-900 rounded">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover grayscale transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                                />
                            </div>
                            <div className="flex flex-col gap-3 pt-2 border-t border-transparent group-hover:border-gray-100 dark:group-hover:border-gray-800 transition-all">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <svg className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.64645 11.3536C3.45118 11.5488 3.45118 11.8654 3.64645 12.0607C3.84171 12.2559 4.15829 12.2559 4.35355 12.0607L3.64645 11.3536ZM12.0607 4.35355C12.2559 4.15829 12.2559 3.84171 12.0607 3.64645C11.8654 3.45118 11.5488 3.45118 11.3536 3.64645L12.0607 4.35355ZM4.35355 12.0607L12.0607 4.35355L11.3536 3.64645L3.64645 11.3536L4.35355 12.0607Z" fill="currentColor" />
                                    </svg>
                                </div>
                                <div className="flex items-center gap-3 text-[10px] font-mono text-gray-400 uppercase tracking-tight">
                                    <span>{project.location}</span>
                                    <span className="size-1 bg-gray-200 dark:bg-gray-800 rounded-full"></span>
                                    <span>{project.year}</span>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                                    {project.intent}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-[9px] font-mono border border-gray-100 dark:border-gray-800 px-2 py-0.5 rounded-full uppercase text-gray-400">
                                        {project.category}
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest border-b border-transparent group-hover:border-black dark:group-hover:border-white pb-1 transition-all">View Project</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredProjects.length === 0 && (
                    <div className="py-40 text-center">
                        <p className="font-mono text-xs uppercase tracking-widest text-gray-400">No projects found in this category.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Portfolio;
