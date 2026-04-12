import type { Metadata } from "next";

export const siteConfig = {
    name: "KinoSmart",
    url: "https://kinosmartng.com",

    hero: {
        headline:
            "High-Performance Computing for Nigeria’s Fastest Growing Teams",
        subHeadline:
            "We procure, optimize, and manage the elite hardware that powers your vision. From top-tier MacBooks to high-end AI workstations, we help you scale without operational lag.",
    },

    metadata: {
        title: "KinoSmart | High-Performance Computing & Worktool Solutions",
        description:
            "KinoSmart provides high-performance computing solutions for Nigeria’s fastest-growing teams. We procure, optimize, and manage elite hardware including MacBooks, AI workstations, repair services, and software solutions to eliminate operational lag and scale productivity.",
        keywords: [
            "KinoSmart",
            "high-performance computing Nigeria",
            "MacBook procurement Nigeria",
            "AI workstation Nigeria",
            "business IT solutions",
            "device repair services",
            "software solutions Nigeria",
            "IT hardware procurement",
        ],
        openGraph: {
            title: "KinoSmart | High-Performance Computing Solutions",
            description:
                "Elite hardware procurement, repair, and software solutions for fast-growing teams in Nigeria.",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "KinoSmart | High-Performance Computing Solutions",
            description:
                "Elite hardware, repair, and software solutions powering Nigeria’s fastest-growing teams.",
        },
    } satisfies Metadata,
};