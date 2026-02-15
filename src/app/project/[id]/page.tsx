"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Download, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PROJECT_DATA = {
    "lux-residence": {
        title: "The Lattice House.",
        client: "Private Residential",
        location: "Enugu, Nigeria",
        year: "2024",
        area: "1,200 SQM",
        description: "A residential project focusing on the intersection of privacy and permeability. The lattice structure allows for controlled natural ventilation while maintaining a sense of enclosure.",
        images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuB2v_j3m-nF6-W9C6yJEqg-Mhzm7Y7o-W1K-Y3v_0v-q_w-x-X-x-X-x-X-x-X-x-X-x-X-x-X-X-X-X-X-X-X-X-X-X-X-X-X-X"
        ],
        specs: [
            { label: "Materiality", value: "Exposed Concrete, Teak Wood, Steel" },
            { label: "Sustainability", value: "Passive Solar Design, Rainwater Harvesting" },
            { label: "Duration", value: "18 Months" }
        ]
    }
};

export default function ProjectDetail() {
    const { id } = useParams();
    const project = PROJECT_DATA[id as keyof typeof PROJECT_DATA] || PROJECT_DATA["lux-residence"];
    const mainRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".hero-content > *", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "power3.out",
            });

            gsap.from(".spec-item", {
                scrollTrigger: {
                    trigger: ".specs-container",
                    start: "top 80%",
                },
                x: -20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out"
            });
        }, mainRef);
        return () => ctx.revert();
    }, [id]);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main ref={mainRef} className="flex-grow architectural-grid bg-white dark:bg-background-dark">
                {/* Hero Section */}
                <section className="relative h-[80vh] min-h-[600px] flex items-end px-8 lg:px-24 py-24 bg-background-dark overflow-hidden text-white">
                    <div className="absolute inset-0 z-0">
                        <img
                            src={project.images[0]}
                            alt={project.title}
                            className="w-full h-full object-cover grayscale brightness-50 contrast-125"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/40 to-transparent"></div>
                    </div>

                    <div className="hero-content relative z-10 w-full flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-xs tracking-[0.4em] uppercase text-white/60">PROJECT ARCHIVE // {id}</span>
                            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.85] tracking-tighter uppercase whitespace-pre-wrap">
                                {project.title.split(' ').map((word, i) => (
                                    <span key={i} className={i % 2 === 1 ? "text-transparent" : ""} style={i % 2 === 1 ? { WebkitTextStroke: '1px rgba(255,255,255,0.3)' } : {}}>
                                        {word}{' '}
                                    </span>
                                ))}
                            </h1>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-white/10 mt-8">
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[10px] uppercase text-white/40 tracking-widest">Client</span>
                                <span className="font-bold tracking-tight">{project.client}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[10px] uppercase text-white/40 tracking-widest">Location</span>
                                <span className="font-bold tracking-tight">{project.location}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[10px] uppercase text-white/40 tracking-widest">Year</span>
                                <span className="font-bold tracking-tight">{project.year}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="font-mono text-[10px] uppercase text-white/40 tracking-widest">Area</span>
                                <span className="font-bold tracking-tight">{project.area}</span>
                            </div>
                        </div>
                    </div>

                    {/* Technical Axis Mark */}
                    <div className="absolute top-1/2 right-12 w-32 h-32 pointer-events-none opacity-20 hidden lg:block">
                        <div className="absolute top-0 right-16 w-[1px] h-full bg-white"></div>
                        <div className="absolute top-16 right-0 w-full h-[1px] bg-white"></div>
                        <div className="absolute top-16 right-16 w-3 h-3 -mt-[6px] -mr-[6px] border border-white rotate-45"></div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="px-8 lg:px-24 py-24 grid grid-cols-1 md:grid-cols-12 gap-16 lg:gap-24">
                    <div className="md:col-span-12 lg:col-span-8 flex flex-col gap-12">
                        <div className="flex flex-col gap-6">
                            <h2 className="text-3xl font-black uppercase tracking-tight text-primary dark:text-white">Design Intelligence.</h2>
                            <p className="text-xl lg:text-2xl font-light leading-relaxed text-primary/80 dark:text-white/80 italic">
                                "{project.description}"
                            </p>
                        </div>

                        <div className="aspect-video w-full bg-neutral-100 dark:bg-neutral-900 overflow-hidden rounded-sm relative group">
                            <img
                                src={project.images[0]}
                                alt="Technical Drawing"
                                className="w-full h-full object-cover grayscale opacity-80 group-hover:opacity-100 transition-opacity duration-700"
                            />
                            {/* SVG Overlay: technical lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                                <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeWidth="0.1" className="text-primary dark:text-white" />
                                <line x1="50" y1="0" x2="50" y2="100" stroke="currentColor" strokeWidth="0.1" className="text-primary dark:text-white" />
                            </svg>
                        </div>
                    </div>

                    {/* Specs Sidebar */}
                    <div className="md:col-span-12 lg:col-span-4 specs-container flex flex-col gap-10">
                        <div className="flex flex-col gap-6 p-8 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-white/5 rounded-sm">
                            <h3 className="font-mono text-xs tracking-[0.3em] uppercase text-primary/40 dark:text-white/40">Specifications</h3>
                            <div className="flex flex-col gap-8">
                                {project.specs.map((spec, i) => (
                                    <div key={i} className="spec-item flex flex-col gap-1">
                                        <span className="font-mono text-[10px] uppercase text-primary/40 dark:text-white/40 tracking-widest">{spec.label}</span>
                                        <span className="font-bold text-lg text-primary dark:text-white">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 pt-10 border-t border-neutral-100 dark:border-white/5">
                            <button className="group flex items-center justify-between w-full px-6 py-4 border border-primary dark:border-white hover:bg-primary dark:hover:bg-white text-primary dark:text-white hover:text-white dark:hover:text-primary transition-all duration-300 rounded-sm">
                                <span className="font-bold tracking-widest text-xs uppercase">Download Blueprint</span>
                                <Download className="w-4 h-4" />
                            </button>
                            <button className="group flex items-center justify-between w-full px-6 py-4 border border-primary/20 dark:border-white/20 hover:border-primary dark:hover:border-white text-primary dark:text-white transition-all duration-300 rounded-sm">
                                <span className="font-bold tracking-widest text-xs uppercase">Next Project</span>
                                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
