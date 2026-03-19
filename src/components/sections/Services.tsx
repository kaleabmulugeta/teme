"use client";

import Section from "@/components/ui/Section";
import { ArrowUpRight, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Services() {
    const { t, language } = useLanguage();
    const { isDark } = useTheme();

    const autoSubservices = [
        {
            id: "01",
            titleKey: "services.auto.seats.title",
            descKey: "services.auto.seats.desc",
            image: "/photos/seats.webp",
            interestValue: "seats",
        },
        {
            id: "02",
            titleKey: "services.auto.dashboard.title",
            descKey: "services.auto.dashboard.desc",
            image: "/photos/dash.webp",
            interestValue: "dashboard",
        },
        {
            id: "03",
            titleKey: "services.auto.roofline.title",
            descKey: "services.auto.roofline.desc",
            image: "/photos/headliner.webp",
            interestValue: "roofline",
        },
        {
            id: "04",
            titleKey: "services.auto.doors.title",
            descKey: "services.auto.doors.desc",
            image: "/photos/doorpanel.webp",
            interestValue: "doors",
        },
        {
            id: "05",
            titleKey: "services.auto.steering.title",
            descKey: "services.auto.steering.desc",
            image: "/photos/steering.webp",
            interestValue: "steering",
        },
        {
            id: "06",
            titleKey: "services.auto.full.title",
            descKey: "services.auto.full.desc",
            image: "/photos/full.webp",
            interestValue: "fullInterior",
        },
    ];

    const otherServices = [
        {
            id: "01",
            titleKey: "services.architectural.title",
            descKey: "services.architectural.desc",
            image: "/photos/cinema.webp",
            available: true,
            interestValue: "architectural",
        },
        {
            id: "02",
            titleKey: "services.aviation.title",
            descKey: "services.aviation.desc",
            image: "/photos/jet.webp",
            comingSoon: true,
        },
        {
            id: "03",
            titleKey: "services.marine.title",
            descKey: "services.marine.desc",
            image: "/photos/boat.webp",
            comingSoon: true,
        },
    ];

    return (
        <Section id="services" className={isDark ? "bg-black text-white" : "bg-white text-black"}>
            <div className="max-w-7xl mx-auto" lang={language}>
                <div className={`flex flex-col md:flex-row justify-between items-center md:items-end mb-16 border-b pb-8 ${isDark ? "border-white/10" : "border-black/10"}`}>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-center md:text-left">
                        {t("services.title1")} <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>{t("services.title2")}</span>
                    </h2>
                    <p className={`max-w-md mt-4 md:mt-0 text-center md:text-right ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                        {t("services.subtitle")}
                    </p>
                </div>

                {/* Automotive Star Section */}
                <div className="mb-12">
                    {/* Automotive Header */}
                    <div className="mb-6">
                        <h3 className={`text-2xl md:text-3xl font-bold tracking-tight mb-2 ${isDark ? "text-white" : "text-black"}`}>
                            {t("services.automotive.title")}
                        </h3>
                        <p className={`text-sm md:text-base leading-relaxed max-w-2xl ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                            {t("services.automotive.desc")}
                        </p>
                    </div>

                    {/* Automotive Sub-services Grid */}
                    <div className="space-y-4">
                        <h4 className={`text-xs uppercase tracking-[0.15em] ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>
                            {t("services.automotive.subservices")}
                        </h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                            {autoSubservices.map((service) => (
                                <div
                                    key={service.id}
                                    onClick={() => {
                                        window.dispatchEvent(new CustomEvent("select-interest", { detail: service.interestValue }));
                                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                    }}
                                    className={`group relative aspect-[4/5] overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer ${isDark ? "bg-neutral-900 border-white/5 hover:border-white/20" : "bg-neutral-100 border-black/5 hover:border-black/20"}`}
                                >
                                    {/* Background Image */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${service.image})` }}
                                    />

                                    {/* Content */}
                                    <div className="absolute inset-0 p-4 flex flex-col justify-between z-10">
                                        <div className="flex justify-between items-start">
                                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full text-white/70 border border-white/30 bg-black/30">
                                                {service.id}
                                            </span>
                                            <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 text-white" />
                                        </div>

                                        <div>
                                            <h5 className="text-base md:text-lg font-bold text-white mb-1 drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                                                {t(service.titleKey)}
                                            </h5>
                                            <p className="text-xs text-white/80 leading-snug opacity-100 translate-y-0 transition-all duration-300 md:opacity-0 md:translate-y-2 md:group-hover:opacity-100 md:group-hover:translate-y-0 line-clamp-3">
                                                {t(service.descKey)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Other Services Section */}
                <div className="space-y-4">
                    <h4 className={`text-xs uppercase tracking-[0.15em] ${isDark ? "text-neutral-500" : "text-neutral-500"}`}>
                        {t("services.other.title")}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {otherServices.map((service) => (
                            <div
                                key={service.id}
                                onClick={() => {
                                    if (service.comingSoon || !service.interestValue) return;
                                    window.dispatchEvent(new CustomEvent("select-interest", { detail: service.interestValue }));
                                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                }}
                                className={`group relative h-[200px] md:h-[220px] overflow-hidden rounded-xl border transition-all ${!service.comingSoon && service.interestValue ? "cursor-pointer" : ""} ${isDark ? "bg-neutral-900/50 border-white/5 hover:border-white/10" : "bg-neutral-100 border-black/5 hover:border-black/10"}`}
                            >
                                {/* Background Image */}
                                <div
                                    className={`absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 ${service.comingSoon ? (isDark ? "opacity-25 group-hover:opacity-35" : "opacity-60 group-hover:opacity-80") : ""}`}
                                    style={{ backgroundImage: `url(${service.image})` }}
                                />

                                {service.comingSoon && (
                                    <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-t from-black/80 to-black/20" : "bg-gradient-to-t from-black/70 to-transparent"}`} />
                                )}

                                {/* Content */}
                                <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                                    <div className="flex justify-end">
                                        {service.comingSoon && (
                                            <span className="flex items-center gap-1.5 text-[10px] font-medium text-amber-400/80 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                                                <Clock className="w-3 h-3" />
                                                {t("services.comingSoon")}
                                            </span>
                                        )}
                                    </div>

                                    <div>
                                        <h5 className="text-xl font-bold mb-1 text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                                            {t(service.titleKey)}
                                        </h5>
                                        <p className="text-sm text-white/70">
                                            {t(service.descKey)}
                                        </p>
                                        {service.comingSoon && (
                                            <p className="text-xs mt-2 italic text-white/50">
                                                {t("services.availableOnRequest")}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
}
