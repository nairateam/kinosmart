"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
    {
        number: "01",
        title: "Technical Alignment",
        subtitle: "We speak your stack.",
        description:
            "We understand the tech. We help you invest in the exact worktool configurations your workflow demands—preventing you from overpaying for overkill specs or under-equipping your top talent.",
        accent: "Invest precisely.",
    },
    {
        number: "02",
        title: "Rapid Deployment",
        subtitle: "In a high-growth environment, waiting is losing.",
        description:
            "We maintain a curated, local inventory of enterprise-grade worktools ready for dispatch. We also facilitate the sourcing and installation of software so your team is productive the moment they unbox.",
        accent: "Delivered. Installed. Done.",
    },
    {
        number: "03",
        title: "Priority Operational Support",
        subtitle: "We don't just sell—we maintain.",
        description:
            "Our specialized team in Lagos provides priority diagnostics and repairs. We remove hardware bottlenecks ensuring your tools stay in peak working condition.",
        accent: "Always operational.",
    },
    {
        number: "04",
        title: "Trusted by the Best",
        subtitle: "The partner of Nigeria's most ambitious teams.",
        description:
            "From high-growth startups to independent creative powerhouses, we provide the technical reliability that top founders trust to power their vision.",
        accent: "Proven at scale.",
    },
];

export default function WhyUs() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Heading fade-in
        gsap.fromTo(
            headingRef.current,
            { opacity: 0, y: 36 },
            {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top 80%",
                    once: true,
                },
            }
        );

        // Staggered card reveal
        if (cardsRef.current) {
            const cards = cardsRef.current.querySelectorAll(".why-card");
            gsap.fromTo(
                cards,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.65,
                    ease: "power3.out",
                    stagger: 0.12,
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: "top 78%",
                        once: true,
                    },
                }
            );
        }

        // Divider line draw
        gsap.fromTo(
            dividerRef.current,
            { scaleX: 0, transformOrigin: "left center" },
            {
                scaleX: 1,
                duration: 1.1,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: dividerRef.current,
                    start: "top 85%",
                    once: true,
                },
            }
        );
    }, []);

    return (
        <section
            ref={sectionRef}
            id="why-us"
            className="bg-gray-950 py-20 md:py-28 px-6 overflow-hidden"
        >
            <div className="mx-auto max-w-7xl">

                {/* — Header — */}
                <div ref={headingRef} className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div className="max-w-xl">
                        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">
                            Why Kinosmart
                        </span>
                        <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
                            Built for teams that{" "}
                            <span className="text-gray-400 italic font-normal">can't afford</span>{" "}
                            to slow down.
                        </h2>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed max-w-xs md:text-right">
                        Four principles that separate a vendor from a true operational partner.
                    </p>
                </div>

                {/* — Divider — */}
                <div
                    ref={dividerRef}
                    className="h-px bg-gray-800 mb-0"
                />

                {/* — Cards grid — */}
                <div
                    ref={cardsRef}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {REASONS.map((reason, i) => (
                        <div
                            key={reason.number}
                            className={`why-card group relative flex flex-col gap-6 px-0 py-10 md:py-14
                                ${i < REASONS.length - 1 ? "sm:border-r sm:border-gray-800" : ""}
                                ${i > 0 ? "border-t border-gray-800 sm:border-t-0" : ""}
                                sm:px-8 first:pl-0 last:pr-0
                            `}
                        >
                            {/* Number */}
                            <span className="text-xs font-semibold tracking-widest text-gray-700 font-mono tabular-nums">
                                {reason.number}
                            </span>

                            {/* Title + subtitle */}
                            <div className="space-y-1.5">
                                <h3 className="text-base md:text-lg font-semibold text-white leading-snug">
                                    {reason.title}
                                </h3>
                                <p className="text-xs text-gray-500 italic leading-relaxed">
                                    {reason.subtitle}
                                </p>
                            </div>

                            {/* Description */}
                            <p className="text-sm text-gray-400 leading-relaxed flex-1">
                                {reason.description}
                            </p>

                            {/* Accent tag */}
                            <span className="inline-block self-start text-xs font-semibold uppercase tracking-widest text-gray-600 border border-gray-800 rounded-full px-3 py-1 group-hover:border-gray-600 group-hover:text-gray-400 transition-colors duration-300">
                                {reason.accent}
                            </span>

                            {/* Hover highlight line */}
                            <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-white group-hover:w-full transition-all duration-500 ease-out" />
                        </div>
                    ))}
                </div>

                {/* — Bottom divider — */}
                <div className="h-px bg-gray-800 mt-0" />

                {/* — Stat bar — */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mt-0 border-t-0">
                    {[
                        { value: "500+", label: "Worktools deployed" },
                        { value: "48h", label: "Average turnaround" },
                        { value: "Lagos", label: "Local. On-ground. Fast." },
                        { value: "100%", label: "Enterprise-grade only" },
                    ].map((stat, i) => (
                        <div
                            key={stat.label}
                            className={`py-8 md:py-10 flex flex-col gap-1
                                ${i > 0 ? "border-l border-gray-800 pl-6 md:pl-10" : ""}
                                ${i < 2 ? "border-b border-gray-800 md:border-b-0" : ""}
                            `}
                        >
                            <span className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                                {stat.value}
                            </span>
                            <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}