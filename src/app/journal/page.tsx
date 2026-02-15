"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";

const JOURNAL_ENTRIES = [
    {
        id: "01",
        date: "FEB 2026",
        category: "THEORY",
        readTime: "06 MIN",
        title: "The Geometry of Silence.",
        summary: "An exploration of negative space and the architectural value of what we leave unbuilt.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB2v_j3m-nF6-W9C6yJEqg-Mhzm7Y7o-W1K-Y3v_0v-q_w-x-X-x-X-x-X-x-X-x-X-x-X-x-X-X-X-X-X-X-X-X-X-X-X-X-X-X",
    },
    {
        id: "02",
        date: "JAN 2026",
        category: "URBANISM",
        readTime: "08 MIN",
        title: "Calculated Context.",
        summary: "Designing for the urban fabric: How metropolitan constraints drive innovation in structural clarity.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSRU1-D_f7I8OaG8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1",
    },
    {
        id: "03",
        date: "DEC 2025",
        category: "MATERIAL",
        readTime: "05 MIN",
        title: "Light as Material.",
        summary: "A technical study on southern exposure and the manipulation of natural light in high-end residential projects.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxI3vH_f7I8OaG8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1",
    },
    {
        id: "04",
        date: "NOV 2025",
        category: "SUSTAINABILITY",
        readTime: "10 MIN",
        title: "Sustainable Monoliths.",
        summary: "Merging thermal mass efficiency with monolithic minimalist aesthetics in concrete construction.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBZodjKOy4XxkOUPno-_MhkVaQDXqXpxTR-4GXlwu9mBScxBFRIXhRs1HtLVWibQlfUQcdZOW4OCec4RqsPyiib4PbJjMph-Ty27Iig5Ed9Ac2vRjgmDquX31ACFwVebusSYI_ofRZ54Q10MmymqF5nvxqnFA6ndwHOJPebAy-P1tdVxdlX1cNHpwWtUIuA0u3msVJsgHLaqwlNuOCk_u6bfT9lMduz3Ts6EMDnQvNDIegrPAz26ahk3MasiF6AnMQUtamypZ32",
    },
];

export default function Journal() {
    const mainRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".fade-in", {
                y: 30,
                opacity: 0,
                duration: 1.2,
                stagger: 0.1,
                ease: "power3.out",
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark">
            <Header />

            <main ref={mainRef} className="flex-grow pt-32 pb-24 lg:pt-48 lg:pb-48 px-8 lg:px-24 flex flex-col gap-24 relative overflow-hidden">

                {/* Header Section */}
                <div className="flex flex-col gap-6 max-w-4xl fade-in">
                    <span className="font-mono text-[10px] tracking-[0.4em] text-primary/40 dark:text-white/40 uppercase">COLLECTION — 001/012</span>
                    <h1 className="text-6xl lg:text-9xl font-black tracking-tighter leading-[0.85] text-primary dark:text-white uppercase">
                        Journal.
                    </h1>
                    <p className="text-xl lg:text-2xl font-light text-primary/60 dark:text-white/60 max-w-2xl leading-relaxed italic mt-4">
                        Reflections on the intersection of mathematical rigor, environmental context, and architectural craft.
                    </p>
                </div>

                {/* Journal Feed */}
                <div className="flex flex-col border-t border-neutral-100 dark:border-white/5 mt-12">
                    {JOURNAL_ENTRIES.map((entry, i) => (
                        <Link
                            key={entry.id}
                            href={`/journal/${entry.title.toLowerCase().replace(/\s+/g, '-').replace('.', '')}`}
                            className="group relative grid grid-cols-1 md:grid-cols-12 py-16 border-b border-neutral-100 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-all duration-500 ease-in-out px-4"
                        >
                            {/* Entry Number */}
                            <div className="md:col-span-1 flex flex-col gap-1 font-mono text-[9px] tracking-widest text-primary/30 dark:text-white/30 mb-8 md:mb-0">
                                <span className="text-lg font-bold text-primary dark:text-white group-hover:translate-x-1 transition-transform">{entry.id}</span>
                                <div className="h-[1px] w-4 bg-primary/20 dark:bg-white/20"></div>
                            </div>

                            {/* Main Content */}
                            <div className="md:col-span-11 flex flex-col md:flex-row justify-between items-start gap-12">
                                <div className="flex flex-col gap-6 max-w-2xl">
                                    <div className="flex gap-4 font-mono text-[9px] tracking-[0.2em] text-primary/40 dark:text-white/40 uppercase">
                                        <span>{entry.date}</span>
                                        <span className="opacity-30">/</span>
                                        <span className="text-primary dark:text-white">{entry.category}</span>
                                    </div>
                                    <h2 className="text-3xl lg:text-5xl font-black tracking-tighter leading-none text-primary dark:text-white group-hover:translate-x-4 transition-transform duration-700">
                                        {entry.title}
                                    </h2>
                                    <p className="text-sm lg:text-base font-light text-primary/60 dark:text-white/60 leading-relaxed max-w-lg">
                                        {entry.summary}
                                    </p>
                                    <div className="flex items-center gap-4 mt-4 font-mono text-[9px] tracking-[0.3em] text-primary dark:text-white uppercase group-hover:translate-x-2 transition-transform">
                                        <span>READ ARTICLE</span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>

                                {/* Preview Image Container */}
                                <div className="hidden lg:flex w-64 aspect-[4/5] relative grayscale opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-12 group-hover:translate-x-0 overflow-hidden rounded-sm border border-neutral-100 dark:border-white/5">
                                    <Image
                                        src={entry.image}
                                        alt={entry.title}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 320px"
                                        className="object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/90 px-3 py-1 font-mono text-[8px] border border-neutral-100 dark:border-white/5 text-primary dark:text-white">
                                        {entry.readTime}
                                    </div>
                                </div>
                            </div>

                            {/* Background Numbering (Large) */}
                            <div className="absolute right-8 bottom-8 text-[12rem] font-black text-neutral-50 dark:text-white/[0.015] pointer-events-none select-none tracking-tighter leading-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                {entry.id}
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Final Call to Action */}
                <div className="mt-32 flex flex-col items-center gap-8 py-24 border-t border-dashed border-neutral-200 dark:border-white/10 text-center fade-in">
                    <span className="font-mono text-[9px] tracking-[0.5em] text-primary/30 dark:text-white/30 uppercase">END OF CHANNEL</span>
                    <h3 className="text-2xl font-bold tracking-tighter text-primary dark:text-white uppercase">Stay updated with our architectural dispatches.</h3>
                    <div className="flex gap-4">
                        <button className="border border-primary dark:border-white px-8 py-3 font-mono text-[10px] uppercase tracking-widest hover:bg-primary dark:hover:bg-white hover:text-white dark:hover:text-primary transition-all">
                            RSS FEED
                        </button>
                        <button className="bg-primary dark:bg-white text-white dark:text-primary px-8 py-3 font-mono text-[10px] uppercase tracking-widest hover:invert transition-all">
                            NEWSLETTER
                        </button>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
