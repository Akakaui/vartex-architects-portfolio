"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journalPosts } from "@/data/journal";
import { ArrowUpRight, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", ...Array.from(new Set(journalPosts.map(p => p.category)))];

export default function Journal() {
    const mainRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState("All");

    const filteredPosts = activeCategory === "All"
        ? journalPosts
        : journalPosts.filter(p => p.category === activeCategory);

    const featuredPost = journalPosts.find(p => p.featured);
    const regularPosts = filteredPosts.filter(p => !p.featured || activeCategory !== "All");

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(".fade-in", {
                y: 30,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.15
            });

            gsap.utils.toArray<HTMLElement>(".post-card").forEach((card) => {
                gsap.from(card, {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                    }
                });
            });
        }, mainRef);
        return () => ctx.revert();
    }, [activeCategory]);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark">
            <Header />

            <main ref={mainRef} className="flex-grow bg-white dark:bg-background-dark">

                {/* Hero Header */}
                <section className="px-8 lg:px-24 pt-24 pb-12 lg:pt-32 lg:pb-16 border-b border-neutral-100 dark:border-white/5 fade-in">
                    <span className="font-mono text-[10px] tracking-[0.4em] text-primary/40 dark:text-white/40 uppercase">
                        Reflections — Discourse — Process
                    </span>
                    <h1 className="text-5xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-primary dark:text-white mt-4">
                        JOURNAL.
                    </h1>
                    <p className="text-lg font-light text-primary/60 dark:text-white/60 max-w-xl mt-6 leading-relaxed">
                        Writing on architecture, design thinking, material culture, and the built environment in contemporary Nigeria.
                    </p>
                </section>

                {/* Category Filter */}
                <div className="px-8 lg:px-24 py-4 border-b border-neutral-100 dark:border-white/5 fade-in">
                    <div className="flex flex-wrap gap-4 lg:gap-8" role="tablist" aria-label="Journal categories">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                role="tab"
                                aria-selected={activeCategory === cat}
                                className={`font-mono text-[10px] tracking-[0.3em] uppercase py-2 border-b-2 transition-all duration-300 ${activeCategory === cat
                                    ? "border-primary dark:border-white text-primary dark:text-white"
                                    : "border-transparent text-primary/40 dark:text-white/40 hover:text-primary/70 dark:hover:text-white/70"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Post */}
                {activeCategory === "All" && featuredPost && (
                    <Link href={`/journal/${featuredPost.id}`} className="block group">
                        <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-neutral-100 dark:border-white/5 fade-in">
                            <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                                <Image
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover lg:grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="bg-primary dark:bg-white text-white dark:text-primary font-mono text-[9px] tracking-[0.3em] uppercase px-4 py-2">
                                        Featured
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 lg:p-16 flex flex-col justify-center gap-6">
                                <div className="flex items-center gap-4">
                                    <span className="font-mono text-[10px] tracking-[0.3em] text-primary/40 dark:text-white/40 uppercase">
                                        {featuredPost.category}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-primary/20 dark:bg-white/20" />
                                    <span className="font-mono text-[10px] tracking-[0.3em] text-primary/40 dark:text-white/40 uppercase">
                                        {formatDate(featuredPost.date)}
                                    </span>
                                </div>

                                <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-tight text-primary dark:text-white group-hover:text-primary/80 dark:group-hover:text-white/80 transition-colors duration-300">
                                    {featuredPost.title}
                                </h2>

                                <p className="text-primary/60 dark:text-white/60 font-light leading-relaxed">
                                    {featuredPost.excerpt}
                                </p>

                                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-white/5">
                                    <div className="flex items-center gap-2 text-primary/40 dark:text-white/40">
                                        <Clock size={12} />
                                        <span className="font-mono text-[10px] tracking-wider uppercase">{featuredPost.readTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] uppercase text-primary dark:text-white group-hover:gap-3 transition-all duration-300">
                                        Read Article <ArrowUpRight size={12} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    </Link>
                )}

                {/* Posts Grid */}
                <section className="px-8 lg:px-24 py-16 lg:py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                        {(activeCategory === "All" ? regularPosts.filter(p => !p.featured) : regularPosts).map((post) => (
                            <Link
                                key={post.id}
                                href={`/journal/${post.id}`}
                                className="post-card group flex flex-col"
                            >
                                {/* Image */}
                                <div className="relative aspect-[3/2] overflow-hidden mb-6">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover lg:grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </div>

                                {/* Meta */}
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="font-mono text-[9px] tracking-[0.3em] text-primary/40 dark:text-white/40 uppercase">
                                        {post.category}
                                    </span>
                                    <span className="w-1 h-1 rounded-full bg-primary/20 dark:bg-white/20" />
                                    <span className="font-mono text-[9px] tracking-[0.3em] text-primary/40 dark:text-white/40 uppercase">
                                        {formatDate(post.date)}
                                    </span>
                                </div>

                                {/* Title */}
                                <h3 className="text-xl lg:text-2xl font-bold tracking-tight leading-tight text-primary dark:text-white group-hover:text-primary/80 dark:group-hover:text-white/80 transition-colors duration-300 mb-3">
                                    {post.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="text-sm text-primary/50 dark:text-white/50 font-light leading-relaxed flex-grow mb-6">
                                    {post.excerpt}
                                </p>

                                {/* Footer */}
                                <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-white/5">
                                    <div className="flex items-center gap-2 text-primary/40 dark:text-white/40">
                                        <Clock size={11} />
                                        <span className="font-mono text-[9px] tracking-wider uppercase">{post.readTime}</span>
                                    </div>
                                    <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase text-primary dark:text-white group-hover:gap-3 transition-all duration-300">
                                        Read <ArrowUpRight size={11} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
