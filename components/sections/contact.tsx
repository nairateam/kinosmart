"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type FormState = "idle" | "loading" | "success" | "error";

const SOCIALS = [
    { label: "Facebook", href: "https://facebook.com/kinosmartng" },
    { label: "Instagram", href: "https://instagram.com/kinosmartng" },
    { label: "LinkedIn", href: "https://linkedin.com/company/kinosmartng" },
    { label: "Twitter / X", href: "https://twitter.com/kinosmartng" },
];

const CONTACT_ITEMS = [
    { label: "Email", value: "info@kinosmartng.com", href: "mailto:info@kinosmartng.com" },
    { label: "Phone", value: "+234 808 393 8612\n+234 816 995 6949", href: ["tel:+2348083938612", "tel:+2348169956949"] },
    {
        label: "Location",
        value: "1st Floor, Suite 12, Toscanini plaza, 26 Oriyomi Street off Olowu Street Ikeja Lagos Nigeria (opp Computer village Underbridge)",
        href: "https://maps.app.goo.gl/CV42jGFUqKuMjS1h8",
    },
];

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<HTMLDivElement>(null);

    const [formState, setFormState] = useState<FormState>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const [fields, setFields] = useState({
        name: "",
        email: "",
        company: "",
        message: "",
    });

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                once: true,
            },
        });

        tl.fromTo(
            headingRef.current,
            { opacity: 0, y: 32 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
        )
            .fromTo(
                formRef.current,
                { opacity: 0, y: 24 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
                "-=0.4"
            )
            .fromTo(
                mapRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
                "-=0.3"
            );
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fields),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Something went wrong.");
            }

            setFormState("success");
            setFields({ name: "", email: "", company: "", message: "" });
        } catch (err: any) {
            setFormState("error");
            setErrorMsg(err.message);
        }
    };

    return (
        <section
            ref={sectionRef}
            id="contact"
            className="bg-[#FAFAFA] py-24 px-6"
        >
            <div className="mx-auto max-w-7xl space-y-12">

                {/* Top two-column grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

                    {/* Left — CTA copy + contact details */}
                    <div ref={headingRef}>
                        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6">
                            Get in touch
                        </span>
                        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 leading-tight mb-6">
                            Ready to equip your team?
                        </h2>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed mb-10">
                            Tell us about your team&apos;s hardware needs and we&apos;ll get back to you
                            within 24 hours with a tailored quote.
                        </p>

                        {/* Contact details */}
                        <div className="space-y-4 mb-8">
                            {CONTACT_ITEMS.map((item) => (
                                <div key={item.label} className="flex gap-3">
                                    <span className="text-xs font-semibold uppercase tracking-widest text-gray-400 w-20 pt-0.5 shrink-0">
                                        {item.label}
                                    </span>
                                    <div className="flex flex-col gap-0.5">
                                        {Array.isArray(item.href) ? (
                                            // Multiple links (phone numbers)
                                            item.value.split("\n").map((line, i) => (
                                                <a
                                                    key={i}
                                                    href={(item.href as string[])[i]}
                                                    className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                                                >
                                                    {line}
                                                </a>
                                            ))
                                        ) : (
                                            <a
                                                href={item.href}
                                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                                className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                                            >
                                                {item.value}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social links */}
                        <div className="flex flex-wrap gap-x-5 gap-y-2">
                            {SOCIALS.map(({ label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs font-semibold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors"
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right — Form */}
                    <div ref={formRef}>
                        {formState === "success" ? (
                            <div className="rounded-2xl bg-white border border-gray-200 p-10 flex flex-col items-center justify-center text-center gap-4 min-h-[400px] shadow-sm">
                                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                        <path
                                            d="M5 13l4 4L19 7"
                                            stroke="#16a34a"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-gray-900 font-semibold text-lg">Message sent!</h3>
                                <p className="text-gray-500 text-sm">
                                    We&apos;ll be in touch within 24 hours.
                                </p>
                                <button
                                    onClick={() => setFormState("idle")}
                                    className="mt-4 text-xs text-gray-400 underline underline-offset-4 hover:text-gray-600 transition-colors"
                                >
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="rounded-2xl bg-white border border-gray-200 p-8 space-y-5 shadow-sm"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            Name <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={fields.name}
                                            onChange={handleChange}
                                            placeholder="John Doe"
                                            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                            Email <span className="text-red-400">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            value={fields.email}
                                            onChange={handleChange}
                                            placeholder="john@company.com"
                                            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Company
                                    </label>
                                    <input
                                        type="text"
                                        name="company"
                                        value={fields.company}
                                        onChange={handleChange}
                                        placeholder="Acme Inc. (optional)"
                                        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors"
                                    />
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                        Message <span className="text-red-400">*</span>
                                    </label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={5}
                                        value={fields.message}
                                        onChange={handleChange}
                                        placeholder="Tell us about your team size, hardware needs, timeline..."
                                        className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 transition-colors resize-none"
                                    />
                                </div>

                                {formState === "error" && (
                                    <p className="text-sm text-red-500">{errorMsg}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={formState === "loading"}
                                    className="w-full py-3.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {formState === "loading" ? "Sending…" : "Send Message"}
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                {/* Full-width map */}
                <div ref={mapRef} className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                    <div className="relative w-full h-[300px] sm:h-[380px] md:h-[440px]">
                        <iframe
                            title="Kinosmart NG location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.0!2d3.3479!3d6.6018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9228f5d5f0b5%3A0x5e7b2f2a1a2b3c4d!2sToscanini%20Plaza%2C%20Oriyomi%20Street%2C%20Ikeja%2C%20Lagos!5e0!3m2!1sen!2sng!4v1712800000000!5m2!1sen!2sng"
                            className="absolute inset-0 w-full h-full"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                    <a
                        href="https://maps.app.goo.gl/CV42jGFUqKuMjS1h8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-5 py-4 bg-white border-t border-gray-200 hover:bg-gray-50 transition-colors group"
                    >
                        <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-semibold uppercase tracking-widest text-gray-900">
                                Kinosmart NG
                            </span>
                            <span className="text-xs text-gray-400">
                                Toscanini Plaza, Oriyomi St, Ikeja, Lagos
                            </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-900 transition-colors">
                            <span className="text-xs font-semibold uppercase tracking-widest hidden sm:inline">
                                Open in Google Maps
                            </span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                <path
                                    d="M7 17L17 7M17 7H7M17 7V17"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>
                    </a>
                </div>

            </div >
        </section >
    );
}