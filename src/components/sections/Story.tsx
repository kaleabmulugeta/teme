"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Section from "@/components/ui/Section";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
    const textRef = useRef<HTMLDivElement>(null);
    const { t, language } = useLanguage();
    const { isDark } = useTheme();
    const trustedCompanies = t("story.trust.companies").split(", ");
    const trustedPeople = t("story.trust.people").split(", ");
    const peoplePhotos: Record<string, string> = {
        "Pastor Chere": "/photos/ps_chere.webp",
        "ፓስተር ቸሬ": "/photos/ps_chere.webp",
        "Tsedeniya GebreMarkos": "/photos/tsedeniya.webp",
        "ጸደኒያ ገ/ማርቆስ": "/photos/tsedeniya.webp",
        "Abela": "/photos/abela.webp",
        "አቤላ": "/photos/abela.webp",
        "Miko Tour": "/photos/tour.webp",
        "ማይኮ ቱር": "/photos/tour.webp",
    };
    const companyLogos: Record<string, string> = {
        "CBE": "/photos/cbe.webp",
        "Addis Ababa Science Museum": "/photos/science_museum.svg",
        "Moenco": "/photos/mc.webp",
        "ET Airforce": "/photos/af.webp",
    };

    const companyLoop = [...trustedCompanies, ...trustedCompanies, ...trustedCompanies].map((company, index) => ({
        name: company,
        logo: companyLogos[company] ?? "/photos/clean.webp",
        id: `${company}-${index}`,
    }));

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
        <Section id="story" className={isDark ? "bg-neutral-900 text-white" : "bg-white text-black"}>
            <div ref={textRef} className="w-full max-w-7xl mx-auto text-center space-y-6 px-4 overflow-hidden" lang={language}>
                <h2 className="story-line text-sm font-bold tracking-[0.2em] uppercase text-neutral-500">
                    {t("story.label")}
                </h2>

                <div className="space-y-4">
                    <p className={`story-line text-3xl md:text-5xl font-light leading-tight ${language === "am" ? "leading-snug" : ""}`}>
                        {t("story.headline1")} <br />
                        <span className={isDark ? "text-neutral-400" : "text-neutral-600"}>{t("story.headline2")}</span>
                    </p>

                    <p className={`story-line text-sm md:text-base max-w-3xl mx-auto leading-relaxed ${isDark ? "text-neutral-400" : "text-neutral-600"} ${language === "am" ? "text-xs md:text-sm" : ""}`}>
                        {t("story.description")}
                    </p>
                </div>

                <div className="story-line space-y-12 text-left">
                    <div className="text-center">
                        <h3 className={`text-2xl md:text-3xl font-light tracking-tight mb-2 ${isDark ? "text-white" : "text-black"}`}>
                            {t("story.impact.title")}
                        </h3>
                        <p className={`text-sm md:text-base leading-relaxed ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                            {t("story.impact.description")}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2 text-center">
                            <h3 className={`text-2xl md:text-3xl font-light tracking-tight ${isDark ? "text-white" : "text-black"}`}>
                                {t("story.trust.title")}
                            </h3>
                            <p className={`text-sm md:text-base leading-relaxed ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                                {t("story.trust.subtitle")}
                            </p>
                        </div>

                        <div>
                            <div className="trusted-by-slider overflow-hidden rounded-xl">
                                <div className="trusted-by-track">
                                    {companyLoop.map((companyItem) => (
                                        <div
                                            key={companyItem.id}
                                            className={`shrink-0 h-16 md:h-20 min-w-[140px] md:min-w-[180px] px-3 md:px-4 rounded-xl border flex items-center justify-center ${isDark ? "border-white/10 bg-neutral-800" : "border-black/10 bg-neutral-100"}`}
                                        >
                                            <div className="relative w-full h-full max-w-[120px] md:max-w-[150px]">
                                                <Image
                                                    src={companyItem.logo}
                                                    alt={`${companyItem.name} ${t("story.trust.addLogo")}`}
                                                    fill
                                                    sizes="(max-width: 768px) 120px, 150px"
                                                    className="object-contain"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {trustedPeople.map((person) => (
                                    <div key={person} className="flex flex-col">
                                        <div className={`relative aspect-[4/5] rounded-xl overflow-hidden border ${isDark ? "border-white/10 bg-neutral-800" : "border-black/10 bg-neutral-100"}`}>
                                            <Image
                                                src={peoplePhotos[person] ?? "/photos/clean.webp"}
                                                alt={person}
                                                fill
                                                sizes="(max-width: 768px) 50vw, 25vw"
                                                className="object-cover"
                                            />
                                        </div>
                                        <p className={`text-sm font-medium text-center mt-2 leading-tight ${isDark ? "text-neutral-200" : "text-neutral-700"}`}>{person}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`story-line grid grid-cols-3 gap-4 md:gap-8 pt-6 border-t ${isDark ? "border-white/10" : "border-black/10"}`}>
                    {stats.map((stat) => (
                        <div key={stat.key} className="text-center">
                            <div className={`text-2xl md:text-4xl font-bold mb-1 ${isDark ? "text-white" : "text-black"}`}>{t(stat.valueKey)}</div>
                            <div className="text-[10px] md:text-sm uppercase tracking-wider text-neutral-500">{t(stat.labelKey)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
