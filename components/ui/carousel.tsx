"use client";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaOptionsType } from "embla-carousel";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type EmblaCarouselProps = {
    slides: React.ReactNode[];
    options?: EmblaOptionsType;
    showArrows?: boolean;
    showDots?: boolean;
    autoplay?: boolean;
    autoplayDelay?: number;
    className?: string;
    slideClassName?: string;
    gap?: number; // gap in px between slides
};

export default function EmblaCarousel({
    slides,
    options,
    showArrows = false,
    showDots = false,
    autoplay = false,
    autoplayDelay = 3000,
    className = "",
    slideClassName = "",
    gap = 16,
}: EmblaCarouselProps) {
    const autoplayPlugin = useRef(
        Autoplay({ delay: autoplayDelay, stopOnInteraction: true })
    );

    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: false,
            align: "start",
            ...options,
        },
        autoplay ? [autoplayPlugin.current] : []
    );

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(true);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect();
        emblaApi.on("select", onSelect);
        emblaApi.on("reInit", onSelect);
        return () => {
            emblaApi.off("select", onSelect);
            emblaApi.off("reInit", onSelect);
        };
    }, [emblaApi, onSelect]);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
    const scrollTo = useCallback(
        (index: number) => emblaApi?.scrollTo(index),
        [emblaApi]
    );

    const isVertical = options?.axis === "y";

    return (
        <div className={`relative w-full ${className}`}>
            {/* Viewport — overflow hidden clips the slides */}
            <div className="overflow-hidden" ref={emblaRef}>
                <div
                    // Use negative margin to cancel out the slide padding on the container edge
                    style={{
                        display: "flex",
                        flexDirection: isVertical ? "column" : "row",
                        marginLeft: isVertical ? 0 : -gap / 2,
                        marginRight: isVertical ? 0 : -gap / 2,
                        marginTop: isVertical ? -gap / 2 : 0,
                        marginBottom: isVertical ? -gap / 2 : 0,
                    }}
                >
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            // Each slide owns half the gap on each side so loop clones
                            // get the same spacing — this is the Embla-recommended approach
                            style={{
                                flex: "0 0 auto",
                                paddingLeft: isVertical ? 0 : gap / 2,
                                paddingRight: isVertical ? 0 : gap / 2,
                                paddingTop: isVertical ? gap / 2 : 0,
                                paddingBottom: isVertical ? gap / 2 : 0,
                            }}
                            className={slideClassName}
                        >
                            {slide}
                        </div>
                    ))}
                </div>
            </div>

            {/* Arrows */}
            {showArrows && (
                <>
                    <button
                        onClick={scrollPrev}
                        disabled={!canScrollPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10
                            w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md
                            text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed
                            transition-all duration-200"
                        aria-label="Previous slide"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={scrollNext}
                        disabled={!canScrollNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10
                            w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-md
                            text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed
                            transition-all duration-200"
                        aria-label="Next slide"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </>
            )}

            {/* Dots */}
            {showDots && slides.length > 1 && (
                <div className="flex justify-center gap-2 mt-5">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === selectedIndex
                                ? "w-6 bg-gray-800"
                                : "w-2 bg-gray-300 hover:bg-gray-400"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}