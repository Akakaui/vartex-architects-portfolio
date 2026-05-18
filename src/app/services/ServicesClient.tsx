"use client";

import { useState, useEffect, useRef, useActionState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Home as HomeIcon, Sofa, ChevronDown, CheckCircle, ChevronRight, X, Loader2 } from "lucide-react";
import gsap from "gsap";
import { requestGuideAction, GuideState } from "./actions";

/* ─── DATA ────────────────────────────────────────────────────────────────── */
const ARCH = {
    id: "architecture",
    index: "01",
    label: "ARCHITECTURAL DESIGN",
    headline: ["ARCHITEC-", "TURAL", "DESIGN."],
    tagline: "From the site to the stone.",
    hero: "We design buildings that hold their logic from the first sketch to the final inspection. Architecture, to us, is a dialogue — between the land, the light, and the life that will occupy the space.",
    approach: "Every project begins the same way: we listen. Not just to the brief, but to the site itself — its orientation, its constraints, its latent possibilities. From there, design is not imposed. It emerges.",
    how: [
        ["01", "SITE & CONTEXT", "Before a line is drawn, we study the land — its topography, zoning, orientation, and the environment it will shape and be shaped by."],
        ["02", "DESIGN DEVELOPMENT", "Sketches evolve into precise spatial models, tested against light, structure, and how the building will actually be lived in."],
        ["03", "TECHNICAL DOCUMENTATION", "Exhaustive construction drawings — every joint, surface, and system documented with precision that leaves builders without ambiguity."],
        ["04", "REALIZATION", "We remain present through construction, ensuring the built form maintains the rigour of the original design intent."],
    ],
    engagements: [
        {
            num: "01", name: "FOUNDATION", sub: "The Essential",
            desc: "For clients who arrive with a resolved vision and require precise technical documentation to move into construction without delay.",
            timeline: "3 PHASES · ~8 WEEKS",
            phases: [
                { label: "01 — MOBILIZATION & CONCEPT", items: ["Initial consultation & briefing", "Remote site analysis", "Space planning & moodboard"] },
                { label: "02 — DESIGN", items: ["2D floor plans & exterior elevations", "Up to 2 rounds of refinement"] },
                { label: "03 — DOCUMENTATION", items: ["Architectural blueprints", "5 printed & bound hardcopy sets"] },
            ],
        },
        {
            num: "02", name: "SIGNATURE", sub: "The Professional",
            desc: "For projects demanding full design exploration, photorealistic visualization, and integrated engineering — the complete experience before a single brick is laid.",
            timeline: "4 PHASES · ~12 WEEKS",
            phases: [
                { label: "01 — MOBILIZATION & CONCEPT", items: ["In-depth multi-session consultation", "On-site and remote site & zoning analysis", "Advanced space planning & moodboard"] },
                { label: "02 — DESIGN & VISUALIZATION", items: ["Detailed 2D floor plans & elevations", "Photorealistic exterior 3D renders", "Up to 3 rounds of refinement"] },
                { label: "03 — DOCUMENTATION", items: ["Detailed architectural blueprints", "Structural engineering drawings", "MEP drawings"] },
                { label: "04 — ENGINEERING & DELIVERY", items: ["Government approval drawing set", "Executive architectural blueprints", "5 printed & bound hardcopy sets each"] },
            ],
        },
        {
            num: "03", name: "BESPOKE", sub: "The Executive",
            desc: "For high-end builds that demand the full spectrum — cinematic visualization, complete engineering, and a dedicated principal consultant at every phase.",
            timeline: "4 PHASES · ~15 WEEKS",
            phases: [
                { label: "01 — MOBILIZATION & CONCEPT", items: ["Priority multi-session consultation", "Advanced site & zoning analysis", "Survey & soil test coordination", "Advanced space planning & precedent study"] },
                { label: "02 — DESIGN & VISUALIZATION", items: ["8+ premium exterior 3D renders", "Unlimited rounds of refinement", "Highly detailed 2D plans"] },
                { label: "03 — DOCUMENTATION", items: ["Interior 3D renders — up to 5 spaces", "Animated cinematic video walkthrough", "Full architectural blueprint set"] },
                { label: "04 — ENGINEERING & DELIVERY", items: ["Executive architectural blueprints", "Structural & MEP engineering drawings", "Government approval drawing set"] },
            ],
        },
    ],
    buildSection: true,
    closing: "From first sketch to final stone.",
};

