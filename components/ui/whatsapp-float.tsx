"use client";

import { useState, useEffect } from "react";

interface WhatsAppButtonProps {
    phoneNumber: string;        
    message?: string;          
    position?: "bottom-right" | "bottom-left";
    showTooltip?: boolean;
    tooltipText?: string;
    showAfterScroll?: number;  
}

export default function WhatsAppButton({
    phoneNumber,
    message = "Hello! I'd like to know more.",
    position = "bottom-right",
    showTooltip = true,
    tooltipText = "Chat with us",
    showAfterScroll = 0,
}: WhatsAppButtonProps) {
    const [visible, setVisible] = useState(showAfterScroll === 0);
    const [tooltipOpen, setTooltipOpen] = useState(false);
    const [pulse, setPulse] = useState(true);

    // Show button after scroll threshold
    useEffect(() => {
        if (showAfterScroll === 0) return;
        const onScroll = () => setVisible(window.scrollY >= showAfterScroll);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [showAfterScroll]);

    // Stop pulse ring after 3s
    useEffect(() => {
        const t = setTimeout(() => setPulse(false), 3000);
        return () => clearTimeout(t);
    }, []);

    const href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    const positionClasses =
        position === "bottom-right"
            ? "bottom-6 right-6"
            : "bottom-6 left-6";

    const tooltipClasses =
        position === "bottom-right"
            ? "right-full mr-3"
            : "left-full ml-3";

    return (
        <div
            className={`fixed ${positionClasses} z-50 flex items-center transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
                }`}
        >
            {/* Tooltip */}
            {showTooltip && (
                <div
                    className={`absolute ${tooltipClasses} bottom-1/2 translate-y-1/2 transition-all duration-200 ${tooltipOpen
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95 pointer-events-none"
                        }`}
                >
                    <div className="relative bg-white text-gray-800 text-sm font-medium px-3 py-2 rounded-xl shadow-lg whitespace-nowrap border border-gray-100">
                        {tooltipText}
                        {/* Arrow */}
                        <span
                            className={`absolute top-1/2 -translate-y-1/2 border-[6px] border-transparent ${position === "bottom-right"
                                    ? "-right-3 border-l-white"
                                    : "-left-3 border-r-white"
                                }`}
                        />
                    </div>
                </div>
            )}

            {/* Button */}
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                onMouseEnter={() => setTooltipOpen(true)}
                onMouseLeave={() => setTooltipOpen(false)}
                onFocus={() => setTooltipOpen(true)}
                onBlur={() => setTooltipOpen(false)}
                className="relative flex items-center justify-center w-14 h-14 rounded-full shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-green-400 focus-visible:ring-offset-2 group"
                style={{ backgroundColor: "#25D366" }}
            >
                {/* Pulse ring */}
                {pulse && (
                    <span
                        className="absolute inset-0 rounded-full animate-ping"
                        style={{ backgroundColor: "#25D366", opacity: 0.5 }}
                    />
                )}

                {/* Hover glow ring */}
                <span
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-110"
                    style={{ boxShadow: "0 0 0 4px rgba(37,211,102,0.35)" }}
                />

                {/* WhatsApp SVG icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-7 h-7 fill-white drop-shadow-sm transition-transform duration-200 group-hover:scale-110"
                    aria-hidden="true"
                >
                    <path d="M16.003 2C8.28 2 2 8.28 2 16.003c0 2.478.65 4.86 1.885 6.95L2 30l7.246-1.852A13.94 13.94 0 0 0 16.003 30C23.72 30 30 23.72 30 16.003 30 8.28 23.72 2 16.003 2zm0 25.454a11.41 11.41 0 0 1-5.817-1.594l-.417-.248-4.302 1.1 1.12-4.19-.272-.43a11.41 11.41 0 0 1-1.767-6.09c0-6.31 5.137-11.446 11.455-11.446 6.316 0 11.452 5.136 11.452 11.447 0 6.312-5.136 11.45-11.452 11.45zm6.28-8.58c-.344-.172-2.036-1.005-2.352-1.119-.316-.115-.546-.172-.775.172-.23.343-.888 1.12-1.089 1.35-.2.228-.4.257-.745.086-.344-.172-1.452-.535-2.766-1.707-1.022-.91-1.712-2.035-1.912-2.378-.2-.343-.021-.529.15-.7.154-.153.344-.4.516-.6.172-.2.229-.343.344-.572.115-.23.057-.43-.029-.601-.086-.172-.775-1.868-1.062-2.558-.28-.672-.563-.58-.775-.591l-.66-.012c-.23 0-.6.086-.914.43-.315.343-1.204 1.176-1.204 2.867s1.233 3.328 1.404 3.557c.172.229 2.428 3.707 5.882 5.198.823.355 1.464.567 1.965.726.825.263 1.576.226 2.17.137.662-.1 2.036-.833 2.323-1.637.287-.804.287-1.493.2-1.637-.086-.144-.315-.23-.66-.4z" />
                </svg>
            </a>
        </div>
    );
}