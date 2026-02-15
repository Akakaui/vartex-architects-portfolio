"use client";

import { useActionState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { contactInquiryAction } from "./actions";
import { CheckCircle, ChevronDown } from "lucide-react";

const initialState = {
    message: "",
    errors: {} as Record<string, string[]>,
    success: false,
};

export default function Contact() {
    const mainRef = useRef(null);
    const [state, formAction, isPending] = useActionState(contactInquiryAction, initialState);

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

    useEffect(() => {
        if (state.success) {
            // Optional: Show a success toast or animation
            gsap.to(".form-container", {
                opacity: 0,
                y: -20,
                duration: 0.5,
                display: "none"
            });
            gsap.from(".success-message", {
                opacity: 0,
                y: 20,
                duration: 0.5,
                delay: 0.5,
                display: "flex"
            });
        }
    }, [state.success]);

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark">
            <Header />

            <main ref={mainRef} className="flex-grow flex flex-col lg:flex-row border-t border-neutral-100 dark:border-white/5 relative">

                {/* Left Column: Info & Branding */}
                <div className="w-full lg:w-[45%] p-8 lg:p-24 flex flex-col gap-16 relative overflow-hidden lg:border-r border-neutral-100 dark:border-white/5" aria-label="Contact information">
                    {/* Background Watermark (Blueprint) */}
                    <div className="absolute bottom-0 left-0 w-full h-[40%] opacity-[0.03] dark:opacity-[0.07] pointer-events-none select-none">
                        <Image
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2v_j3m-nF6-W9C6yJEqg-Mhzm7Y7o-W1K-Y3v_0v-q_w-x-X-x-X-x-X-x-X-x-X-x-X-x-X-X-X-X-X-X-X-X-X-X-X-X-X-X"
                            alt="Blueprint Watermark"
                            fill
                            sizes="(max-width: 1024px) 100vw, 45vw"
                            className="object-contain object-left-bottom grayscale invert dark:invert-0"
                        />
                    </div>

                    <div className="flex flex-col gap-8 z-10 fade-in">
                        <h1 className="text-6xl lg:text-[7rem] font-black tracking-tighter leading-[0.9] text-primary dark:text-white">
                            Let's build with clarity.
                        </h1>
                    </div>

                    <div className="flex flex-col gap-12 z-10 fade-in">
                        <div className="flex flex-col gap-4">
                            <span className="font-mono text-[9px] tracking-[0.4em] text-primary/40 dark:text-white/40 uppercase">CONTACT</span>
                            <div className="flex flex-col gap-2">
                                <a href="mailto:hello@vartexarchitects.com" aria-label="Email hello@vartexarchitects.com" className="text-xl lg:text-2xl font-bold text-primary dark:text-white hover:opacity-60 transition-opacity">hello@vartexarchitects.com</a>
                                <a href="tel:+12125550198" aria-label="Call +1 212 555 0198" className="text-xl lg:text-2xl font-bold text-primary dark:text-white hover:opacity-60 transition-opacity">+1 (212) 555-0198</a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <span className="font-mono text-[9px] tracking-[0.4em] text-primary/40 dark:text-white/40 uppercase">SOCIALS</span>
                            <div className="flex flex-wrap gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-primary dark:text-white">
                                <a href="https://linkedin.com/company/vartex-architects" target="_blank" rel="noopener noreferrer" aria-label="Visit our LinkedIn profile" className="hover:opacity-40 transition-opacity">LinkedIn</a>
                                <a href="https://instagram.com/vartex.architects" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" className="hover:opacity-40 transition-opacity">Instagram</a>
                                <a href="https://behance.net/vartex" target="_blank" rel="noopener noreferrer" aria-label="View our Behance projects" className="hover:opacity-40 transition-opacity">Behance</a>
                                <a href="https://pinterest.com/vartex" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Pinterest" className="hover:opacity-40 transition-opacity">Pinterest</a>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <span className="font-mono text-[9px] tracking-[0.4em] text-primary/40 dark:text-white/40 uppercase">OFFICE</span>
                            <div className="flex flex-col gap-1">
                                <p className="text-xl font-bold text-primary dark:text-white uppercase leading-tight">123 Architecture Lane, Floor 4</p>
                                <p className="text-xl font-bold text-primary dark:text-white uppercase leading-tight">New York, NY 10001</p>
                                <p className="font-mono text-[9px] tracking-widest text-primary/40 dark:text-white/40 uppercase mt-2">40.7128° N, 74.0060° W</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Inquiry Form */}
                <div className="w-full lg:w-[55%] p-8 lg:p-24 bg-white dark:bg-background-dark relative">

                    {/* Success Message */}
                    <div className="hidden success-message absolute inset-0 bg-white dark:bg-background-dark p-8 lg:p-24 flex-col justify-center gap-8 items-center text-center z-20">
                        <CheckCircle className="w-16 h-16 text-primary dark:text-white" />
                        <div className="flex flex-col gap-4">
                            <h2 className="text-4xl font-bold tracking-tighter text-primary dark:text-white uppercase">Inquiry Received.</h2>
                            <p className="text-primary/60 dark:text-white/60 font-mono text-[10px] tracking-widest uppercase max-w-sm">
                                OUR STUDIO TEAM WILL REVIEW YOUR PROJECT BRIEF AND RESPOND WITHIN 48 BUSINESS HOURS.
                            </p>
                        </div>
                        <button onClick={() => window.location.reload()} className="mt-8 border border-neutral-200 dark:border-white/10 px-8 py-4 font-mono text-[10px] uppercase tracking-widest hover:bg-neutral-50 dark:hover:bg-white/5 transition-colors">
                            SEND ANOTHER INQUIRY
                        </button>
                    </div>

                    <div className="form-container max-w-xl flex flex-col gap-16 fade-in">
                        <div className="flex flex-col gap-12">
                            <span className="font-mono text-[9px] tracking-[0.4em] text-primary/30 dark:text-white/30 uppercase">PROJECT INQUIRY</span>

                            <form action={formAction} className="flex flex-col gap-12" aria-label="Send us an inquiry">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                                    <div className="flex flex-col gap-2">
                                        <label htmlFor="full-name" className="font-mono text-[9px] tracking-[0.2em] text-primary/40 dark:text-white/40 uppercase flex justify-between">
                                            FULL NAME
                                            {state.errors?.name && <span className="text-red-500 lowercase tracking-normal italic opacity-100">{state.errors.name[0]}</span>}
                                        </label>
                                        <input
                                            id="full-name"
                                            name="name"
                                            type="text"
                                            placeholder="John Doe"
                                            autoComplete="name"
                                            required
                                            className={`bg-transparent border-b ${state.errors?.name ? 'border-red-500/50' : 'border-neutral-100 dark:border-white/10'} py-4 focus:border-primary dark:focus:border-white outline-none transition-colors text-xl font-light placeholder:text-neutral-200 dark:placeholder:text-neutral-800`}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2 relative">
                                        <label htmlFor="project-type" className="font-mono text-[9px] tracking-[0.2em] text-primary/40 dark:text-white/40 uppercase">PROJECT TYPE</label>
                                        <select id="project-type" name="type" className="bg-transparent border-b border-neutral-100 dark:border-white/10 py-4 focus:border-primary dark:focus:border-white outline-none transition-colors text-xl font-light appearance-none cursor-pointer">
                                            <option value="residential">Residential</option>
                                            <option value="commercial">Commercial</option>
                                            <option value="urban">Urban Planning</option>
                                            <option value="interior">Interior</option>
                                        </select>
                                        <ChevronDown className="absolute bottom-5 right-0 pointer-events-none opacity-40 w-5 h-5" />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="site-location" className="font-mono text-[9px] tracking-[0.2em] text-primary/40 dark:text-white/40 uppercase flex justify-between">
                                        SITE LOCATION
                                        {state.errors?.location && <span className="text-red-500 lowercase tracking-normal italic opacity-100">{state.errors.location[0]}</span>}
                                    </label>
                                    <input
                                        id="site-location"
                                        name="location"
                                        type="text"
                                        placeholder="City, Country"
                                        required
                                        className={`bg-transparent border-b ${state.errors?.location ? 'border-red-500/50' : 'border-neutral-100 dark:border-white/10'} py-4 focus:border-primary dark:focus:border-white outline-none transition-colors text-xl font-light placeholder:text-neutral-200 dark:placeholder:text-neutral-800`}
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label htmlFor="project-brief" className="font-mono text-[9px] tracking-[0.2em] text-primary/40 dark:text-white/40 uppercase">PROJECT BRIEF</label>
                                    <textarea
                                        id="project-brief"
                                        name="brief"
                                        rows={2}
                                        placeholder="Describe your vision and requirements..."
                                        className="bg-transparent border-b border-neutral-100 dark:border-white/10 py-4 focus:border-primary dark:focus:border-white outline-none transition-colors text-xl font-light resize-none placeholder:text-neutral-200 dark:placeholder:text-neutral-800"
                                    ></textarea>
                                </div>

                                <div className="flex flex-col sm:flex-row justify-between items-center gap-8 pt-8">
                                    <p className="max-w-[300px] text-[8px] font-mono leading-relaxed text-primary/40 dark:text-white/40 uppercase tracking-widest text-center sm:text-left">
                                        BY SENDING THIS INQUIRY YOU AGREE TO OUR PRIVACY POLICY AND THE STORAGE OF YOUR DATA FOR ARCHITECTURAL CONSULTATION.
                                    </p>
                                    <button
                                        type="submit"
                                        disabled={isPending}
                                        aria-label="Submit inquiry form"
                                        className="bg-primary dark:bg-white text-white dark:text-primary px-12 py-5 font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-black dark:hover:bg-neutral-200 transition-all rounded-sm disabled:opacity-50 disabled:cursor-not-allowed min-w-[200px]"
                                    >
                                        {isPending ? "PROCESSING..." : "SEND INQUIRY"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Map Image/Context */}
                        <div className="relative aspect-[16/7] overflow-hidden grayscale bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-white/5 rounded-sm" aria-label="Our studio location on map">
                            <Image
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSRU1-D_f7I8OaG8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1-q8T1"
                                alt="Studio Location Map"
                                fill
                                sizes="(max-width: 1024px) 100vw, 55vw"
                                className="object-cover opacity-60 dark:opacity-40"
                            />
                            <div className="absolute bottom-4 left-4 p-4 bg-white/90 dark:bg-black/90 backdrop-blur-sm border border-neutral-100 dark:border-white/5">
                                <span className="font-mono text-[8px] tracking-[0.4em] text-primary dark:text-white uppercase">GLOBAL HQ — NY STUDIO</span>
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            <Footer />
        </div>
    );
}
