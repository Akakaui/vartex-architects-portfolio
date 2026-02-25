"use client";

import Link from "next/link";
import Image from "next/image";
import NewsletterSignup from "./NewsletterSignup";

export default function Footer() {
    return (
        <footer className="px-8 lg:px-24 py-12 lg:py-24 bg-white dark:bg-background-dark border-t border-neutral-100 dark:border-white/5 relative overflow-hidden" aria-label="Site footer">

            {/* Background Logo Overlay */}
            <div className="absolute -bottom-24 -right-12 text-[20vw] font-black text-neutral-50 dark:text-white/[0.02] pointer-events-none select-none tracking-tighter uppercase leading-none">
                VARTEX
            </div>

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">

                {/* Brand Column */}
                <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-8">
                    <div className="flex flex-col gap-0 items-start">
                        <div className="relative mb-4 lg:mb-6">
                            {/* Light mode: black logo */}
                            <Image
                                src="/brand-logo-light-transparent.png"
                                alt="VARTEX Logo"
                                width={200}
                                height={200}
                                className="w-auto h-16 lg:h-24 object-contain object-left dark:hidden"
                            />
                            {/* Dark mode: white logo */}
                            <Image
                                src="/brand-logo-dark-transparent.png"
                                alt="VARTEX Logo"
                                width={200}
                                height={200}
                                className="w-auto h-16 lg:h-24 object-contain object-left hidden dark:block"
                            />
                        </div>
                    </div>
                    <p className="text-sm font-light text-primary/60 dark:text-white/60 max-w-xs leading-relaxed italic">
                        Shaping the modern landscape through mathematical rigor and artistic intuition.
                    </p>
                </div>

                {/* Social Column — SVG Icons on mobile, text on desktop */}
                <div className="lg:col-span-2 lg:col-start-5 flex flex-col gap-4 lg:gap-8">
                    <span className="font-mono text-[10px] tracking-[0.4em] text-primary/40 dark:text-white/40 uppercase">SOCIALS</span>

                    {/* SVG Icons — visible on both mobile and desktop */}
                    <nav className="flex flex-wrap gap-4 lg:gap-5 items-center">
                        {/* Threads */}
                        <a href="https://www.threads.net/@vartex_architects" target="_blank" rel="noopener noreferrer" aria-label="Threads" className="hover:opacity-40 transition-opacity text-primary dark:text-white">
                            <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.712-.163 1.684-.65 2.994-1.456 3.89-.935 1.036-2.27 1.562-3.97 1.562h-.16c-1.077-.044-2.006-.415-2.685-1.073-.758-.736-1.158-1.746-1.124-2.847.063-2.048 1.668-3.478 3.9-3.478.585 0 1.143.087 1.657.26-.072-.825-.272-1.476-.596-1.94-.438-.63-1.126-.953-2.042-.96h-.06c-.72 0-1.672.244-2.236.825l-1.404-1.5c.899-.9 2.244-1.395 3.59-1.443h.117c1.476 0 2.71.497 3.558 1.433.755.834 1.218 2.01 1.377 3.496.589.26 1.12.6 1.586 1.018l.006-.009c.658.594 1.179 1.35 1.523 2.222.726 1.828.713 4.516-1.37 6.555-1.832 1.793-4.072 2.55-7.26 2.572zM11.29 14.09c-1.245 0-1.957.663-1.982 1.845-.013.553.167 1.023.505 1.322.312.278.75.418 1.267.44h.12c1.882 0 2.474-1.417 2.582-3.012-.505-.22-1.08-.336-1.71-.345h-.133l-.649-.25z" /></svg>
                        </a>
                        {/* WhatsApp */}
                        <a href="https://wa.me/qr/2CY37ORA7HOII1" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="hover:opacity-40 transition-opacity text-primary dark:text-white">
                            <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                        </a>
                        {/* X (Twitter) */}
                        <a href="https://x.com/VartexArchitect" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="hover:opacity-40 transition-opacity text-primary dark:text-white">
                            <svg className="w-[18px] h-[18px] lg:w-[22px] lg:h-[22px]" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                        </a>
                        {/* LinkedIn */}
                        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:opacity-40 transition-opacity text-primary dark:text-white">
                            <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                        </a>
                        {/* Instagram */}
                        <a href="https://www.instagram.com/vartex_architects?igsh=MWsxNDJqZmJ4aXEwNA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:opacity-40 transition-opacity text-primary dark:text-white">
                            <svg className="w-5 h-5 lg:w-6 lg:h-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z" /></svg>
                        </a>
                    </nav>
                </div>



                {/* Contact Column */}
                <div className="lg:col-span-3 lg:col-start-10 flex flex-col gap-4 lg:gap-8 lg:text-right">
                    <span className="font-mono text-[10px] tracking-[0.4em] text-primary/40 dark:text-white/40 uppercase">CONTACT US</span>
                    <div className="flex flex-col gap-2 lg:items-end">
                        <a href="tel:+2347032697179" className="text-lg lg:text-xl font-bold text-primary dark:text-white uppercase leading-tight tracking-widest hover:opacity-50 transition-opacity">+234 703 269 7179</a>
                        <a href="mailto:info@vartexarchitects.com" className="text-lg lg:text-xl font-bold text-primary dark:text-white hover:opacity-50 transition-opacity break-words">info@vartexarchitects.com</a>
                    </div>
                </div>

            </div>

            {/* Sub Footer */}
            <div className="relative z-10 mt-12 lg:mt-24 pt-8 lg:pt-12 border-t border-neutral-100 dark:border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 lg:gap-8 font-mono text-[9px] tracking-[0.2em] text-primary/30 dark:text-white/30 uppercase">
                <div className="flex gap-8">
                    <Link href="/privacy" className="hover:text-primary dark:hover:text-white">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-primary dark:hover:text-white">Terms of Service</Link>
                </div>
                <span>© 2026 VARTEX ARCHITECTS</span>
            </div>
        </footer>
    );
}
