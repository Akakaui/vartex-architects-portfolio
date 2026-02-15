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
        <header className="fixed top-0 left-0 w-full z-[100] bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-neutral-100 dark:border-white/5 h-20 flex items-center px-4 lg:px-24">
            <nav className="flex justify-between items-center w-full gap-2 md:gap-8">
                {/* Logo */}
                <Link href="/" className="shrink-0 group flex flex-col gap-0 items-start" aria-label="VARTEX Architects Home">
                    <span className="text-xl lg:text-2xl font-black tracking-[-0.05em] text-primary dark:text-white leading-none">VARTEX</span>
                    <span className="font-mono text-[7px] lg:text-[8px] tracking-[0.4em] text-primary/40 dark:text-white/40 group-hover:text-primary transition-colors">ARCHITECTS</span>
                </Link>

                {/* Direct Nav Items - Scrollable on mobile */}
                <div className="flex-1 flex items-center justify-center gap-4 md:gap-8 lg:gap-12 overflow-x-auto no-scrollbar px-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "font-mono text-[8px] md:text-[9px] lg:text-[10px] tracking-[0.2em] md:tracking-[0.3em] transition-all hover:opacity-100 uppercase whitespace-nowrap",
                                pathname === item.href
                                    ? "text-primary dark:text-white opacity-100 font-bold"
                                    : "text-primary dark:text-white opacity-40 hover:opacity-100"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Always-visible CTA */}
                <Link
                    href="/contact"
                    aria-label="Start a project consultation"
                    className="shrink-0 bg-primary dark:bg-white text-white dark:text-primary px-3 md:px-6 py-2.5 md:py-3 rounded-sm font-bold uppercase tracking-widest text-[8px] lg:text-[9px] hover:bg-black dark:hover:bg-neutral-200 transition-all font-mono"
                >
                    START PROJECT
                </Link>
            </nav>
        </header>
    );
}