const INT = {
    id: "interior",
    index: "02",
    label: "INTERIOR DESIGN",
    headline: ["INTERIOR", "DESIGN."],
    tagline: "Every void considered.",
    hero: "We treat the interior not as decoration applied after the fact — but as the completion of a spatial idea that began the moment the building was conceived.",
    approach: "The interior volume is where architecture is most intimately experienced. The height of a ceiling, the texture of a wall, the quality of light at noon — these are not stylistic decisions. They are spatial ones. We resolve them with the same rigour we apply to structure.",
    how: [
        ["01", "SPATIAL ANALYSIS", "We begin by understanding how the space is lived in — traffic, light, function, and the relationship between rooms — before proposing any layout."],
        ["02", "VISUALIZATION", "From spatial diagrams to photorealistic renders and cinematic walkthroughs, you inhabit the design before a single piece is procured."],
        ["03", "SPECIFICATION", "Every material, finish, fixture, and fitting is specified exactly — schedules that leave artisans and contractors no room for interpretation."],
        ["04", "EXECUTION", "For clients who require it, we manage procurement, supervise fit-out, and oversee final staging through to project handover."],
    ],
    engagements: [
        {
            num: "01", name: "CONCEPT", sub: "The Essential",
            desc: "For clients who want a professional spatial direction and visual concept — clarity and confidence to brief a contractor and begin procurement independently.",
            timeline: "2 PHASES · ~5 WEEKS",
            phases: [
                { label: "01 — SPATIAL PLANNING & CONCEPT", items: ["Initial consultation & briefing", "Site measurement review", "2D furniture layout", "Conceptual moodboard"] },
                { label: "02 — VISUALIZATION", items: ["Standard 3D visualization", "Material palette guide"] },
            ],
        },
        {
            num: "02", name: "SPECIFICATION", sub: "The Professional",
            desc: "For clients who require a complete interior design outcome — fully documented, technically exact, ready for any skilled artisan to execute without ambiguity.",
            timeline: "3 PHASES · ~9 WEEKS",
            phases: [
                { label: "01 — SPATIAL PLANNING & CONCEPT", items: ["In-depth multi-session consultation", "Site verification & measurement", "Advanced 2D layouts", "Design moodboard"] },
                { label: "02 — VISUALIZATION & DEVELOPMENT", items: ["Photorealistic 3D renders", "Exact specification schedule", "Furniture sourcing guide"] },
                { label: "03 — TECHNICAL DOCUMENTATION", items: ["Interior elevations & joinery drawings", "5 printed & bound hardcopy sets"] },
            ],
        },
        {
            num: "03", name: "WHITE GLOVE", sub: "The Executive",
            desc: "For clients who want a completely hands-off journey — from first spatial analysis to the final staging of a move-in-ready, immaculately realized interior.",
            timeline: "3 PHASES · ~11 WEEKS",
            phases: [
                { label: "01 — SPATIAL PLANNING & CONCEPT", items: ["Priority executive consultation", "Full site verification & measurement", "Advanced spatial planning & reflected ceiling plans", "Executive moodboard"] },
                { label: "02 — VISUALIZATION & DEVELOPMENT", items: ["Comprehensive photorealistic 3D renders — all key spaces", "Bespoke furniture design", "Animated interior video walkthrough"] },
                { label: "03 — TECHNICAL DOCUMENTATION", items: ["Interior elevations — all rooms", "Custom millwork & cabinetry blueprints", "Tile layout & setting-out plans", "Full build-ready specification set"] },
            ],
        },
    ],
    buildSection: false,
    closing: "Every void considered. Every surface resolved.",
};

