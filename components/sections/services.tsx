"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import EmblaCarousel from "../ui/carousel";

gsap.registerPlugin(ScrollTrigger);

type ServiceCard = {
    step: number;
    title: string;
    subtitle: string;
    description: string;
    backgroundImage?: string;
    image?: string;
};

const services: ServiceCard[] = [
    {
        step: 1,
        title: "Worktool Procurement",
        subtitle: "Precision-Sourced Hardware.",
        description:
            "We specialize in the immediate supply of high-performance worktools—from top-tier MacBook Pros to high-end workstations equipped with the latest A.I NPU graphics. We eliminate the bottleneck of long wait times ensuring your team gets the exact specs required to build at scale.",
        backgroundImage: "/slide-1.webp",
    },
    {
        step: 2,
        title: "Repair & Maintenance",
        subtitle: "Zero Downtime. Total Tool Harmony.",
        description:
            "A broken device is an operational lag you can't afford. Our specialized team of engineers provides professional diagnostics and priority repairs. We restore your team's tools to peak performance, ensuring your workflow remains uninterrupted.",
        backgroundImage: "/slide-2.webp",
    },
    {
        step: 3,
        title: "Software Solutions",
        subtitle: "Optimizing Your Digital Ecosystem.",
        description:
            "Performance hardware requires verified software ecosystems. We assist organizations in sourcing and installing legitimate, high-performance software, ensuring your worktools operate with the security and stability your business demands.",
        backgroundImage: "/slide-3.webp",
    },
    {
        step: 1,
        title: "Worktool Procurement",
        subtitle: "Precision-Sourced Hardware.",
        description:
            "We specialize in the immediate supply of high-performance worktools—from top-tier MacBook Pros to high-end workstations equipped with the latest A.I NPU graphics. We eliminate the bottleneck of long wait times ensuring your team gets the exact specs required to build at scale.",
        backgroundImage: "/slide-1.webp",
    },
    {
        step: 2,
        title: "Repair & Maintenance",
        subtitle: "Zero Downtime. Total Tool Harmony.",
        description:
            "A broken device is an operational lag you can't afford. Our specialized team of engineers provides professional diagnostics and priority repairs. We restore your team's tools to peak performance, ensuring your workflow remains uninterrupted.",
        backgroundImage: "/slide-2.webp",
    },
    {
        step: 3,
        title: "Software Solutions",
        subtitle: "Optimizing Your Digital Ecosystem.",
        description:
            "Performance hardware requires verified software ecosystems. We assist organizations in sourcing and installing legitimate, high-performance software, ensuring your worktools operate with the security and stability your business demands.",
        backgroundImage: "/slide-3.webp",
    },
];

export default function OurServices() {
    const sectionRef = useRef<HTMLElement>(null);
    const carouselRef = useRef<HTMLDivElement>(null);
    const carouselApiRef = useRef<{ play: () => void; stop: () => void; reset: () => void } | null>(null);

    // 2. Replace your useEffect with this:
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                carouselRef.current,
                { opacity: 0, y: 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    ease: "back.out(0.4)",
                    scrollTrigger: {
                        trigger: carouselRef.current,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                        onEnter: () => {
                            // Jump to slide 0, then start autoplay
                            carouselApiRef.current?.reset();
                            carouselApiRef.current?.play();
                        },
                        onLeaveBack: () => {
                            // Stop when scrolled back above the section
                            carouselApiRef.current?.stop();
                        },
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

    const slides = services.map((service) => (
        <div
            key={service.step}
            className="relative rounded-2xl overflow-hidden bg-gray-900 text-white h-115 xl:h-170 w-full"
        >
            {service.backgroundImage && (
                <Image
                    src={service.backgroundImage}
                    alt={service.title}
                    fill
                    className="object-cover opacity-70"
                />
            )}

            <div className="absolute inset-0 bg-linear-to-r from-black/90 to-black/20" />

            <div className="absolute inset-0 p-7 flex flex-col justify-end gap-5 md:gap-20">
                <div className="space-y-4 max-w-130">
                    <span className="w-9 h-9 rounded-xl bg-black/50 backdrop-blur-sm text-white text-sm font-semibold flex items-center justify-center">
                        {service.step}
                    </span>

                    <div>
                        <h3 className="text-2xl md:text-3xl font-medium mb-2">{service.title}</h3>
                        <p className="text-white/70 text-sm md:text-base font-medium mb-3 italic">
                            {service.subtitle}
                        </p>
                        <p className="text-white text-sm md:text-xl font-normal leading-relaxed tracking-[-2%]">
                            {service.description}
                        </p>
                    </div>
                </div>

                {service.image && (
                    <div className="flex-1 self-center">
                        <Image
                            src={service.image}
                            alt={service.title}
                            width={400}
                            height={400}
                            className="object-contain"
                        />
                    </div>
                )}
            </div>
        </div>
    ));

    return (
        <section id="services" ref={sectionRef} className="bg-white py-12 md:py-16">
            <div className="mx-auto pl-6 md:pl-20">
                <div className="mb-10 max-w-2xl pr-6 md:pr-0">
                    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">
                        Our Services
                    </span>
                    <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 leading-tight mb-4">
                        Everything your team needs, all in one place.
                    </h2>
                    <p className="text-sm md:text-base text-gray-500 leading-relaxed">
                        From sourcing elite hardware to keeping it running at peak performance,
                        we handle every layer of your team&apos;s toolkit.
                    </p>
                </div>

                <div ref={carouselRef} className="mt-10">
                    <EmblaCarousel
                        slides={slides}
                        options={{ loop: true, align: "start" }}
                        autoplay={true}
                        autoplayDelay={2500}
                        gap={16}
                        slideClassName="w-[85vw] md:w-[45%]"
                        onInit={(api) => { carouselApiRef.current = api; }}
                    />
                </div>
            </div>
        </section>
    );
}