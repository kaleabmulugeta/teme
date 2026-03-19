"use client";

import Section from "@/components/ui/Section";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Clock, BarChart3 } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TrainingCourses() {
    const { t, language } = useLanguage();
    const { isDark } = useTheme();
    const sectionRef = useRef<HTMLElement>(null);
    const coursesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!sectionRef.current || !coursesRef.current) return;

        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray<HTMLElement>(".course-card");

            if (!cards.length) return;

            gsap.set(cards, { opacity: 1, y: 0 });

            gsap.from(cards, {
                scrollTrigger: {
                    trigger: coursesRef.current,
                    start: "top 80%",
                    once: true,
                },
                opacity: 0,
                y: 50,
                stagger: 0.2,
                duration: 0.8,
                ease: "power3.out",
                immediateRender: false,
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const courses = [
        {
            id: "01",
            titleKey: "training.course.pro",
            descKey: "training.course.pro.desc",
            durationKey: "training.course.pro.duration",
            levelKey: "training.course.pro.level",
            featured: true,
        },
        {
            id: "02",
            titleKey: "training.course.basic",
            descKey: "training.course.basic.desc",
            durationKey: "training.course.basic.duration",
            levelKey: "training.course.basic.level",
            featured: true,
        },
        {
            id: "03",
            titleKey: "training.course.intermediate",
            descKey: "training.course.intermediate.desc",
            durationKey: "training.course.intermediate.duration",
            levelKey: "training.course.intermediate.level",
            featured: true,
        },
        {
            id: "04",
            titleKey: "training.course.zero2hero",
            descKey: "training.course.zero2hero.desc",
            durationKey: "training.course.zero2hero.duration",
            levelKey: "training.course.zero2hero.level",
            featured: false,
        },
    ];

    return (
        <Section
            ref={sectionRef}
            id="training-courses"
            className={isDark ? "bg-black text-white" : "bg-white text-black"}
        >
            <div className="max-w-7xl mx-auto" lang={language}>
                <div className={`flex flex-col md:flex-row justify-between items-end mb-16 border-b pb-8 ${isDark ? "border-white/10" : "border-black/10"}`}>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                        {t("training.courses.title1")} <span className={isDark ? "text-neutral-500" : "text-neutral-400"}>{t("training.courses.title2")}</span>
                    </h2>
                    <p className={`max-w-md mt-4 md:mt-0 ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                        {t("training.courses.subtitle")}
                    </p>
                </div>

                <div ref={coursesRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className={`course-card group p-8 rounded-2xl border transition-all ${isDark
                                ? "bg-neutral-900 border-white/5 hover:border-white/20"
                                : "bg-neutral-50 border-black/5 hover:border-black/20"
                                } ${!course.featured ? "opacity-75 hover:opacity-100" : ""}`}
                        >
                            {/* Course Number and Badge */}
                            <div className="flex justify-between items-start mb-6">
                                <span className={`text-sm font-mono border px-2 py-1 rounded-full ${isDark ? "text-white/80 border-white/40" : "text-black/80 border-black/40"}`}>
                                    {course.id}
                                </span>
                                {course.featured && (
                                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${isDark ? "bg-white/10 text-white/60" : "bg-black/10 text-black/60"}`}>
                                        {t("training.badge.popular")}
                                    </span>
                                )}
                            </div>

                            {/* Course Title */}
                            <h3 className="text-2xl font-bold mb-3">{t(course.titleKey)}</h3>

                            {/* Course Description */}
                            <p className={`mb-6 leading-relaxed ${isDark ? "text-neutral-400" : "text-neutral-600"}`}>
                                {t(course.descKey)}
                            </p>

                            {/* Course Meta */}
                            <div className={`flex items-center gap-6 pt-6 border-t transition-colors ${isDark ? "border-white/10" : "border-black/10"}`}>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 opacity-60" />
                                    <span className="text-sm">{t(course.durationKey)}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <BarChart3 className="w-4 h-4 opacity-60" />
                                    <span className="text-sm">{t(course.levelKey)}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
