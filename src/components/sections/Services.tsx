"use client";

import Section from "@/components/ui/Section";
import { ArrowUpRight, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Services() {
    const { t, language } = useLanguage();

    const services = [
        {
            id: "01",
            titleKey: "services.automotive.title",
            descKey: "services.automotive.desc",
            image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2670&auto=format&fit=crop",
            primary: true,
        },
        {
            id: "02",
            titleKey: "services.architectural.title",
            descKey: "services.architectural.desc",
            image: "https://images.unsplash.com/photo-1505693416388-b034680950ec?q=80&w=2669&auto=format&fit=crop",
            primary: true,
        },
        {
            id: "03",
            titleKey: "services.aviation.title",
            descKey: "services.aviation.desc",
            image: "https://images.unsplash.com/photo-1540962351504-03099e0a754b?q=80&w=2574&auto=format&fit=crop",
            primary: false,
            comingSoon: true,
        },
        {
            id: "04",
            titleKey: "services.marine.title",
            descKey: "services.marine.desc",
            image: "https://images.unsplash.com/photo-1605281317010-fe5ffe79b943?q=80&w=2669&auto=format&fit=crop",
            primary: false,
            comingSoon: true,
        },
    ];

    return (
        <Section id="services" className="bg-black text-white theme-transition">
            <div className="max-w-7xl mx-auto" lang={language}>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-8">
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                        {t("services.title1")} <span className="text-neutral-500">{t("services.title2")}</span>
                    </h2>
                    <p className="text-neutral-400 max-w-md mt-4 md:mt-0">
                        {t("services.subtitle")}
                    </p>
                </div>

                {/* Primary Services - Large Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {services.filter(s => s.primary).map((service) => (
                        <div
                            key={service.id}
                            className="group relative h-[400px] overflow-hidden rounded-2xl bg-neutral-900 border border-white/5 transition-all hover:border-white/20"
                        >
                            {/* Background Image */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-60"
                                style={{ backgroundImage: `url(${service.image})` }}
                            />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                <div className="flex justify-between items-start">
                                    <span className="text-sm font-mono text-neutral-400 border border-white/20 px-2 py-1 rounded-full backdrop-blur-sm">
                                        {service.id}
                                    </span>
                                    <ArrowUpRight className="w-6 h-6 text-white opacity-0 -translate-y-2 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0" />
                                </div>

                                <div>
                                    <h3 className="text-3xl font-bold mb-2">{t(service.titleKey)}</h3>
                                    <p className="text-neutral-300 text-sm max-w-[80%] opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
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
                            className="group relative h-[250px] overflow-hidden rounded-2xl bg-neutral-900/50 border border-white/5 transition-all hover:border-white/10"
                        >
                            {/* Background Image - Lower opacity for de-emphasis */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-20 group-hover:opacity-30"
                                style={{ backgroundImage: `url(${service.image})` }}
                            />

                            {/* Overlay for muted look */}
                            <div className="absolute inset-0 bg-black/30" />

                            {/* Content */}
                            <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                                <div className="flex justify-between items-start">
                                    <span className="text-xs font-mono text-neutral-500 border border-white/10 px-2 py-1 rounded-full">
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
                                    <h3 className="text-2xl font-bold mb-2 text-neutral-300">{t(service.titleKey)}</h3>
                                    <p className="text-neutral-500 text-sm max-w-[90%]">
                                        {t(service.descKey)}
                                    </p>
                                    <p className="text-xs text-neutral-600 mt-3 italic">
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
