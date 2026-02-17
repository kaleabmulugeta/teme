"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const CeoSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();
  const { isDark } = useTheme();

  useEffect(() => {
    if (!sectionRef.current) return;

    const element = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const wrapper = element.querySelector(".ceo-wrapper");
            if (wrapper) wrapper.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" },
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`ceo-section py-16 md:py-24 ${isDark ? "bg-neutral-900" : "bg-neutral-100"} overflow-hidden`}
    >
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="ceo-wrapper grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="ceo-image relative order-2 lg:order-1">
            <div className="relative w-full max-w-[500px] mx-auto lg:mx-0">
              <Image
                src="/photos/ceo.jpg"
                alt="Temesgen Abebe - CEO"
                width={500}
                height={600}
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* CEO Text */}
          <div className="ceo-text order-1 lg:order-2 space-y-8">
            {/* Label */}
            <span
              className={`ceo-label inline-block text-sm font-bold uppercase tracking-[0.2em] ${isDark ? "text-neutral-500" : "text-neutral-500"}`}
              style={{ letterSpacing: "0.2em" }}
            >
              {t("ceo.title")}
            </span>

            {/* Name */}
            <h2
              className={`text-3xl md:text-5xl font-light leading-tight ${language === "am" ? "leading-snug" : ""}`}
              style={{ color: isDark ? "#ffffff" : "#000000" }}
            >
              {t("ceo.name")}
            </h2>

            {/* Quote - FIXED spacing and visibility */}
            <div className="relative">
              <div
                className={`absolute left-0 top-0 bottom-0 w-0.5 ${isDark ? "bg-cognac" : "bg-amber-600"}`}
                style={{ marginLeft: "0.5rem" }}
              ></div>
              <blockquote
                className={`text-lg md:text-xl leading-relaxed pl-10 ${language === "am" ? "text-base md:text-lg" : ""}`}
                style={{
                  color: isDark ? "#d4d4d4" : "#525252",
                  fontStyle: "normal",
                }}
              >
                {t("ceo.message")}
              </blockquote>
            </div>

            {/* Info */}
            <p
              className={`ceo-note text-lg md:text-xl leading-relaxed max-w-xl ${language === "am" ? "text-base md:text-lg" : ""}`}
              style={{ color: isDark ? "#a3a3a3" : "#737373" }}
            >
              {t("ceo.info")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CeoSection;
