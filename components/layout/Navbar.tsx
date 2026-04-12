"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
  dropdown?: { label: string; href: string }[];
};

const navLinks: NavLink[] = [
  { label: "Our services", href: "#services" },
  { label: "Our Partners", href: "#partners" },
  { label: "Contact", href: "#contact" },
];

function scrollToSection(href: string) {
  const id = href.replace("#", "");
  const el = document.getElementById(id);
  if (!el) return;

  const lenis = (window as any).__lenis;
  if (lenis) {
    lenis.scrollTo(el, { offset: -80, duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrollDir, setScrollDir] = useState<"up" | "down">("up");

  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);
      setScrollDir(y > lastScrollY.current ? "down" : "up");
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useGSAP(() => {
    if (!headerRef.current) return;
    gsap.fromTo(
      headerRef.current,
      { y: -80, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.7, ease: "power3.out", delay: 0.1 }
    );
  }, []);

  useEffect(() => {
    const handle = (e: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handle);
    document.addEventListener("touchstart", handle);
    return () => {
      document.removeEventListener("mousedown", handle);
      document.removeEventListener("touchstart", handle);
    };
  }, []);

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handle);
    return () => window.removeEventListener("keydown", handle);
  }, []);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMobileOpen(false);
      setActiveDropdown(null);
      scrollToSection(href);
    }
  };

  const shouldHide = scrollDir === "down" && scrolled && !mobileOpen;
  const showBackdrop = activeDropdown !== null || mobileOpen;

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 py-4 px-4 lg:px-16"
      >
        <div ref={navRef}>
          <div
            onMouseLeave={() => setActiveDropdown(null)}
            className={cn(
              "mx-auto h-16 px-5 flex items-center justify-between transition-all duration-300",
              "rounded-2xl bg-white/95 backdrop-blur-lg border border-gray-200 shadow-lg",
              "md:rounded-none md:bg-transparent md:border-0 md:shadow-none md:backdrop-blur-none",
              scrolled && "md:rounded-2xl md:bg-white md:backdrop-blur-lg md:border md:border-gray-200 md:shadow-lg",
              shouldHide ? "-translate-y-[130%]" : "translate-y-0",
            )}
          >
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center gap-1 shrink-0 font-serif italic text-xl md:text-2xl text-[#023F42]"
              aria-label="Scroll to top"
            >
              <ShoppingCart />
              <span>Kinos<span className="text-[#FF9100]">mart.</span></span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <div key={link.label} className="relative">
                  {link.dropdown ? (
                    <>
                      <button
                        onMouseEnter={() => setActiveDropdown(link.label)}
                        onClick={() =>
                          setActiveDropdown((prev) =>
                            prev === link.label ? null : link.label
                          )
                        }
                        aria-expanded={activeDropdown === link.label}
                        className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium rounded-xl hover:bg-gray-50 transition-all"
                      >
                        {link.label}
                        <svg
                          width="14" height="14" viewBox="0 0 14 14" fill="none"
                          style={{
                            transform: activeDropdown === link.label ? "rotate(180deg)" : "rotate(0deg)",
                            transition: "transform 0.2s",
                          }}
                        >
                          <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>

                      {activeDropdown === link.label && (
                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl border border-gray-100 shadow-xl py-1 z-10">
                          {link.dropdown.map((item) => (
                            <a
                              key={item.label}
                              href={item.href}
                              onClick={(e) => handleNavClick(e, item.href)}
                              className="block px-4 py-2.5 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                            >
                              {item.label}
                            </a>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium rounded-xl hover:bg-gray-50 transition-all"
                    >
                      {link.label}
                    </a>
                  )}
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-2">
              <button
                onClick={(e) => handleNavClick(e as any, "#contact")}
                className="px-4 py-3 text-sm font-medium text-white bg-primary rounded-full hover:bg-gray-700 transition-colors"
              >
                Get a Quote
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              className="lg:hidden relative w-8 h-8 flex items-center justify-center text-gray-700"
              onClick={(e) => {
                e.stopPropagation();
                setMobileOpen((p) => !p);
              }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 7H19M5 12H19M5 17H19"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  style={{
                    opacity: mobileOpen ? 0 : 1,
                    transform: mobileOpen ? "scale(0.75)" : "scale(1)",
                    transformOrigin: "center",
                    transition: "opacity 0.3s, transform 0.3s",
                  }}
                />
                <path
                  d="M6 6L18 18M18 6L6 18"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                  style={{
                    opacity: mobileOpen ? 1 : 0,
                    transform: mobileOpen ? "scale(1)" : "scale(0.75)",
                    transformOrigin: "center",
                    transition: "opacity 0.3s, transform 0.3s",
                    position: "absolute",
                  }}
                />
              </svg>
            </button>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="lg:hidden mt-2 rounded-2xl bg-white border border-gray-200 shadow-xl overflow-hidden">
              <nav className="flex flex-col p-3" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="block px-4 py-3 text-sm text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors font-medium"
                    >
                      {link.label}
                    </a>
                    {link.dropdown && (
                      <div className="pl-4 border-l border-gray-100 ml-4 mb-1">
                        {link.dropdown.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className="block px-4 py-2.5 text-sm text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-colors"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="flex gap-2 px-4 pt-3 pb-1 border-t border-gray-100 mt-2">
                  <button
                    onClick={(e) => handleNavClick(e as any, "#contact")}
                    className="flex-1 py-2.5 text-sm font-medium text-white rounded-full bg-gray-900 hover:bg-gray-700 transition-colors"
                  >
                    Get a Quote
                  </button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 transition-opacity duration-200"
        style={{
          opacity: showBackdrop ? 1 : 0,
          pointerEvents: showBackdrop ? "auto" : "none",
          backgroundColor: "rgba(0,0,0,0.2)",
          backdropFilter: "blur(4px)",
        }}
        onClick={() => {
          setActiveDropdown(null);
          setMobileOpen(false);
        }}
        aria-hidden="true"
      />
    </>
  );
}