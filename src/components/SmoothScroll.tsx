"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { ReactNode, useEffect, useState } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
    const [isTouchDevice, setIsTouchDevice] = useState<boolean | null>(null);

    useEffect(() => {
        const media = window.matchMedia("(max-width: 1023px), (pointer: coarse)");
        const update = () => setIsTouchDevice(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    if (isTouchDevice !== false) return <>{children}</>;

    return (
        <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
            {children as any}
        </ReactLenis>
    );
}
