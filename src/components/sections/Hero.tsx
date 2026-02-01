"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const { t, language } = useLanguage();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Initial Reveal
            tl.from(bgRef.current, {
                scale: 1.2,
                duration: 2,
                ease: "power3.out",
            })
                .from(
                    ".hero-text",
                    {
                        y: 100,
                        opacity: 0,
                        duration: 1,
                        stagger: 0.2,
                        ease: "power3.out",
                    },
                    "-=1.5"
                )
                .from(
                    ".hero-btn",
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.5"
                );

            // Parallax Effect
            gsap.to(bgRef.current, {
                yPercent: 30,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black theme-transition"
        >
            {/* Background */}
            <div
                ref={bgRef}
                className="absolute inset-0 w-full h-full bg-gradient-to-b from-neutral-800 to-black opacity-50"
            >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-60" />
            </div>

            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Content */}
            <div
                ref={textRef}
                className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-8"
                lang={language}
            >
                <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mix-blend-difference">
                    {t("hero.title1")} <br />
                    <span className="text-neutral-400">{t("hero.title2")}</span>
                </h1>
                <p className={`hero-text text-lg md:text-xl text-neutral-300 max-w-2xl font-light tracking-wide ${language === "am" ? "leading-relaxed" : ""}`}>
                    {t("hero.subtitle")}
                </p>
                <div className="hero-btn flex flex-col sm:flex-row gap-4 mt-4">
                    <Button variant="primary" onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}>
                        {t("hero.cta1")}
                    </Button>
                    <Button variant="secondary" onClick={() => document.getElementById("story")?.scrollIntoView({ behavior: "smooth" })}>
                        {t("hero.cta2")}
                    </Button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                </svg>
            </div>
        </section>
    );
}
