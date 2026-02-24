"use client";

import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { journalPosts } from "@/data/journal";
import { ArrowLeft, Clock, ArrowUpRight } from "lucide-react";

export default function JournalPost() {
    const params = useParams();
    const mainRef = useRef(null);
    const post = journalPosts.find(p => p.id === params.id);

    useEffect(() => {
        if (!post) return;
        const ctx = gsap.context(() => {
            gsap.from(".fade-in", {
                y: 30,
                opacity: 0,
                duration: 1.2,
                ease: "power3.out",
                stagger: 0.15
            });
            gsap.from(".content-para", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                stagger: 0.1,
                delay: 0.4
            });
        }, mainRef);
        return () => ctx.revert();
    }, [post]);

    if (!post) {
        return (
            <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark">
                <Header />
                <main className="flex-grow flex items-center justify-center px-8 py-32">
                    <div className="text-center">
                        <h1 className="text-4xl font-black text-primary dark:text-white mb-4">Article Not Found</h1>
                        <p className="text-primary/60 dark:text-white/60 mb-8">The article you&apos;re looking for doesn&apos;t exist.</p>
                        <Link href="/journal" className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary dark:text-white border border-neutral-200 dark:border-white/10 px-8 py-4 hover:bg-neutral-50 dark:hover:bg-white/5 transition-all duration-300">
                            Back to Journal
                        </Link>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    // Get related posts (same category, excluding current)
    const relatedPosts = journalPosts
        .filter(p => p.category === post.category && p.id !== post.id)
        .slice(0, 2);

    // Get next/prev posts
    const currentIndex = journalPosts.findIndex(p => p.id === post.id);
    const prevPost = currentIndex > 0 ? journalPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < journalPosts.length - 1 ? journalPosts[currentIndex + 1] : null;

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark">
            <Header />

            <main ref={mainRef} className="flex-grow bg-white dark:bg-background-dark">

                {/* Hero Image */}
                <div className="relative w-full h-[50vh] lg:h-[70vh] overflow-hidden fade-in">
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

                    {/* Back Button */}
                    <Link
                        href="/journal"
                        className="absolute top-24 lg:top-32 left-8 lg:left-24 flex items-center gap-2 text-white/90 hover:text-white transition-colors duration-300 z-10"
                        style={{ textShadow: '0 1px 4px rgba(0,0,0,0.5)' }}
                    >
                        <ArrowLeft size={14} />
                        <span className="font-mono text-[10px] tracking-[0.3em] uppercase">Back to Journal</span>
                    </Link>

                    {/* Title Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-24">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-4 mb-6">
                                <span className="font-mono text-[10px] tracking-[0.3em] text-white/80 uppercase" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
                                    {post.category}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-white/50" />
                                <span className="font-mono text-[10px] tracking-[0.3em] text-white/80 uppercase" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
                                    {formatDate(post.date)}
                                </span>
                                <span className="w-1 h-1 rounded-full bg-white/50" />
                                <div className="flex items-center gap-1.5 text-white/80" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>
                                    <Clock size={11} />
                                    <span className="font-mono text-[10px] tracking-wider uppercase">{post.readTime}</span>
                                </div>
                            </div>
                            <h1
                                className="text-3xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.05] text-white"
                                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
                            >
                                {post.title}
                            </h1>
                        </div>
                    </div>
                </div>

                {/* Article Content */}
                <article className="px-8 lg:px-24 py-16 lg:py-24">
                    <div className="max-w-3xl mx-auto">
                        {/* Author & Share */}
                        <div className="flex items-center justify-between pb-8 mb-12 border-b border-neutral-100 dark:border-white/5 fade-in">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-primary dark:bg-white rounded-full flex items-center justify-center">
                                    <span className="text-white dark:text-primary text-xs font-bold">V</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-primary dark:text-white">{post.author}</p>
                                    <p className="font-mono text-[9px] tracking-wider text-primary/40 dark:text-white/40 uppercase">Architecture & Design</p>
                                </div>
                            </div>
                        </div>

                        {/* Lead paragraph */}
                        <p className="text-xl lg:text-2xl font-light leading-relaxed text-primary/80 dark:text-white/80 mb-12 content-para">
                            {post.excerpt}
                        </p>

                        {/* Body paragraphs */}
                        {post.content.map((paragraph, i) => (
                            <p
                                key={i}
                                className="text-base lg:text-lg leading-[1.9] text-primary/70 dark:text-white/65 mb-8 content-para"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </article>

                {/* Post Navigation */}
                <div className="border-t border-neutral-100 dark:border-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {prevPost ? (
                            <Link
                                href={`/journal/${prevPost.id}`}
                                className="group p-8 lg:p-16 border-b md:border-b-0 md:border-r border-neutral-100 dark:border-white/5 hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors duration-300"
                            >
                                <span className="font-mono text-[9px] tracking-[0.3em] text-primary/40 dark:text-white/40 uppercase mb-4 block">← Previous</span>
                                <h4 className="text-lg lg:text-xl font-bold tracking-tight text-primary dark:text-white group-hover:text-primary/80 dark:group-hover:text-white/80 transition-colors duration-300">
                                    {prevPost.title}
                                </h4>
                            </Link>
                        ) : (
                            <div className="p-8 lg:p-16 border-b md:border-b-0 md:border-r border-neutral-100 dark:border-white/5" />
                        )}

                        {nextPost ? (
                            <Link
                                href={`/journal/${nextPost.id}`}
                                className="group p-8 lg:p-16 text-right hover:bg-neutral-50 dark:hover:bg-white/[0.02] transition-colors duration-300"
                            >
                                <span className="font-mono text-[9px] tracking-[0.3em] text-primary/40 dark:text-white/40 uppercase mb-4 block">Next →</span>
                                <h4 className="text-lg lg:text-xl font-bold tracking-tight text-primary dark:text-white group-hover:text-primary/80 dark:group-hover:text-white/80 transition-colors duration-300">
                                    {nextPost.title}
                                </h4>
                            </Link>
                        ) : (
                            <div className="p-8 lg:p-16" />
                        )}
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className="px-8 lg:px-24 py-16 lg:py-24 border-t border-neutral-100 dark:border-white/5">
                        <h3 className="font-mono text-[10px] tracking-[0.4em] text-primary/40 dark:text-white/40 uppercase mb-12">Related Articles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                            {relatedPosts.map(related => (
                                <Link
                                    key={related.id}
                                    href={`/journal/${related.id}`}
                                    className="group flex flex-col"
                                >
                                    <div className="relative aspect-[3/2] overflow-hidden mb-6">
                                        <Image
                                            src={related.image}
                                            alt={related.title}
                                            fill
                                            className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                        />
                                    </div>
                                    <span className="font-mono text-[9px] tracking-[0.3em] text-primary/40 dark:text-white/40 uppercase mb-3">
                                        {formatDate(related.date)}
                                    </span>
                                    <h4 className="text-xl font-bold tracking-tight text-primary dark:text-white group-hover:text-primary/80 dark:group-hover:text-white/80 transition-colors duration-300 mb-3">
                                        {related.title}
                                    </h4>
                                    <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.3em] uppercase text-primary dark:text-white group-hover:gap-3 transition-all duration-300 mt-auto pt-4">
                                        Read Article <ArrowUpRight size={11} />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}

            </main>

            <Footer />
        </div>
    );
}
