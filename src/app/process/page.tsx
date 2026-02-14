"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";

const STEPS = [
    {
        id: "01",
        title: "Conception & Strategy",
        subtitle: "DEFINING THE ARCHITECTURAL DNA",
        description: "Every project begins as a dialogue. We work closely with our clients to define the core DNA of the structure, considering site constraints, cultural context, and functional requirements.",
        details: [
            "Site Analysis & Contextual Mapping",
            "Conceptual Sketching",
            "Feasibility Studies",
            "Project Brief Development"
        ],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2v_j3m-nF6-W9C6yJEqg-Mhzm7Y7o-W1K-Y3v_0v-q_w-x-X-x-X-x-X-x-X-x-X-x-X-x-X-X-X-X-X-X-X-X-X-X-X-X-X-X"
    },
    {
        id: "02",
        title: "Schematic Design",
        subtitle: "TRANSFORMATION INTO FORM",
        description: "In this phase, sketches evolve into rigorous technical drawings and 3D models. We refine the geometry, light penetration, and structural logic of the building.",
        details: [
            "3D Volumetric Modeling",
            "Material Research & Sourcing",
            "Floor Plan Optimization",
            "Structural Coordination"
        ],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZodjKOy4XxkOUPno-_MhkVaQDXqXpxTR-4GXlwu9mBScxBFRIXhRs1HtLVWibQlfUQcdZOW4OCec4RqsPyiib4PbJjMph-Ty27Iig5Ed9Ac2vRjgmDquX31ACFwVebusSYI_ofRZ54Q10MmymqF5nvxqnFA6ndwHOJPebAy-P1tdVxdlX1cNHpwWtUIuA0u3msVJsgHLaqwlNuOCk_u6bfT9lMduz3Ts6EMDnQvNDIegrPAz26ahk3MasiF6AnMQUtamypZ32"
    },
    {
        id: "03",
        title: "Technical Documentation",
        subtitle: "THE BLUEPRINT FOR REALITY",
        description: "Precision is paramount. We produce exhaustive construction documents that guide the builders, ensuring every joint, surface, and system is executed according to the vision.",
        details: [
            "Detailed Construction Drawings",
            "Engineering Integration",
            "Specification Writing",
            "Permit Documentation"
        ],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxI3vH_f7I8OaG8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1"
    },
    {
        id: "04",
        title: "Realization & Oversight",
        subtitle: "FROM VISION TO STONE",
        description: "The final phase involves on-site management and meticulous quality control. We oversee the construction to ensure the purity of the design is maintained through every stage of build.",
        details: [
            "Construction Administration",
            "On-site Quality Control",
            "Finish & Fixture Selection",
            "Final Project Delivery"
        ],
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSRU1-D_f7I8OaG8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1"
    }
];

export default function ProcessPage() {
    const mainRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".fade-in", {
                y: 30,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: "power3.out",
            });

            gsap.from(".line-grow", {
                scaleY: 0,
                duration: 1.5,
                transformOrigin: "top",
                ease: "power2.out",
                stagger: 0.3
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark">
            <Header />

            <main ref={mainRef} className="flex-grow pt-32 pb-24 lg:pt-48 lg:pb-64 px-8 lg:px-24 flex flex-col gap-32 overflow-hidden">

                {/* Intro Section */}
                <div className="flex flex-col gap-12 max-w-5xl fade-in">
                    <div className="flex flex-col gap-6">
                        <span className="font-mono text-[10px] tracking-[0.4em] text-primary/40 dark:text-white/40 uppercase">02 — OUR METHODOLOGY</span>
                        <h1 className="text-6xl lg:text-[8rem] font-black tracking-tighter leading-[0.85] text-primary dark:text-white uppercase">
                            Sketch <br /> To Stone.
                        </h1>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
                        <p className="text-xl lg:text-3xl font-light text-primary/60 dark:text-white/60 leading-snug italic">
                            A rigorous technical approach to architectural creation, balancing artistic vision with structural discipline.
                        </p>
                        <div className="flex flex-col gap-4 font-mono text-[10px] tracking-[0.2em] text-primary dark:text-white uppercase items-start lg:items-end">
                            <span>TOTAL PHASES: 04</span>
                            <span>PRECISION SCALE: 1:1</span>
                        </div>
                    </div>
                </div>

                {/* Steps Section */}
                <div className="flex flex-col gap-48 lg:gap-64 mt-24">
                    {STEPS.map((step, i) => (
                        <section key={step.id} className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start relative fade-in">

                            {/* Step Numbering (Floating) */}
                            <div className="lg:col-span-1 flex flex-col items-center gap-12 h-full">
                                <span className="text-5xl lg:text-7xl font-black text-primary/10 dark:text-white/10 tracking-tighter">{step.id}</span>
                                <div className="w-[1px] flex-grow bg-neutral-100 dark:bg-white/5 line-grow"></div>
                            </div>

                            {/* Text Content */}
                            <div className="lg:col-span-5 flex flex-col gap-12 pt-4">
                                <div className="flex flex-col gap-4">
                                    <span className="font-mono text-[9px] tracking-[0.5em] text-primary/40 dark:text-white/40 uppercase">{step.subtitle}</span>
                                    <h2 className="text-4xl lg:text-6xl font-black tracking-tighter text-primary dark:text-white uppercase">{step.title}</h2>
                                </div>
                                <p className="text-lg lg:text-xl font-light leading-relaxed text-primary/60 dark:text-white/60 max-w-lg italic">
                                    {step.description}
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-neutral-100 dark:border-white/5 pt-12">
                                    {step.details.map((detail, idx) => (
                                        <div key={idx} className="flex gap-4 items-start group">
                                            <span className="font-mono text-[8px] mt-1.5 text-primary/30 dark:text-white/30">0{idx + 1}</span>
                                            <span className="text-xs font-bold uppercase tracking-widest text-primary dark:text-white group-hover:translate-x-1 transition-transform">{detail}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Imagery */}
                            <div className="lg:col-span-6 relative aspect-[4/3] overflow-hidden grayscale bg-neutral-100 dark:bg-neutral-900 rounded-sm border border-neutral-100 dark:border-white/5 shadow-2xl">
                                <Image
                                    src={step.image}
                                    alt={step.title}
                                    fill
                                    className="object-cover hover:scale-110 transition-transform duration-[2000ms] ease-out opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                            </div>
                        </section>
                    ))}
                </div>

                {/* Closing Statement */}
                <div className="mt-48 flex flex-col items-center text-center gap-16 py-32 border-t border-neutral-100 dark:border-white/5 fade-in">
                    <div className="flex flex-col gap-4">
                        <span className="font-mono text-[10px] tracking-[0.5em] text-primary/30 dark:text-white/30 uppercase">THE RESULT</span>
                        <h3 className="text-4xl lg:text-7xl font-black tracking-tighter text-primary dark:text-white uppercase">Architectural Excellence.</h3>
                    </div>
                    <Link href="/contact" className="bg-primary dark:bg-white text-white dark:text-primary px-16 py-6 rounded-sm font-bold uppercase tracking-[0.4em] text-xs hover:bg-black dark:hover:bg-neutral-200 transition-all shadow-xl">
                        START YOUR JOURNEY
                    </Link>
                </div>

            </main>

            <Footer />
        </div>
    );
}
