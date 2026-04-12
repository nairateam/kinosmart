"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(SplitText, ScrollTrigger);

export default function HeroSection() {
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const imageSectionRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const headingSplit = new SplitText(headingRef.current, {
            type: "lines",
            linesClass: "overflow-hidden",
        });

        const subSplit = new SplitText(subRef.current, {
            type: "lines",
            linesClass: "overflow-hidden",
        });

        gsap.set([headingRef.current, subRef.current], { visibility: "visible" });
        gsap.set(headingSplit.lines, { clipPath: "inset(0 100% 0 0)", y: 24 });
        gsap.set(subSplit.lines, { clipPath: "inset(0 100% 0 0)", y: 16 });
        gsap.set(ctaRef.current, { autoAlpha: 0, y: 16 });
        gsap.set(imageRef.current, { clipPath: "inset(0 100% 0 0)" });
        gsap.set(overlayRef.current, { autoAlpha: 0 });

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        tl.to(headingSplit.lines, {
            clipPath: "inset(0 0% 0 0)",
            y: 0,
            duration: 0.85,
            delay: 0.6,
            stagger: 0.12,
        })
            .to(
                subSplit.lines,
                { clipPath: "inset(0 0% 0 0)", y: 0, duration: 0.7, stagger: 0.09 },
                "-=0.55"
            )
            .to(
                ctaRef.current,
                { autoAlpha: 1, y: 0, duration: 0.5 },
                "-=0.3"
            );

        const revealImage = () => {
            gsap.to(imageRef.current, {
                clipPath: "inset(0 0% 0 0)",
                duration: 0.6,
                ease: "power4.inOut",
                onComplete: () => {
                    gsap.to(overlayRef.current, {
                        autoAlpha: 1,
                        duration: 0.5,
                        ease: "power2.out",
                    });
                },
            });
        };

        ScrollTrigger.create({
            trigger: imageSectionRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
                if (tl.isActive()) {
                    tl.then(revealImage);
                } else {
                    revealImage();
                }
            },
        });

        return () => {
            headingSplit.revert();
            subSplit.revert();
        };
    }, []);

    return (
        <main className="pt-16 md:pt-24">
            <section className="mx-auto max-w-5xl flex flex-col items-center justify-center text-center px-6 py-24">
                <h1
                    ref={headingRef}
                    className="text-3xl md:text-6xl font-semibold text-gray-900 leading-tight"
                    style={{ visibility: "hidden" }}
                >
                    High-Performance Computing for Fast-Growing Teams
                </h1>

                <p
                    ref={subRef}
                    className="mt-6 text-sm md:text-base text-gray-500 max-w-2xl leading-relaxed"
                    style={{ visibility: "hidden" }}
                >
                    We procure, optimize, and manage the elite hardware that powers your
                    vision. From top-tier MacBooks to high-end AI workstations, we help
                    you scale without operational lag.
                </p>

                <div
                    ref={ctaRef}
                    className="mt-8 flex items-center gap-3"
                    style={{ visibility: "hidden" }}
                >
                    <button className="px-6 py-3.5 text-sm font-medium text-white bg-[#023F42] rounded-full hover:bg-gray-700 transition-colors">
                        <Link href="#contact">
                            Get a Quote
                        </Link>
                    </button>
                    <button className="px-6 py-3.5 text-sm font-medium text-[#023F42] border border-[#023F42] rounded-full hover:bg-gray-50 transition-colors">
                        <Link href="#services">
                            Our Services
                        </Link>
                    </button>
                </div>
            </section>

            <section
                ref={imageSectionRef}
                className="relative w-full h-[60vh] md:h-[90vh] overflow-hidden"
            >
                <div
                    ref={imageRef}
                    className="absolute inset-0 bg-cover bg-center z-0"
                    style={{ backgroundImage: "url('/hero.webp')" }}
                />
                <div
                    ref={overlayRef}
                    className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/70 z-10"
                />
            </section>
        </main>
    );
}