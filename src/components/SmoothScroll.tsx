"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const [isTouchDevice, setIsTouchDevice] = useState<boolean | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        const media = window.matchMedia("(max-width: 1023px), (pointer: coarse)");
        const update = () => setIsTouchDevice(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    // Lenis intercepts wheel events at the window level, which breaks scrolling
    // inside the embedded Sanity Studio's nested scroll containers on /admin.
    if (isTouchDevice !== false || pathname?.startsWith("/admin")) return <>{children}</>;

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            {children as any}
        </ReactLenis>
    );
}
