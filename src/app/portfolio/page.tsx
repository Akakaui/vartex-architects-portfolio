"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

const PROJECTS = [
    {
        id: "lux-residence",
        title: "The Lattice House.",
        category: "Residential",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2v_j3m-nF6-W9C6yJEqg-Mhzm7Y7o-W1K-Y3v_0v-q_w-x-X-x-X-x-X-x-X-x-X-x-X-x-X-X-X-X-X-X-X-X-X-X-X-X-X-X", // Placeholder
        dimensions: "1,200 SQM",
        location: "Enugu, NG"
    },
    {
        id: "urban-hub",
        title: "Monolith Office Complex.",
        category: "Commercial",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZodjKOy4XxkOUPno-_MhkVaQDXqXpxTR-4GXlwu9mBScxBFRIXhRs1HtLVWibQlfUQcdZOW4OCec4RqsPyiib4PbJjMph-Ty27Iig5Ed9Ac2vRjgmDquX31ACFwVebusSYI_ofRZ54Q10MmymqF5nvxqnFA6ndwHOJPebAy-P1tdVxdlX1cNHpwWtUIuA0u3msVJsgHLaqwlNuOCk_u6bfT9lMduz3Ts6EMDnQvNDIegrPAz26ahk3MasiF6AnMQUtamypZ32",
        dimensions: "4,500 SQM",
        location: "Lagos, NG"
    },
    {
        id: "tech-pavilion",
        title: "The Void Pavilion.",
        category: "Cultural",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZodjKOy4XxkOUPno-_MhkVaQDXqXpxTR-4GXlwu9mBScxBFRIXhRs1HtLVWibQlfUQcdZOW4OCec4RqsPyiib4PbJjMph-Ty27Iig5Ed9Ac2vRjgmDquX31ACFwVebusSYI_ofRZ54Q10MmymqF5nvxqnFA6ndwHOJPebAy-P1tdVxdlX1cNHpwWtUIuA0u3msVJsgHLaqwlNuOCk_u6bfT9lMduz3Ts6EMDnQvNDIegrPAz26ahk3MasiF6AnMQUtamypZ32",
        dimensions: "800 SQM",
        location: "Abuja, NG"
    },
    {
        id: "minimal-vlla",
        title: "Brutalist Villa.",
        category: "Residential",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZodjKOy4XxkOUPno-_MhkVaQDXqXpxTR-4GXlwu9mBScxBFRIXhRs1HtLVWibQlfUQcdZOW4OCec4RqsPyiib4PbJjMph-Ty27Iig5Ed9Ac2vRjgmDquX31ACFwVebusSYI_ofRZ54Q10MmymqF5nvxqnFA6ndwHOJPebAy-P1tdVxdlX1cNHpwWtUIuA0u3msVJsgHLaqwlNuOCk_u6bfT9lMduz3Ts6EMDnQvNDIegrPAz26ahk3MasiF6AnMQUtamypZ32",
        dimensions: "950 SQM",
        location: "Lagos, NG"
    }
];

const CATEGORIES = ["All", "Residential", "Commercial", "Cultural", "Urban"];

export default function Portfolio() {
    const [filter, setFilter] = useState("All");
    const containerRef = useRef(null);

    const filteredProjects = filter === "All"
        ? PROJECTS
        : PROJECTS.filter(p => p.category === filter);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".portfolio-item", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out",
                overwrite: "auto"
            });
        }, containerRef);
        return () => ctx.revert();
    }, [filter]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="flex-grow architectural-grid bg-white dark:bg-background-dark">
                {/* Header Section */}
                <section className="px-8 lg:px-24 py-16 lg:py-24 flex flex-col items-center gap-12 border-b border-neutral-100 dark:border-white/5" aria-label="Portfolio header">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <span className="font-mono text-[10px] tracking-[0.4em] text-primary/40 dark:text-white/40 uppercase">Archived Works — Index 001/2026</span>
                        <h1 className="text-6xl lg:text-9xl font-black uppercase tracking-tighter leading-none text-primary dark:text-white">
                            PROJECTS.
                        </h1>
                    </div>

                    {/* Filter UI */}
                    <div className="flex flex-wrap justify-center gap-4 lg:gap-8 border-y border-neutral-100 dark:border-white/5 py-4 w-full" role="tablist" aria-label="Project categories">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                role="tab"
                                aria-selected={filter === cat}
                                className={`px-4 py-2 font-mono text-xs uppercase tracking-widest transition-all duration-300 relative ${filter === cat ? "text-primary dark:text-white" : "text-primary/40 dark:text-white/40 hover:text-primary dark:hover:text-white"
                                    }`}
                            >
                                {cat}
                                {filter === cat && (
                                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary dark:bg-white animate-pulse"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </section>

                {/* Projects Grid */}
                <section ref={containerRef} className="px-8 lg:px-24 py-24 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24" aria-label="Project grid">
                    {filteredProjects.map((project, index) => (
                        <Link
                            href={`/project/${project.id}`}
                            key={project.id}
                            aria-label={`View details for ${project.title}`}
                            className="portfolio-item group flex flex-col gap-6"
                        >
                            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800 rounded-sm">
                                {/* Corner axis marks */}
                                <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="absolute top-4 left-0 w-full h-[1px] bg-white"></div>
                                    <div className="absolute top-0 left-4 h-full w-[1px] bg-white"></div>
                                </div>

                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 border border-white/20"></div>

                                <div className="absolute bottom-6 right-6 font-mono text-[10px] text-white opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500 tracking-widest flex items-center gap-2">
                                    VIEW SPECIFICATIONS <ArrowRight className="w-3 h-3" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-baseline">
                                    <h3 className="text-2xl font-bold uppercase tracking-tight text-primary dark:text-white group-hover:translate-x-2 transition-transform duration-500">{project.title}</h3>
                                    <span className="font-mono text-[10px] text-primary/40 dark:text-white/40">{index + 1}.0</span>
                                </div>
                                <div className="flex items-center gap-6 font-mono text-[10px] tracking-widest text-primary/60 dark:text-white/60">
                                    <span>{project.category}</span>
                                    <div className="w-1 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-full"></div>
                                    <span>{project.dimensions}</span>
                                    <div className="w-1 h-1 bg-neutral-300 dark:bg-neutral-700 rounded-full"></div>
                                    <span>{project.location}</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </section>

                {/* Tech Metadata Footer */}
                <section className="px-8 lg:px-24 py-12 flex justify-between border-t border-neutral-100 dark:border-white/5 font-mono text-[10px] text-primary/40 dark:text-white/40 uppercase tracking-[0.2em]">
                    <span>STATUS: ALL SYSTEMS OPERATIONAL</span>
                    <span>COORDINATES: 6.5244° N, 3.3792° E</span>
                </section>
            </main>

            <Footer />
        </div>
    );
}
