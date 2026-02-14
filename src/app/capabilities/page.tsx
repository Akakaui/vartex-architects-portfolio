"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const SERVICES = [
    {
        number: "01",
        title: "Architectural Planning",
        description: "Comprehensive design solutions from concept to construction documents. We specialize in residential and commercial spaces that prioritize structural honesty and environmental context.",
        details: ["Site Analysis", "Conceptual Design", "Development Drawings", "Construction Documentation"]
    },
    {
        number: "02",
        title: "Urban Design",
        description: "Large-scale master planning focused on the intersection of human movement and built form. Creating harmonious ecosystems within the urban landscape.",
        details: ["Master Planning", "Public Space Design", "Landscape Architecture", "Sustainability Strategies"]
    },
    {
        number: "03",
        title: "Interior Architecture",
        description: "The calculated play of light and material within the interior volume. We design spaces that feel tactile, intentional, and grounded.",
        details: ["Spatial Planning", "Material Specification", "Lighting Design", "Custom Millwork Design"]
    },
    {
        number: "04",
        title: "Project Management",
        description: "Ensuring the precision of the initial vision through to completion. We manage the complexity of construction with meticulous attention to detail.",
        details: ["Site Supervision", "Contract Administration", "Quality control", "Procurement Management"]
    }
];

export default function Capabilities() {
    const mainRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".fade-in", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: "power3.out",
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main ref={mainRef} className="flex-grow architectural-grid bg-white dark:bg-background-dark">
                {/* Hero section */}
                <section className="relative px-8 lg:px-24 py-24 lg:py-32 flex flex-col gap-8 fade-in">
                    {/* Axis Mark */}
                    <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-20 hidden lg:block">
                        <div className="absolute top-10 right-0 w-full h-[1px] bg-primary dark:bg-white"></div>
                        <div className="absolute top-0 right-10 h-full w-[1px] bg-primary dark:bg-white"></div>
                    </div>

                    <h1 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-primary dark:text-white">
                        CAPABILITIES.
                    </h1>
                    <p className="text-xl lg:text-2xl font-light text-primary/70 dark:text-white/70 max-w-3xl leading-relaxed">
                        Precision-driven solutions for the built environment. Our expertise spans from microscopic spatial details to macroscopic urban planning.
                    </p>
                </section>

                {/* Services Grid */}
                <section className="px-8 lg:px-24 pb-24 lg:pb-32 grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200 dark:bg-neutral-800 border-y border-neutral-200 dark:border-neutral-800 fade-in">
                    {SERVICES.map((service, index) => (
                        <div key={index} className="bg-white dark:bg-background-dark p-10 lg:p-16 flex flex-col gap-10 hover:bg-neutral-50 dark:hover:bg-background-dark/80 transition-colors duration-500 group">
                            <div className="flex items-baseline justify-between">
                                <span className="font-mono text-xs tracking-widest text-primary/40 dark:text-white/40">SERVICE CODE: MB-{service.number}</span>
                                <span className="text-5xl font-black text-neutral-100 dark:text-white/5 group-hover:text-primary/10 dark:group-hover:text-white/10 transition-colors duration-500">{service.number}</span>
                            </div>

                            <div className="flex flex-col gap-4">
                                <h3 className="text-2xl lg:text-3xl font-bold uppercase tracking-tight text-primary dark:text-white">{service.title}</h3>
                                <p className="text-primary/70 dark:text-white/70 leading-relaxed max-w-md italic">
                                    {service.description}
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 pt-6 border-t border-neutral-100 dark:border-white/5">
                                <p className="font-mono text-[10px] tracking-widest text-primary/40 dark:text-white/40 uppercase">Design parameters</p>
                                <div className="grid grid-cols-2 gap-y-2">
                                    {service.details.map((detail, i) => (
                                        <div key={i} className="flex items-center gap-2 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
                                            <div className="w-1 h-1 bg-primary dark:bg-white rotate-45"></div>
                                            <span className="text-xs uppercase tracking-wider text-primary dark:text-white/80">{detail}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                {/* Tech Specs / Footer Section */}
                <section className="px-8 lg:px-24 py-16 flex flex-col md:flex-row justify-between items-center gap-8 border-t border-neutral-100 dark:border-white/5 opacity-50 font-mono text-[10px] uppercase tracking-[0.3em] text-primary dark:text-white">
                    <div className="flex gap-12">
                        <span>ISO: 9001-2015</span>
                        <span className="hidden md:inline">STRUCTURAL HONESTY: 100%</span>
                    </div>
                    <div>
                        © {new Date().getFullYear()} VARTEX ARCHITECTS
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
