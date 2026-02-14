"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="px-8 lg:px-24 py-24 bg-white dark:bg-background-dark border-t border-neutral-100 dark:border-white/5 relative overflow-hidden" aria-label="Site footer">

            {/* Background Logo Overlay */}
            <div className="absolute -bottom-24 -right-12 text-[20vw] font-black text-neutral-50 dark:text-white/[0.02] pointer-events-none select-none tracking-tighter uppercase leading-none">
                VARTEX
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">

                {/* Brand Column */}
                <div className="lg:col-span-4 flex flex-col gap-8">
                    <div className="flex flex-col gap-0 items-start">
                        <span className="text-3xl font-black tracking-[-0.05em] text-primary dark:text-white leading-none">VARTEX.</span>
                        <span className="font-mono text-[9px] tracking-[0.5em] text-primary/40 dark:text-white/40 uppercase">ARCHITECTS — STUDIO HQ</span>
                    </div>
                    <p className="text-sm font-light text-primary/60 dark:text-white/60 max-w-xs leading-relaxed italic">
                        Shaping the modern landscape through mathematical rigor and artistic intuition.
                    </p>
                    <div className="flex flex-col gap-1 font-mono text-[9px] text-primary/40 dark:text-white/40 uppercase tracking-widest">
                        <span>40.7128° N, 74.0060° W</span>
                        <span>ALL RIGHTS RESERVED © 2026</span>
                    </div>
                </div>

                {/* Links Column */}
                <div className="lg:col-span-2 lg:col-start-6 flex flex-col gap-8">
                    <span className="font-mono text-[10px] tracking-[0.4em] text-primary/40 dark:text-white/40 uppercase">NAVIGATION</span>
                    <nav className="flex flex-col gap-4 font-bold text-xs uppercase tracking-widest text-primary dark:text-white">
                        <Link href="/portfolio" className="hover:opacity-40 transition-opacity">Projects</Link>
                        <Link href="/about" className="hover:opacity-40 transition-opacity">Studio</Link>
                        <Link href="/contact" className="hover:opacity-40 transition-opacity">Inquiry</Link>
                        <Link href="/journal" className="hover:opacity-40 transition-opacity">Journal</Link>
                    </nav>
                </div>

                {/* Social Column */}
                <div className="lg:col-span-2 flex flex-col gap-8">
                    <span className="font-mono text-[10px] tracking-[0.4em] text-primary/40 dark:text-white/40 uppercase">SOCIALS</span>
                    <nav className="flex flex-col gap-4 font-bold text-xs uppercase tracking-widest text-primary dark:text-white">
                        <a href="https://instagram.com/vartex.architects" target="_blank" rel="noopener noreferrer" className="hover:opacity-40 transition-opacity">Instagram</a>
                        <a href="https://linkedin.com/company/vartex-architects" target="_blank" rel="noopener noreferrer" className="hover:opacity-40 transition-opacity">LinkedIn</a>
                        <a href="https://behance.net/vartex" target="_blank" rel="noopener noreferrer" className="hover:opacity-40 transition-opacity">Behance</a>
                        <a href="https://pinterest.com/vartex" target="_blank" rel="noopener noreferrer" className="hover:opacity-40 transition-opacity">Pinterest</a>
                    </nav>
                </div>

                {/* Contact Quick Link */}
                <div className="lg:col-span-3 flex flex-col gap-8">
                    <span className="font-mono text-[10px] tracking-[0.4em] text-primary/40 dark:text-white/40 uppercase">HQ — NY</span>
                    <div className="flex flex-col gap-2">
                        <p className="text-xl font-bold text-primary dark:text-white uppercase leading-tight">123 Architecture Lane, NY 10001</p>
                        <a href="mailto:hello@vartexarchitects.com" className="text-xl font-bold text-primary dark:text-white hover:opacity-50 transition-opacity break-words">hello@vartexarchitects.com</a>
                    </div>
                </div>

            </div>

            {/* Sub Footer */}
            <div className="relative z-10 mt-24 pt-12 border-t border-neutral-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8 font-mono text-[9px] tracking-[0.2em] text-primary/30 dark:text-white/30 uppercase">
                <div className="flex gap-8">
                    <Link href="/privacy" className="hover:text-primary dark:hover:text-white">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-primary dark:hover:text-white">Terms of Service</Link>
                </div>
                <span>DESIGNED BY VARTEX — BUILT BY ANTIGRAVITY</span>
            </div>
        </footer>
    );
}
