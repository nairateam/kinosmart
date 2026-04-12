"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

type Partner = {
    name: string;
    logo?: string;
};

const partners: Partner[] = [
    { name: "Acme Corp", logo: "/logos/miden.svg" },
    { name: "NovaTech", logo: "/logos/panovest.png" },
    { name: "Reditton" },
    { name: "Meridian", logo: "/logos/gigm.png" },
    { name: "Apex Labs", logo: "/logos/cochda.png" },
    { name: "Crestline" },
    { name: "Sk&T construct" },
];

export default function TrustedBy() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLParagraphElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                headingRef.current,
                { opacity: 0, y: 16 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );

            gsap.fromTo(
                trackRef.current,
                { opacity: 0 },
                {
                    opacity: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: trackRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        }, sectionRef);

        const timer = setTimeout(() => ScrollTrigger.refresh(), 100);
        const onResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", onResize);

        return () => {
            ctx.revert();
            clearTimeout(timer);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    const logoSet = [...partners, ...partners];

    return (
        <section id="partners" ref={sectionRef} className="bg-white py-12 md:py-16 overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 mb-10 text-center">
                <p
                    ref={headingRef}
                    className="text-base md:text-2xl text-black/70 font-medium tracking-[0.12em] px-4"
                >
                    Trusted by Nigeria&apos;s fastest growing teams
                </p>
            </div>

            <div ref={trackRef} className="max-w-6xl mx-auto relative">
                {/* Fade edges */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

                <div className="flex overflow-hidden">
                    <div className="flex items-center gap-12 md:gap-20 whitespace-nowrap animate-marquee">
                        {logoSet.map((partner, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-center shrink-0 h-10 opacity-50 grayscale hover:opacity-90 hover:grayscale-0 transition-all duration-300"
                            >
                                {partner.logo ? (
                                    <Image
                                        src={partner.logo}
                                        alt={partner.name}
                                        width={120}
                                        height={40}
                                        className="h-full w-auto object-contain"
                                    />
                                ) : (
                                    <span className="text-sm font-semibold text-gray-700 tracking-tight whitespace-nowrap">
                                        {partner.name}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}