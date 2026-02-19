"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Journal() {
    const mainRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".fade-in", {
                y: 30,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.2
            });
        });
        return () => ctx.revert();
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark">
            <Header />

            <main ref={mainRef} className="flex-grow flex flex-col justify-center items-center relative overflow-hidden px-8 lg:px-24 py-32">

                <div className="w-full max-w-5xl relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden fade-in">
                    <Image
                        src="/about-hero.webp"
                        alt="Coming Soon"
                        fill
                        className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-8">
                        <span className="font-mono text-[10px] lg:text-xs tracking-[0.5em] text-white/80 uppercase mb-6">
                            VARTEX ARCHITECTS — JOURNAL
                        </span>
                        <h1 className="text-5xl lg:text-8xl font-black tracking-tighter text-white uppercase mb-8">
                            Coming <br className="hidden md:block" /> Soon.
                        </h1>
                        <p className="text-white/60 font-light max-w-md text-sm lg:text-base leading-relaxed">
                            We are currently curating a selection of architectural discourse and project retrospectives.
                        </p>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
