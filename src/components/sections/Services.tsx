"use client";

import Section from "@/components/ui/Section";
import { ArrowUpRight, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Services() {
    const { t, language } = useLanguage();
    const { isDark } = useTheme();

    const services = [
        {
            id: "01",
            titleKey: "services.automotive.title",
            descKey: "services.automotive.desc",
            image: "/photos/auto.webp",
            primary: true,
        },
        {
            id: "02",
            titleKey: "services.architectural.title",
            descKey: "services.architectural.desc",
            image: "/photos/cinema.webp",
            primary: true,
        },
        {
            id: "03",
            titleKey: "services.aviation.title",
            descKey: "services.aviation.desc",
            image: "/photos/jet.webp",
            primary: false,
            comingSoon: true,
        },
        {
            id: "04",
            titleKey: "services.marine.title",
            descKey: "services.marine.desc",
            image: "/photos/boat.webp",
            primary: false,
            comingSoon: true,
        },
    ];

    return (
        <Section id="services" className={isDark ? "bg-black text-white" : "bg-white text-black"}>
            <div className="max-w-7xl mx-auto" lang={language}>
                <div className={`flex flex-col md:flex-row justify-between items-end mb-16 border-b pb-8 ${isDark ? "border-white/10" : "border-black/10"}`}>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                        {t("services.title1")} <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>{t("services.title2")}</span>
                    </h2>
                    <p className={`max-w-md mt-4 md:mt-0 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                        {t("services.subtitle")}
                    </p>
                </div>

                {/* Primary Services - Large Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {services.filter(s => s.primary).map((service) => (
                        <div
                            key={service.id}
                            className={`group relative h-[400px] overflow-hidden rounded-2xl border transition-all ${isDark ? "bg-neutral-900 border-white/5 hover:border-white/20" : "bg-neutral-100 border-black/5 hover:border-black/20"}`}
                        >
                            {/* Background Image */}
                            <div
                                className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 ${isDark ? "opacity-40 group-hover:opacity-60" : "opacity-100"}`}
                                style={{ backgroundImage: `url(${service.image})` }}
                            />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10 text-white">
                                <div className="flex justify-between items-start">
                                    <span className="text-sm font-mono border px-2 py-1 rounded-full text-white/80 border-white/40">
                                        {service.id}
                                    </span>
                                    <ArrowUpRight className="w-6 h-6 opacity-0 -translate-y-2 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 text-white" />
                                </div>

                                <div>
                                    <h3 className="text-3xl font-bold mb-2 drop-shadow-[0_8px_24px_rgba(0,0,0,0.9)]">{t(service.titleKey)}</h3>
                                    <p className="text-sm max-w-[80%] opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 text-white/80">
                                        {t(service.descKey)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Secondary Services - Smaller Cards with Coming Soon Badge */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {services.filter(s => !s.primary).map((service) => (
                        <div
                            key={service.id}
                            className={`group relative h-[250px] overflow-hidden rounded-2xl border transition-all ${isDark ? "bg-neutral-900/50 border-white/5 hover:border-white/10" : "bg-neutral-100 border-black/5 hover:border-black/10"}`}
                        >
                            {/* Background Image - Lower opacity for de-emphasis */}
                            <div
                                className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 ${isDark ? "opacity-20 group-hover:opacity-30" : "opacity-100"}`}
                                style={{ backgroundImage: `url(${service.image})` }}
                            />

                            {/* Overlay for muted look */}
                            {isDark && <div className="absolute inset-0 bg-black/30" />}

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10 text-white">
                                <div className="flex justify-between items-start">
                                    <span className="text-xs font-mono border px-2 py-1 rounded-full text-white/70 border-white/30">
                                        {service.id}
                                    </span>
                                    {service.comingSoon && (
                                        <span className="flex items-center gap-1.5 text-xs font-medium text-amber-400/80 bg-amber-400/10 border border-amber-400/20 px-3 py-1 rounded-full">
                                            <Clock className="w-3 h-3" />
                                            {t("services.comingSoon")}
                                        </span>
                                    )}
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.9)]">{t(service.titleKey)}</h3>
                                    <p className="text-sm max-w-[90%] text-white/70">
                                        {t(service.descKey)}
                                    </p>
                                    <p className="text-xs mt-3 italic text-white/50">
                                        {t("services.availableOnRequest")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
