import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const footerLinks = [
    { label: "Our Services", href: "#services" },
    { label: "Our Partners", href: "#partners" },
    { label: "Contact", href: "#contact" },
];

const SOCIALS = [
    { label: "Facebook", href: "https://facebook.com/kinosmartng" },
    { label: "Instagram", href: "https://instagram.com/kinosmartng" },
    { label: "LinkedIn", href: "https://linkedin.com/company/kinosmartng" },
    { label: "Twitter / X", href: "https://twitter.com/kinosmartng" },
];

export default function Footer() {
    return (
        <footer className="bg-[#FAFAFA] border-t border-gray-200 px-6 py-12">
            <div id="contact" className="mx-auto max-w-7xl">

                {/* Top row */}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-gray-200">

                    {/* Logo */}
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 shrink-0 font-serif italic text-xl md:text-2xl text-gray-900"
                        aria-label="Home"
                    >
                        <ShoppingCart className="w-5 h-5 text-gray-900" />
                        <span>Kinos<span className="text-[#FF9100]">mart.</span></span>
                    </Link>

                    {/* Nav */}
                    <nav className="flex items-center gap-6 flex-wrap">
                        {footerLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Socials */}
                    <div className="flex items-center gap-5 flex-wrap">
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

                {/* Bottom row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6">
                    <p className="text-xs text-gray-400">
                        © {new Date().getFullYear()} Kinosmart NG. All rights reserved.
                    </p>
                    <a href="https://wa.me/2348121538461?text=%E2%80%8E%20Hello%2C%20I%20love%20you%20implementation%20on%20kinosmart%20website." className="text-xs text-gray-400">
                        Developed by Oluwafemi. O
                    </a>
                </div>

            </div>
        </footer >
    );
}