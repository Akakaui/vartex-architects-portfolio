import React from 'react';
import { Link } from 'react-router-dom';

const Services = () => {
    const serviceList = [
        {
            title: 'Architectural Design',
            description: 'Design direction, planning, and façade studies rooted in site + purpose.',
            deliverables: 'concept options, plans, elevations, 3D studies',
            linkText: 'See Relevant Projects'
        },
        {
            title: 'Interior Design',
            description: 'Spaces designed for flow, comfort, and long-term usability.',
            deliverables: 'layouts, mood + material direction, interior detailing',
            linkText: 'See Relevant Projects'
        },
        {
            title: 'Technical Design (CAD/BIM)',
            description: 'Construction-ready documentation with precision and coordination.',
            deliverables: 'working drawings, schedules, technical packages',
            linkText: 'Discuss Technical Scope'
        },
        {
            title: '3D Visualization',
            description: 'Visual studies to validate choices before committing on site.',
            deliverables: 'still renders, walkthroughs, design revisions support',
            linkText: 'Request a Visualization Package'
        }
    ];

    return (
        <div className="services-container">
            {/* Header Section */}
            <section className="px-8 py-24 lg:py-40 space-y-8 border-b border-gray-100 dark:border-gray-800">
                <h1 className="text-5xl lg:text-7xl font-bold tracking-tighter leading-none mb-6 uppercase">
                    Services & Capabilities
                </h1>
                <p className="text-xl lg:text-2xl font-light text-gray-500 leading-relaxed max-w-4xl">
                    Concept-led design supported by technical rigor—so projects move from vision to buildable reality.
                </p>
            </section>

            {/* Services Grid */}
            <section className="px-8 py-20 space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-gray-100 dark:bg-gray-800 border border-gray-100 dark:border-gray-800">
                    {serviceList.map((service, index) => (
                        <div key={index} className="bg-white dark:bg-background-dark p-12 space-y-10 group hover:grayscale-0 transition-all">
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-widest">Service // 0{index + 1}</span>
                                <div className="w-10 h-px bg-gray-200 dark:bg-gray-700 group-hover:bg-primary group-hover:w-20 transition-all"></div>
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-3xl font-bold tracking-tight">{service.title}</h2>
                                <p className="text-lg font-light text-gray-500 leading-relaxed">
                                    {service.description}
                                </p>
                                <div className="space-y-2">
                                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Deliverables:</span>
                                    <p className="text-sm font-mono text-gray-400">{service.deliverables}</p>
                                </div>
                            </div>

                            <Link to="/portfolio" className="inline-flex items-center gap-4 text-xs font-bold uppercase tracking-widest border-b border-black dark:border-white pb-2 hover:text-primary hover:border-primary transition-all">
                                {service.linkText}
                                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.64645 11.3536C3.45118 11.5488 3.45118 11.8654 3.64645 12.0607C3.84171 12.2559 4.15829 12.2559 4.35355 12.0607L3.64645 11.3536ZM12.0607 4.35355C12.2559 4.15829 12.2559 3.84171 12.0607 3.64645C11.8654 3.45118 11.5488 3.45118 11.3536 3.64645L12.0607 4.35355ZM4.35355 12.0607L12.0607 4.35355L11.3536 3.64645L3.64645 11.3536L4.35355 12.0607Z" fill="currentColor" />
                                    <path d="M12 11V4H5" stroke="currentColor" strokeWidth="2" />
                                </svg>
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Bottom CTA Section */}
            <section className="px-8 py-32 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 text-center space-y-10">
                <h2 className="text-4xl lg:text-5xl font-bold tracking-tighter uppercase leading-none">Have a project brief?</h2>
                <div className="space-y-4">
                    <Link to="/contact" className="inline-block bg-primary text-white px-12 py-5 text-xs font-bold uppercase tracking-widest hover:bg-black transition-all">
                        Start a Project
                    </Link>
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-mono">
                        Response within 24–48 hours
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Services;
