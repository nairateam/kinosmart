import type { Metadata } from "next";

export const siteConfig = {
    name: "s",
    url: "https://kinosmartng.com",

    hero: {
        headline:
            "High-Performance Computing for Nigeria’s Fastest Growing Teams",
        subHeadline:
            "We procure, optimize, and manage the elite hardware that powers your vision. From top-tier MacBooks to high-end AI workstations, we help you scale without operational lag.",
    },

    metadata: {
        title: "Kinosmart | High-Performance Computing & Worktool Solutions",
        description:
            "KinoSmart provides high-performance computing solutions for Nigeria’s fastest-growing teams. We procure, optimize, and manage elite hardware including MacBooks, AI workstations, repair services, and software solutions to eliminate operational lag and scale productivity.",
        keywords: [
            "Kinosmart",
            "high-performance computing Nigeria",
            "MacBook procurement Nigeria",
            "AI workstation Nigeria",
            "business IT solutions",
            "device repair services",
            "software solutions Nigeria",
            "IT hardware procurement",
        ],
        openGraph: {
            title: "Kinosmart | High-Performance Computing Solutions",
            description:
                "Elite hardware procurement, repair, and software solutions for fast-growing teams in Nigeria.",
            type: "website",
            url: "https://kinosmartng.com",
            images: [
                {
                    url: "https://kinosmartng.com/og-image.jpeg",
                    width: 1200,
                    height: 630,
                    alt: "Kinosmart – High-Performance Computing Solutions",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: "Kinosmart | High-Performance Computing Solutions",
            description:
                "Elite hardware, repair, and software solutions powering Nigeria's fastest-growing teams.",
            images: ["https://kinosmartng.com/og-image.jpeg"],
        },
    } satisfies Metadata,
};