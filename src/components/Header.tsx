"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Header() {
    const pathname = usePathname();

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
                <button className="lg:hidden material-symbols-outlined text-primary dark:text-white" aria-label="Toggle navigation menu">
                    menu
                </button>
            </nav>
        </header>
    );
}
