"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Header() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Prevent scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const navItems = [
        { name: "PROJECTS", href: "/portfolio" },
        { name: "STUDIO", href: "/about" },
        { name: "PROCESS", href: "/process" },
        { name: "JOURNAL", href: "/journal" },
    ];

    return (
        <header className="fixed top-0 left-0 w-full z-[100] bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-neutral-100 dark:border-white/5 h-20 flex items-center px-8 lg:px-24">
            <nav className="flex justify-between items-center w-full">
                {/* Logo */}
                <Link href="/" className="group flex flex-col gap-0 items-start" aria-label="VARTEX Architects Home">
                    <span className="text-2xl font-black tracking-[-0.05em] text-primary dark:text-white leading-none">VARTEX</span>
                    <span className="font-mono text-[8px] tracking-[0.5em] text-primary/40 dark:text-white/40 group-hover:text-primary transition-colors">ARCHITECTS</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center gap-12">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "font-mono text-[10px] tracking-[0.3em] transition-all hover:opacity-100 uppercase",
                                pathname === item.href
                                    ? "text-primary dark:text-white opacity-100 font-bold"
                                    : "text-primary dark:text-white opacity-40"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}

                    {/* CTA */}
                    <Link
                        href="/contact"
                        aria-label="Start a project consultation"
                        className="bg-primary dark:bg-white text-white dark:text-primary px-6 py-3 rounded-sm font-bold uppercase tracking-widest text-[9px] hover:bg-black dark:hover:bg-neutral-200 transition-all ml-4"
                    >
                        START PROJECT
                    </Link>
                </div>

                {/* Mobile Menu Icon */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="lg:hidden text-primary dark:text-white z-50 p-2"
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>

                {/* Mobile Menu Overlay */}
                <div
                    className={cn(
                        "fixed inset-0 bg-white dark:bg-background-dark z-40 transition-all duration-500 ease-in-out lg:hidden pt-32 px-8 flex flex-col gap-16",
                        isOpen
                            ? "translate-y-0 opacity-100"
                            : "translate-y-[-10px] opacity-0 pointer-events-none invisible"
                    )}
                >
                    <div className="flex flex-col gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "text-5xl font-black tracking-tighter flex items-center justify-between group",
                                    pathname === item.href ? "text-primary dark:text-white" : "text-primary/20 dark:text-white/10"
                                )}
                            >
                                {item.name}
                                <ArrowRight className={cn(
                                    "w-8 h-8 transition-transform group-hover:translate-x-2",
                                    pathname === item.href ? "opacity-100" : "opacity-0"
                                )} />
                            </Link>
                        ))}
                    </div>

                    <div className="mt-auto pb-12 flex flex-col gap-8">
                        <Link
                            href="/contact"
                            className="bg-primary dark:bg-white text-white dark:text-primary w-full py-6 text-center font-bold uppercase tracking-[0.3em] text-xs"
                        >
                            START PROJECT
                        </Link>

                        <div className="flex justify-between items-center border-t border-neutral-100 dark:border-white/5 pt-8">
                            <span className="font-mono text-[9px] tracking-widest text-primary/40 dark:text-white/40 uppercase">© 2026 VARTEX ARCHITECTS</span>
                            <div className="flex gap-4 font-mono text-[9px] text-primary dark:text-white uppercase tracking-widest">
                                <span>IG</span>
                                <span>LN</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
