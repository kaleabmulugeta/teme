"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const AboutStory = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const { t, language } = useLanguage();
  const { isDark } = useTheme();
  const hasAnimatedRef = useRef(false); // Track if animation has already played

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            hasAnimatedRef.current = true;
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    const elements =
      containerRef.current.querySelectorAll<HTMLElement>(".animate-on-scroll");

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Reset animation state when theme changes
  useEffect(() => {
    if (hasAnimatedRef.current && containerRef.current) {
      const elements =
        containerRef.current.querySelectorAll<HTMLElement>(
          ".animate-on-scroll",
        );
      elements.forEach((el) => {
        el.classList.remove("animate-in");
        // Force a reflow to restart animation
        void el.offsetWidth;
        el.classList.add("animate-in");
      });
    }
  }, [isDark]); // Re-trigger when theme changes

  return (
    <section
      ref={containerRef}
      className={`about-story py-24 ${isDark ? "bg-neutral-900 text-white" : "bg-neutral-100 text-black"}`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="about-container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="about-text space-y-8">
            {/* Title - Remove opacity-0 since we're using animate-in class */}
            <h2
              className={` text-3xl md:text-5xl font-light leading-tight mb-6 ${language === "am" ? "leading-snug" : ""} ${isDark ? "text-white" : "text-black"}`}
            >
              {t("about.title")}
            </h2>

            <div className="space-y-6">
              {/* First paragraph */}
              <p
                className={`story-lead  text-xl md:text-2xl max-w-2xl leading-relaxed ${isDark ? "text-neutral-300" : "text-neutral-700"}`}
              >
                {t("about.content1")}
              </p>

              {/* Second paragraph */}
              <p
                className={`story-body text-lg md:text-xl max-w-2xl leading-relaxed ${isDark ? "text-neutral-400" : "text-neutral-600"} ${language === "am" ? "leading-relaxed" : ""}`}
              >
                {t("about.content2")}
              </p>
            </div>
          </div>

          <div className="about-image animate-fade-in-up relative">
            <Image
              src="/photos/about.webp"
              alt="Our Upholstery Workshop"
              width={600}
              height={800}
              className="w-full h-[500px] md:h-[600px] object-cover rounded-2xl shadow-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutStory;
