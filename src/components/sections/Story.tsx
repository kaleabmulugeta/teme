"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/ui/Section";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
    const textRef = useRef<HTMLDivElement>(null);
    const { t, language } = useLanguage();
    const { isDark } = useTheme();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const lines = textRef.current?.querySelectorAll(".story-line");

            if (lines) {
                gsap.from(lines, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: textRef.current,
                        start: "top 80%",
                        end: "bottom 20%",
                        toggleActions: "play none none reverse",
                    },
                });
            }
        }, textRef);

        return () => ctx.revert();
    }, []);

    const stats = [
        { key: "story.stat1", valueKey: "story.stat1.value", labelKey: "story.stat1.label" },
        { key: "story.stat2", valueKey: "story.stat2.value", labelKey: "story.stat2.label" },
        { key: "story.stat3", valueKey: "story.stat3.value", labelKey: "story.stat3.label" },
    ];

    return (
        <Section id="story" className={`min-h-[80vh] flex items-center ${isDark ? "bg-neutral-900 text-white" : "bg-neutral-100 text-black"}`}>
            <div ref={textRef} className="max-w-4xl mx-auto text-center space-y-12" lang={language}>
                <h2 className={`story-line text-sm font-bold tracking-[0.2em] uppercase ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>
                    {t("story.label")}
                </h2>

                <div className="space-y-6">
                    <p className={`story-line text-3xl md:text-5xl font-light leading-tight ${language === "am" ? "leading-snug" : ""}`}>
                        {t("story.headline1")} <br />
                        <span className={isDark ? "text-neutral-400" : "text-neutral-600"}>{t("story.headline2")}</span>
                    </p>

                    <p className={`story-line text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${isDark ? "text-neutral-400" : "text-neutral-600"} ${language === "am" ? "text-base md:text-lg" : ""}`}>
                        {t("story.description")}
                    </p>
                </div>

                <div className={`story-line grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t ${isDark ? "border-white/10" : "border-black/10"}`}>
                    {stats.map((stat) => (
                        <div key={stat.key} className="text-center">
                            <div className={`text-4xl font-bold mb-2 ${isDark ? "text-white" : "text-black"}`}>{t(stat.valueKey)}</div>
                            <div className={`text-sm uppercase tracking-wider ${isDark ? "text-neutral-500" : "text-neutral-600"}`}>{t(stat.labelKey)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
