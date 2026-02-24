"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { newsletterSignupAction, NewsletterState } from "@/app/newsletter/actions";

const initialState: NewsletterState = {
    message: "",
    success: false,
};

export default function NewsletterSignup() {
    const [state, formAction, isPending] = useActionState(newsletterSignupAction, initialState);
    const [showSuccess, setShowSuccess] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state.success) {
            setShowSuccess(true);
            formRef.current?.reset();
            const timer = setTimeout(() => setShowSuccess(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [state]);

    return (
        <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] tracking-[0.4em] text-primary/40 dark:text-white/40 uppercase">
                NEWSLETTER
            </span>
            <p className="text-xs font-light text-primary/50 dark:text-white/50 leading-relaxed max-w-xs">
                Stay updated with our latest projects and design insights.
            </p>
            <form ref={formRef} action={formAction} className="flex gap-2 max-w-xs">
                <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    className="flex-1 bg-transparent border border-neutral-200 dark:border-white/10 rounded-none px-3 py-2 text-xs text-primary dark:text-white placeholder:text-primary/30 dark:placeholder:text-white/30 font-mono tracking-wider focus:outline-none focus:border-primary dark:focus:border-white/30 transition-colors"
                    disabled={isPending}
                />
                <button
                    type="submit"
                    disabled={isPending}
                    className="bg-primary dark:bg-white text-white dark:text-primary text-[9px] font-mono tracking-[0.2em] uppercase px-4 py-2 hover:opacity-80 transition-opacity disabled:opacity-40"
                >
                    {isPending ? "..." : "JOIN"}
                </button>
            </form>

            {/* Success message */}
            {showSuccess && (
                <p className="text-[10px] font-mono tracking-wider text-green-600 dark:text-green-400 animate-pulse">
                    ✓ {state.message}
                </p>
            )}

            {/* Error message */}
            {!state.success && state.message && (
                <p className="text-[10px] font-mono tracking-wider text-red-500">
                    {state.message}
                </p>
            )}
        </div>
    );
}