const initialFormState: GuideState = {
    message: "",
    errors: {},
    success: false,
};

/* ─── SERVICE GUIDE MODAL ────────────────────────────────────────────────── */
function GuideModal({ service, onClose }: { service: string; onClose: () => void }) {
    const [state, formAction, isPending] = useActionState(requestGuideAction, initialFormState);

    // Prevent background scroll when modal open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[999] flex items-end justify-center sm:items-center sm:px-4"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-neutral-900 border border-neutral-800 dark:border-white/5 w-full max-w-lg p-8 sm:p-12 sm:rounded-md shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-neutral-400 hover:text-white transition-colors p-2"
                    aria-label="Close modal"
                >
                    <X className="w-5 h-5" />
                </button>

                {!state.success ? (
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <span className="font-mono text-[9px] text-neutral-500 tracking-[0.3em] uppercase">SERVICE SCOPE</span>
                            <h3 className="text-3xl font-black tracking-tight text-white uppercase leading-none">
                                {service === "architecture" ? "ARCHITECTURAL\nDESIGN GUIDE" : "INTERIOR\nDESIGN GUIDE"}
                            </h3>
                        </div>

                        <p className="text-sm font-light text-neutral-400 leading-relaxed">
                            Receive our exhaustive service overview — detailing structural deliverables, timelines, and phase-by-phase scope straight to your inbox.
                        </p>

                        <form action={formAction} className="flex flex-col gap-6 pt-2">
                            {/* Hidden Service Type */}
                            <input type="hidden" name="service" value={service} />

                            {/* Name Input */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="guide-name" className="font-mono text-[9px] tracking-[0.2em] text-white uppercase flex justify-between">
                                    YOUR NAME
                                    {state.errors?.name && (
                                        <span className="text-red-500 lowercase tracking-normal italic">{state.errors.name[0]}</span>
                                    )}
                                </label>
                                <input
                                    id="guide-name"
                                    name="name"
                                    type="text"
                                    placeholder="Adaeze Okonkwo"
                                    required
                                    className="bg-neutral-800 border border-neutral-700/50 focus:border-white/50 px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition-colors rounded-sm"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="guide-email" className="font-mono text-[9px] tracking-[0.2em] text-white uppercase flex justify-between">
                                    EMAIL ADDRESS
                                    {state.errors?.email && (
                                        <span className="text-red-500 lowercase tracking-normal italic">{state.errors.email[0]}</span>
                                    )}
                                </label>
                                <input
                                    id="guide-email"
                                    name="email"
                                    type="email"
                                    placeholder="adaeze@example.com"
                                    required
                                    className="bg-neutral-800 border border-neutral-700/50 focus:border-white/50 px-4 py-3 text-sm text-white placeholder:text-neutral-600 outline-none transition-colors rounded-sm"
                                />
                            </div>

                            {/* General Message Error */}
                            {state.message && !state.success && (
                                <p className="text-xs text-red-500 italic">{state.message}</p>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isPending}
                                className="bg-white text-black font-mono text-[10px] font-bold uppercase tracking-[0.2em] py-4 hover:bg-neutral-200 transition-colors w-full rounded-sm flex items-center justify-center gap-2"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                        SENDING...
                                    </>
                                ) : (
                                    "SEND ME THE GUIDE →"
                                )}
                            </button>
                        </form>

                        <span className="font-mono text-[8px] text-neutral-600 tracking-wider text-center block">
                            Direct download link sent to verify and prevent mailbox spam.
                        </span>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center text-center py-6 gap-6">
                        <CheckCircle className="w-14 h-14 text-white animate-pulse" />
                        <div className="flex flex-col gap-2">
                            <h3 className="text-2xl font-black tracking-tight text-white uppercase leading-none">GUIDE SENT.</h3>
                            <p className="text-sm font-light text-neutral-400 leading-relaxed max-w-sm mt-2">
                                Please check your inbox. If it does not arrive within a few minutes, check your junk folder.<br /><br />
                                Once you have reviewed the details, feel free to get in touch.
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="bg-white text-black font-mono text-[10px] font-bold uppercase tracking-[0.2em] py-4 px-12 hover:bg-neutral-200 transition-colors rounded-sm"
                        >
                            RETURN TO SERVICES
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

/* ─── ACCORDION CARD ──────────────────────────────────────────────────────── */
function EngCard({
    eng,
    isOpen,
    toggle,
}: {
    eng: { num: string; name: string; sub: string; desc: string; timeline: string; phases: { label: string; items: string[] }[] };
    isOpen: boolean;
    toggle: () => void;
}) {
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="border-b border-neutral-100 dark:border-white/5 transition-all duration-300">
            <button
                onClick={toggle}
                className="w-full py-8 text-left flex justify-between items-center group focus:outline-none"
            >
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-[8px] text-neutral-400 dark:text-neutral-500 tracking-[0.2em]">{eng.num} / 03</span>
                    <h3 className="text-xl lg:text-2xl font-bold tracking-tight text-primary dark:text-white transition-colors group-hover:opacity-75">
                        {eng.name}
                    </h3>
                    <span className="font-mono text-[9px] text-neutral-400 dark:text-neutral-500 tracking-[0.1em]">{eng.sub}</span>
                </div>
                <div className="w-8 h-8 rounded-full border border-neutral-200 dark:border-white/10 flex items-center justify-center group-hover:border-primary dark:group-hover:border-white transition-colors">
                    <ChevronRight
                        className={`w-4 h-4 text-neutral-400 dark:text-white transition-transform duration-300 ${
                            isOpen ? "rotate-90" : ""
                        }`}
                    />
                </div>
            </button>

            <div
                ref={contentRef}
                style={{
                    maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : "0px",
                    opacity: isOpen ? 1 : 0,
                    overflow: "hidden",
                    transition: "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease",
                }}
            >
                <div className="pb-8 flex flex-col gap-6 text-sm font-light text-primary/70 dark:text-white/70">
                    <p className="leading-relaxed border-b border-neutral-100 dark:border-white/5 pb-6">
                        {eng.desc}
                    </p>
                    <div>
                        <span className="font-mono text-[9px] text-primary dark:text-white tracking-widest block mb-4 uppercase">
                            ⏳ ESTIMATED TIMELINE: <span className="font-bold">{eng.timeline}</span>
                        </span>
                        <div className="flex flex-col gap-6 mt-4">
                            {eng.phases.map((phase, i) => (
                                <div key={i} className="flex flex-col gap-3">
                                    <h4 className="font-mono text-[9px] tracking-widest text-neutral-400 dark:text-neutral-500 uppercase border-b border-neutral-100 dark:border-white/5 pb-2">
                                        {phase.label}
                                    </h4>
                                    <ul className="flex flex-col gap-2">
                                        {phase.items.map((item, j) => (
                                            <li key={j} className="flex gap-3 items-start">
                                                <span className="text-neutral-400 dark:text-neutral-500 font-mono">→</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─── SERVICES INDEX ──────────────────────────────────────────────────────── */
function ServicesIndex({ setPage }: { setPage: (p: string) => void }) {
    return (
        <div className="flex flex-col">
            {/* HERO */}
            <section className="px-8 lg:px-24 py-24 lg:py-36 border-b border-neutral-100 dark:border-white/5 flex flex-col gap-8">
                <span className="font-mono text-[10px] tracking-[0.4em] text-neutral-400 uppercase">03 — SERVICES</span>
                <h1 className="text-5xl lg:text-7xl font-black uppercase tracking-tighter leading-[0.9] text-primary dark:text-white">
                    Every line<br />serves<br />a purpose.
                </h1>
                <p className="text-lg lg:text-xl font-light text-primary/60 dark:text-white/60 max-w-xl leading-relaxed">
                    Vartex operates across two specialized architectural disciplines. In both fields, our commitment is absolute: resolving structural voids and interior proportions through systematic rigor.
                </p>
            </section>

            {/* SECTIONS GRID */}
            <section className="grid grid-cols-1 lg:grid-cols-2">
                {/* ARCHITECTURE */}
                <div className="px-8 lg:px-24 py-20 lg:py-32 border-b lg:border-b-0 lg:border-r border-neutral-100 dark:border-white/5 flex flex-col gap-8 justify-between">
                    <div className="flex flex-col gap-6">
                        <span className="font-mono text-xs tracking-widest text-neutral-400">01</span>
                        <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-primary dark:text-white uppercase leading-none">
                            Architectural<br />Design
                        </h2>
                        <p className="text-sm font-light text-primary/60 dark:text-white/60 leading-relaxed max-w-md">
                            We design structures from the inside out — beginning with site context, solar orientation, and structural integrity to shape spatial interactions.
                        </p>
                    </div>
                    <button
                        onClick={() => setPage("architecture")}
                        className="bg-primary dark:bg-white text-white dark:text-black font-mono text-[10px] font-bold uppercase tracking-[0.2em] py-5 px-8 hover:bg-black dark:hover:bg-neutral-200 transition-colors w-full sm:w-auto self-start mt-8"
                    >
                        EXPLORE THIS SERVICE →
                    </button>
                </div>

                {/* INTERIOR */}
                <div className="px-8 lg:px-24 py-20 lg:py-32 border-b lg:border-b-0 border-neutral-100 dark:border-white/5 flex flex-col gap-8 justify-between">
                    <div className="flex flex-col gap-6">
                        <span className="font-mono text-xs tracking-widest text-neutral-400">02</span>
                        <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-primary dark:text-white uppercase leading-none">
                            Interior<br />Design
                        </h2>
                        <p className="text-sm font-light text-primary/60 dark:text-white/60 leading-relaxed max-w-md">
                            Proportion, surface finishes, and custom millwork are integrated seamlessly to complete architectural spaces.
                        </p>
                    </div>
                    <button
                        onClick={() => setPage("interior")}
                        className="border border-neutral-200 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/5 text-primary dark:text-white font-mono text-[10px] font-bold uppercase tracking-[0.2em] py-5 px-8 transition-colors w-full sm:w-auto self-start mt-8"
                    >
                        EXPLORE THIS SERVICE →
                    </button>
                </div>
            </section>

            {/* ADVISORY SECTION */}
            <section className="px-8 lg:px-24 py-20 lg:py-32 bg-neutral-50 dark:bg-neutral-900/10 border-t border-neutral-100 dark:border-white/5 flex flex-col gap-8">
                <span className="font-mono text-[9px] tracking-[0.3em] text-neutral-400 uppercase">COORDINATED ENGAGEMENT</span>
                <h3 className="text-2xl lg:text-4xl font-black tracking-tight text-primary dark:text-white uppercase leading-none">
                    Some projects require both.
                </h3>
                <p className="text-sm font-light text-primary/60 dark:text-white/60 max-w-2xl leading-relaxed">
                    The highest design outcomes are achieved when exterior volumes and interior staging are resolved concurrently. If your project is still open in scope, let&apos;s begin with a coordinated design consultation.
                </p>
                <Link
                    href="/contact"
                    className="border border-primary dark:border-white text-primary dark:text-white hover:bg-primary hover:text-white dark:hover:bg-white dark:hover:text-black font-mono text-[10px] font-bold uppercase tracking-[0.2em] py-5 px-10 transition-colors w-full sm:w-auto self-start text-center"
                >
                    BEGIN A CONVERSATION
                </Link>
            </section>
        </div>
    );
}

/* ─── SERVICES DETAIL ─────────────────────────────────────────────────────── */
function ServicesDetail({ data, setPage }: { data: typeof ARCH; setPage: (p: string) => void }) {
    const [openCardIndex, setOpenCardIndex] = useState<number | null>(0);
    const [showGuide, setShowGuide] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [data.id]);

    return (
        <div className="flex flex-col">
            {/* BREADCRUMB */}
            <div className="px-8 lg:px-24 py-6 border-b border-neutral-100 dark:border-white/5 flex gap-3 items-center font-mono text-[9px] tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
                <button onClick={() => setPage("index")} className="hover:text-primary dark:hover:text-white transition-colors">
                    SERVICES
                </button>
                <span>/</span>
                <span className="text-primary dark:text-white">{data.label}</span>
            </div>

            {/* HERO */}
            <section className="px-8 lg:px-24 py-20 lg:py-32 border-b border-neutral-100 dark:border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-8 flex flex-col gap-8">
                    <span className="font-mono text-[10px] tracking-[0.4em] text-neutral-400 uppercase">0{data.index} — SERVICE DIRECTORY</span>
                    <h1 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-primary dark:text-white">
                        {data.headline.map((line, idx) => (
                            <span key={idx} className="block">{line}</span>
                        ))}
                    </h1>
                    <p className="text-lg lg:text-xl font-light text-primary/60 dark:text-white/60 leading-relaxed max-w-xl">
                        {data.hero}
                    </p>
                    <span className="font-mono text-xs tracking-widest text-primary dark:text-white uppercase font-semibold">
                        {data.tagline}
                    </span>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-4 lg:sticky lg:top-24 w-full">
                    <button
                        onClick={() => setShowGuide(true)}
                        className="bg-primary dark:bg-white text-white dark:text-black font-mono text-[10px] font-bold uppercase tracking-[0.2em] py-5 px-8 hover:bg-black dark:hover:bg-neutral-200 transition-colors w-full"
                    >
                        RECEIVE SERVICE GUIDE
                    </button>
                    <Link
                        href="/contact"
                        className="border border-neutral-200 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/5 text-primary dark:text-white font-mono text-[10px] font-bold uppercase tracking-[0.2em] py-5 px-8 transition-colors text-center w-full block"
                    >
                        START A PROJECT
                    </Link>
                </div>
            </section>

            {/* APPROACH */}
            <section className="px-8 lg:px-24 py-20 lg:py-32 bg-neutral-50 dark:bg-neutral-900/10 border-b border-neutral-100 dark:border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <h2 className="lg:col-span-4 font-mono text-[10px] tracking-[0.3em] text-neutral-400 uppercase">OUR APPROACH</h2>
                <div className="lg:col-span-8 border-l-2 border-primary/20 dark:border-white/10 pl-6 lg:pl-10">
                    <p className="text-xl lg:text-2xl font-light text-primary/80 dark:text-white/80 leading-relaxed">
                        {data.approach}
                    </p>
                </div>
            </section>

            {/* METHODOLOGY / HOW WE WORK */}
            <section className="px-8 lg:px-24 py-20 lg:py-32 border-b border-neutral-100 dark:border-white/5 flex flex-col gap-16">
                <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-400 uppercase">HOW WE WORK</span>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {data.how.map(([num, title, desc]) => (
                        <div key={num} className="flex flex-col gap-4 border-t border-neutral-100 dark:border-white/5 pt-6">
                            <span className="font-mono text-xs text-neutral-400">{num}</span>
                            <h4 className="text-lg font-bold uppercase tracking-tight text-primary dark:text-white">{title}</h4>
                            <p className="text-xs text-primary/60 dark:text-white/60 leading-relaxed">{desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* PACKAGES / ACCORDIONS */}
            <section className="px-8 lg:px-24 py-20 lg:py-32 border-b border-neutral-100 dark:border-white/5 flex flex-col gap-12">
                <div className="flex flex-col gap-4">
                    <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-400 uppercase">ENGAGEMENT MODELS</span>
                    <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-primary dark:text-white">
                        Three scoping tiers.
                    </h2>
                    <p className="text-sm font-light text-primary/60 dark:text-white/60 max-w-xl leading-relaxed">
                        We offer structured services scaled to match your project&apos;s level of complexity — from technical documentation packages to full concierge representation.
                    </p>
                </div>

                <div className="flex flex-col border-t border-neutral-100 dark:border-white/5 mt-6">
                    {data.engagements.map((eng, idx) => (
                        <EngCard
                            key={idx}
                            eng={eng}
                            isOpen={openCardIndex === idx}
                            toggle={() => setOpenCardIndex(openCardIndex === idx ? null : idx)}
                        />
                    ))}
                </div>
            </section>

            {/* BUILD SECTION */}
            {data.buildSection && (
                <section className="px-8 lg:px-24 py-20 lg:py-32 bg-neutral-50 dark:bg-neutral-900/10 border-b border-neutral-100 dark:border-white/5 grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-5 flex flex-col gap-4">
                        <span className="font-mono text-[10px] tracking-[0.3em] text-neutral-400 uppercase">CONSTRUCTION MANAGEMENT</span>
                        <h3 className="text-3xl font-black tracking-tight text-primary dark:text-white uppercase leading-none">
                            The build.
                        </h3>
                        <p className="text-xs font-mono tracking-widest text-neutral-400 uppercase">FOR APPROVED DESIGN DRAWINGS</p>
                    </div>
                    <div className="lg:col-span-7 flex flex-col gap-8">
                        <p className="text-sm font-light text-primary/60 dark:text-white/60 leading-relaxed max-w-xl">
                            If you already possess complete design blueprints, Vartex can coordinate the project as the **Lead Consultant** — ensuring technical guidelines are maintained during actual layout construction:
                        </p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-light">
                            {[
                                "QS Coordination & Bill of Quantities",
                                "Contractor Tendering & Bid Review",
                                "Scheduled On-site Verification Inspections",
                                "Material Mockup Approvals",
                                "Payment Certificate Issuance",
                                "Snag List & Final Handover Packages",
                            ].map((item, idx) => (
                                <li key={idx} className="flex gap-3 items-center">
                                    <span className="text-neutral-400 dark:text-neutral-500 font-mono">→</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {/* CLOSING SECTION */}
            <section className="px-8 lg:px-24 py-24 lg:py-40 text-center border-b border-neutral-100 dark:border-white/5 flex flex-col gap-8 items-center max-w-4xl mx-auto">
                <span className="font-mono text-[9px] tracking-[0.4em] text-neutral-400 uppercase">TIMELINES</span>
                <h2 className="text-4xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-primary dark:text-white">
                    Let&apos;s build.
                </h2>
                <p className="text-sm font-light text-primary/60 dark:text-white/60 max-w-md leading-relaxed">
                    {data.closing}<br />
                    Transforming blueprints into precise spatial solutions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full sm:w-auto">
                    <button
                        onClick={() => setShowGuide(true)}
                        className="bg-primary dark:bg-white text-white dark:text-black font-mono text-[10px] font-bold uppercase tracking-[0.2em] py-5 px-10 hover:bg-black dark:hover:bg-neutral-200 transition-colors rounded-sm"
                    >
                        RECEIVE SERVICE GUIDE
                    </button>
                    <Link
                        href="/contact"
                        className="border border-neutral-200 dark:border-white/10 hover:bg-neutral-50 dark:hover:bg-white/5 text-primary dark:text-white font-mono text-[10px] font-bold uppercase tracking-[0.2em] py-5 px-10 transition-colors text-center rounded-sm"
                    >
                        START A PROJECT
                    </Link>
                </div>
            </section>

            {showGuide && <GuideModal service={data.id} onClose={() => setShowGuide(false)} />}
        </div>
    );
}

/* ─── MAIN CLIENT WRAPPER ─────────────────────────────────────────────────── */
export default function ServicesClient() {
    const [page, setPage] = useState("index");

    // Scroll to top when view changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [page]);

    return (
        <div className="flex flex-col min-h-screen bg-white dark:bg-background-dark text-primary dark:text-white pt-20">
            <Header />

            <main className="flex-grow">
                {page === "index" && <ServicesIndex setPage={setPage} />}
                {page === "architecture" && <ServicesDetail data={ARCH} setPage={setPage} />}
                {page === "interior" && <ServicesDetail data={INT} setPage={setPage} />}
            </main>

            <Footer />
        </div>
    );
}
