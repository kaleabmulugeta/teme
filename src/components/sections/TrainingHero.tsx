"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export default function TrainingHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const { t, language } = useLanguage();
    const { isDark } = useTheme();

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
                    ".training-hero-text",
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
                    ".training-hero-btn",
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

    const handleEnrollClick = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            window.location.href = "/#contact";
        }
    };

    return (
        <section
            ref={containerRef}
            className={`relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-12 md:pt-14 ${isDark ? "bg-black" : "bg-white"}`}
        >
            {/* Background */}
            <div
                ref={bgRef}
                className={`absolute inset-0 w-full h-full ${isDark ? "bg-gradient-to-b from-neutral-800 to-black" : "bg-gradient-to-b from-neutral-200 to-white"}`}
            >
                <div className="absolute inset-0 bg-[url('/photos/hero.webp')] bg-cover bg-center opacity-60" />
            </div>

            {/* Overlay for better text readability */}
            {isDark && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
            )}

            {/* Content */}
            <div
                ref={textRef}
                className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-8"
                lang={language}
            >
                <h1 className={`training-hero-text text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter ${isDark ? "text-white drop-shadow-[0_6px_20px_rgba(0,0,0,0.85)]" : "text-black"}`}>
                    {t("training.hero.title1")} <br />
                    <span className={isDark ? "text-white" : "text-neutral-600"}>{t("training.hero.title2")}</span>
                </h1>
                <p className={`training-hero-text text-lg md:text-xl max-w-2xl font-light tracking-wide subpixel-antialiased ${isDark ? "text-neutral-200 drop-shadow-[0_4px_14px_rgba(0,0,0,0.7)]" : "text-neutral-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"} ${language === "am" ? "leading-relaxed" : ""}`}>
                    {t("training.hero.subtitle")}
                </p>
                <div className="training-hero-btn flex flex-col sm:flex-row gap-4 mt-4">
                    <Button variant="primary" onClick={handleEnrollClick}>
                        {t("training.hero.cta")}
                    </Button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce ${isDark ? "text-white/50" : "text-black/50"}`}>
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
