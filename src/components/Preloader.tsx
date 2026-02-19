"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLImageElement>(null);
    const totalFrames = 42; // based on file count
    // Duration in seconds for the entire sequence
    const duration = 2.5;

    useEffect(() => {
        // Disable scroll
        document.body.style.overflow = "hidden";

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    // Frame animation done
                    gsap.to(containerRef.current, {
                        yPercent: -100,
                        duration: 0.8,
                        ease: "power4.inOut",
                        onComplete: () => {
                            setIsLoading(false);
                            document.body.style.overflow = "unset";
                        }
                    });
                }
            });

            // Frame Animation simulator
            // We'll use a proxy object to tween the 'frame' number
            const frameObj = { frame: 0 };

            tl.to(frameObj, {
                frame: totalFrames - 1,
                duration: duration,
                ease: "none",
                onUpdate: () => {
                    if (frameRef.current) {
                        const currentFrame = Math.round(frameObj.frame);
                        // Format: LOGO-ANIMATION_0000_Layer-43.png
                        // The tricky part is the filenames are reversed in layer number? 
                        // Let's look at file naming:
                        // 0000_Layer-43
                        // 0001_Layer-42
                        // ...
                        // 0041_Layer-2

                        // We need to construct the filename based on the index (0 to 41)
                        // The suffix 'Layer-XX' changes. 
                        // It seems Layer number is 43 - index.
                        // Let's verify: 
                        // Index 0 -> 43
                        // Index 41 -> 43 - 41 = 2. Matches 0041_Layer-2.

                        const layerNum = 43 - currentFrame;
                        const frameStr = currentFrame.toString().padStart(4, '0');

                        // Construct the path
                        // public/loader/LOGO-ANIMATION_${frameStr}_Layer-${layerNum}.png
                        frameRef.current.src = `/loader/LOGO-ANIMATION_${frameStr}_Layer-${layerNum}.png`;
                    }
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (!isLoading) return null;

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
            <div className="relative w-64 h-64 md:w-96 md:h-96">
                {/* We use specific <img> tag for manual src updates to avoid React overhead on rapid frame changes */}
                <img
                    ref={frameRef}
                    src="/loader/LOGO-ANIMATION_0000_Layer-43.png"
                    alt="Loading..."
                    className="w-full h-full object-contain"
                />
            </div>

            <div className="absolute bottom-8 right-8 font-mono text-[10px] text-white/20 tracking-[0.3em] uppercase animate-pulse">
                INITIALIZING VARTEX...
            </div>
        </div>
    );
}
