"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "@/components/ui/Button";
import { useTheme } from "@/context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export function ServiceHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial Reveal - Same as homepage
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
          "-=1.5",
        )
        .from(
          ".hero-btn",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5",
        );

      // Parallax Effect - Same as homepage
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
      className={`relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-12 md:pt-14 ${isDark ? "bg-black" : "bg-white"}`}
    >
      {/* Background - Same structure as homepage */}
      <div
        ref={bgRef}
        className={`absolute inset-0 w-full h-full ${isDark ? "bg-gradient-to-b from-neutral-800 to-black" : "bg-gradient-to-b from-neutral-200 to-white"}`}
      >
        <div className="absolute inset-0 bg-[url('/photos/serviceHero.webp')] bg-cover bg-center opacity-60" />

        {/* Animated Gradient Overlays */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cognac/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-600/5 rounded-full blur-3xl"></div>
      </div>

      {/* Overlay for better text readability */}
      {isDark && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
      )}

      {/* Content */}
      <div
        ref={textRef}
        className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center gap-8"
      >
        {/* Main Title - Same as homepage hero */}
        <h1
          className={`hero-text text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter ${isDark ? "text-white drop-shadow-[0_6px_20px_rgba(0,0,0,0.85)]" : "text-black"}`}
        >
          <span> {t("service.tagline")}</span>
        </h1>

        {/* Description - Same as homepage hero subtitle */}
        <p
          className={`hero-text text-lg md:text-xl max-w-2xl font-light tracking-wide subpixel-antialiased ${isDark ? "text-neutral-200 drop-shadow-[0_4px_14px_rgba(0,0,0,0.7)]" : "text-neutral-900 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)]"}`}
        >
          {t("service.hero.subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="hero-btn flex flex-col sm:flex-row gap-4 mt-4">
          <Button
            variant="primary"
            onClick={() =>
              document
                .getElementById("services")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            {t("service.btn")}
          </Button>
        </div>
      </div>

      {/* Scroll Indicator - Same as homepage */}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce ${isDark ? "text-white/50" : "text-black/50"}`}
      >
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

export default ServiceHero;
